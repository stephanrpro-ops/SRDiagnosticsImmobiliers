// SR Diagnostics - Devis auto (site statique)
// Packs TTC (diags principaux : DPE, Amiante, Plomb, Gaz, Électricité, ERP)
const PACK_PRICES = { 1: 150, 2: 230, 3: 300, 4: 360, 5: 420, 6: 470 };

// Seuils (règles simples de recommandation)
function recommendDiagnostics({ year, gazFixe, elec, contexte }) {
  // contexte: "vente" | "location"
  const rec = {
    dpe: true,         // quasi toujours utile/attendu dans ton parcours
    amiante: false,
    plomb: false,
    gaz: false,
    elec: false,
    erp: true          // souvent demandé (on le laisse recommandé, l’utilisateur peut décocher)
  };

  if (year && year < 1997) rec.amiante = true;  // < 01/07/1997, simplifié en année
  if (year && year < 1949) rec.plomb = true;    // < 01/01/1949

  // Gaz/élec : on se base sur présence d’installation (tu as précisé "gaz fixe")
  rec.gaz = !!gazFixe;
  rec.elec = !!elec;

  // Petite nuance possible : en location, ERP pas toujours "obligatoire" selon zone,
  // mais commercialement c'est un plus. L’utilisateur peut décocher.
  return rec;
}

function countMainDiags(state) {
  const keys = ["dpe", "amiante", "plomb", "gaz", "elec", "erp"];
  return keys.filter(k => state[k]).length;
}

function computePrice(mainCount, surface, options) {
  // options: { mesurage, termites, prelevement, erpSeul }
  // Mesurage/termites/prelevement hors pack (selon ta grille)
  if (surface && surface > 200) {
    return { total: null, note: "Surface > 200 m² : sur devis" };
  }

  let total = 0;
  if (mainCount >= 1 && mainCount <= 6) total += PACK_PRICES[mainCount];
  if (mainCount === 0) total += 0;

  if (options.mesurage) total += 80;
  if (options.termites) total += 80;
  if (options.prelevement) total += 60;

  return { total, note: "" };
}

function fmtEUR(n) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

function buildMailto(payload) {
  const subject = "Demande de devis — SR Diagnostics Immobiliers";
  const lines = [
    "Bonjour,",
    "",
    "Je souhaite un devis pour :",
    `- Contexte : ${payload.contexte}`,
    `- Type de bien : ${payload.typeBien}`,
    `- Surface : ${payload.surface ? payload.surface + " m²" : "non précisée"}`,
    `- Année / permis : ${payload.year || "non précisée"}`,
    `- Gaz fixe : ${payload.gazFixe ? "oui" : "non"}`,
    `- Électricité : ${payload.elec ? "oui" : "non"}`,
    "",
    "Diagnostics sélectionnés :",
    `- DPE : ${payload.diags.dpe ? "oui" : "non"}`,
    `- Amiante : ${payload.diags.amiante ? "oui" : "non"}`,
    `- Plomb (CREP) : ${payload.diags.plomb ? "oui" : "non"}`,
    `- Gaz : ${payload.diags.gaz ? "oui" : "non"}`,
    `- Électricité : ${payload.diags.elec ? "oui" : "non"}`,
    `- ERP : ${payload.diags.erp ? "oui" : "non"}`,
    "",
    "Options :",
    `- Mesurage : ${payload.options.mesurage ? "oui" : "non"}`,
    `- Termites (indicatif) : ${payload.options.termites ? "oui" : "non"}`,
    `- Forfait prélèvement : ${payload.options.prelevement ? "oui" : "non"}`,
    "",
    payload.priceText,
    "",
    "Merci,",
    payload.nom || ""
  ];

  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:stephanr.pro@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}

function readForm() {
  const $ = (id) => document.getElementById(id);
  const year = parseInt($("year").value, 10);
  const surface = parseInt($("surface").value, 10);
  const contexte = $("contexte").value;
  const typeBien = $("typeBien").value;

  const gazFixe = $("gazFixe").checked;
  const elec = $("elec").checked;

  const diags = {
    dpe: $("dpe").checked,
    amiante: $("amiante").checked,
    plomb: $("plomb").checked,
    gaz: $("gaz").checked,
    elec: $("electricite").checked,
    erp: $("erp").checked
  };

  const options = {
    mesurage: $("mesurage").checked,
    termites: $("termites").checked,
    prelevement: $("prelevement").checked
  };

  return { year: isNaN(year) ? null : year, surface: isNaN(surface) ? null : surface, contexte, typeBien, gazFixe, elec, diags, options, nom: $("nom").value.trim() };
}

function applyRecommendations() {
  const data = readForm();
  const rec = recommendDiagnostics({ year: data.year, gazFixe: data.gazFixe, elec: data.elec, contexte: data.contexte });

  document.getElementById("dpe").checked = rec.dpe;
  document.getElementById("amiante").checked = rec.amiante;
  document.getElementById("plomb").checked = rec.plomb;
  document.getElementById("gaz").checked = rec.gaz;
  document.getElementById("electricite").checked = rec.elec;
  document.getElementById("erp").checked = rec.erp;

  updatePrice();
}

function updatePrice() {
  const data = readForm();
  const mainCount = countMainDiags(data.diags);

  const price = computePrice(mainCount, data.surface, data.options);
  const out = document.getElementById("price");

  let priceText = "";
  if (price.total === null) {
    out.textContent = price.note;
    priceText = price.note;
  } else {
    out.textContent = `Estimation : ${fmtEUR(price.total)} TTC (Pack ${mainCount || 0} diag${mainCount > 1 ? "s" : ""}${mainCount ? "" : " : aucun diag principal sélectionné"})`;
    if (data.options.mesurage || data.options.termites || data.options.prelevement) {
      out.textContent += " (options incluses)";
    }
    priceText = out.textContent;
  }

  const mailto = buildMailto({ ...data, priceText });
  const btn = document.getElementById("sendMail");
  btn.href = mailto;

  // Petits warnings utiles
  const warn = document.getElementById("warn");
  const warnings = [];

  if (!data.year) warnings.push("Année/permis non renseignée : recommandations amiante/plomb moins fiables.");
  if (mainCount === 0) warnings.push("Aucun diagnostic principal sélectionné : coche au moins DPE / ERP si besoin.");
  if (data.surface && data.surface > 200) warnings.push("Surface > 200 m² : prix sur devis.");

  warn.innerHTML = warnings.length ? "⚠️ " + warnings.join(" ") : "";
}

document.addEventListener("DOMContentLoaded", () => {
  const idsToWatch = [
    "contexte","typeBien","surface","year","gazFixe","elec",
    "dpe","amiante","plomb","gaz","electricite","erp",
    "mesurage","termites","prelevement","nom"
  ];
  idsToWatch.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updatePrice);
    if (el && el.type === "checkbox") el.addEventListener("change", updatePrice);
  });

  document.getElementById("autoBtn").addEventListener("click", (e) => {
    e.preventDefault();
    applyRecommendations();
  });

  // Initial
  updatePrice();
});
