const PACK_PRICES = { 1: 120, 2: 230, 3: 300, 4: 360, 5: 420, 6: 470 };
const FR_PHONE_REGEX = /^(?:\+33|0)[1-9](?:[ .-]?\d{2}){4}$/;

function recommendDiagnostics({ year, gazFixe, elec }) {
  const rec = { dpe: true, amiante: false, plomb: false, gaz: false, elec: false, erp: true };
  if (year && year < 1997) rec.amiante = true;
  if (year && year < 1949) rec.plomb = true;
  rec.gaz = gazFixe === "oui";
  rec.elec = elec === "oui";
  return rec;
}

function countMainDiags(state) {
  return ["dpe", "amiante", "plomb", "gaz", "elec", "erp"].filter((k) => state[k]).length;
}

function computePrice(mainCount, surface, options) {
  if (surface > 200) return { total: null, note: "Surface > 200 m² : sur devis." };
  let total = mainCount > 0 ? PACK_PRICES[mainCount] : 0;
  if (options.mesurage) total += 50;
  if (options.termites) total += 60;
  if (options.prelevement) total += 30;
  return { total, note: "" };
}

function fmtEUR(n) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

function readForm() {
  const $ = (id) => document.getElementById(id);
  const year = parseInt($("year").value, 10);
  const surface = parseInt($("surface").value, 10);

  return {
    contexte: $("contexte").value,
    typeBien: $("typeBien").value,
    adresse: $("adresse").value.trim(),
    cp: $("cp").value.trim(),
    ville: $("ville").value.trim(),
    surface: Number.isFinite(surface) ? surface : null,
    year: Number.isFinite(year) ? year : null,
    gazFixe: $("gazFixe").value,
    elec: $("elec").value,
    diags: {
      dpe: $("dpe").checked,
      amiante: $("amiante").checked,
      plomb: $("plomb").checked,
      gaz: $("gaz").checked,
      elec: $("electricite").checked,
      erp: $("erp").checked,
    },
    options: {
      mesurage: $("mesurage").checked,
      termites: $("termites").checked,
      prelevement: $("prelevement").checked,
    },
    nom: $("nom").value.trim(),
    prenom: $("prenom").value.trim(),
    telephone: $("telephone").value.trim(),
    email: $("email").value.trim(),
  };
}

function applyRecommendations() {
  const data = readForm();
  const rec = recommendDiagnostics(data);
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
  const result = computePrice(mainCount, data.surface, data.options);
  const priceEl = document.getElementById("price");
  const warnEl = document.getElementById("warn");

  let text;
  if (result.total === null) {
    text = result.note;
  } else {
    text = `Estimation indicative : ${fmtEUR(result.total)} TTC.`;
  }

  const warnings = [];
  if (!data.year) warnings.push("Année non renseignée : recommandations moins précises.");
  if (!data.surface) warnings.push("Surface non renseignée.");

  warnEl.textContent = warnings.length ? `⚠️ ${warnings.join(" ")}` : "";
  priceEl.textContent = text;

  document.getElementById("priceEstimate").value = text;
  document.getElementById("smsSummary").value = [
    `Demande: ${data.contexte || "n/a"}`,
    `Ville: ${data.cp || ""} ${data.ville || "n/a"}`,
    `Surface: ${data.surface || "n/a"}m²`,
    `Année: ${data.year || "n/a"}`,
    `Tél: ${data.telephone || "n/a"}`,
    `Email: ${data.email || "n/a"}`,
  ].join(" | ");
}

function validateForm() {
  const data = readForm();
  const errors = [];

  if (!data.contexte) errors.push("Le type de demande est obligatoire.");
  if (!data.typeBien) errors.push("Le type de bien est obligatoire.");
  if (!data.adresse || !data.cp || !data.ville) errors.push("L'adresse complète du bien est obligatoire.");
  if (!data.surface || data.surface <= 0) errors.push("La surface doit être supérieure à 0.");
  if (!data.year) errors.push("L'année de construction/permis est obligatoire.");
  if (!FR_PHONE_REGEX.test(data.telephone)) errors.push("Le téléphone doit être au format français valide.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("L'email renseigné n'est pas valide.");
  if (!document.getElementById("consentement").checked) errors.push("Le consentement de recontact est obligatoire.");

  return errors;
}

async function sendSmsSummary(payload) {
  try {
    await fetch('/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (error) {
    console.warn('SMS non envoyé:', error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const watchedIds = [
    "contexte", "typeBien", "adresse", "cp", "ville", "surface", "year", "gazFixe", "elec",
    "dpe", "amiante", "plomb", "gaz", "electricite", "erp", "mesurage", "termites", "prelevement",
    "nom", "prenom", "telephone", "email"
  ];

  watchedIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", updatePrice);
    el.addEventListener("change", updatePrice);
  });

  document.getElementById("autoBtn").addEventListener("click", applyRecommendations);

  const form = document.getElementById("devisForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    updatePrice();

    const errors = validateForm();
    const errorEl = document.getElementById("formError");

    if (errors.length) {
      errorEl.textContent = errors.join(" ");
      return;
    }

    errorEl.textContent = "";
    const payload = readForm();
    await sendSmsSummary(payload);
    HTMLFormElement.prototype.submit.call(form);
  });

  updatePrice();
});
