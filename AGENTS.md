# AGENTS.md

## Règles projet (site GitHub Pages)

- Le site doit rester **statique** (HTML/CSS/JS) et **multi-pages** avec des fichiers HTML séparés à la racine.
- Fichiers attendus à la racine : `index.html`, `vente.html`, `location.html`, `copropriete.html`, `prestations.html`, `devis.html`, `contact.html`.
- Ne jamais concentrer tout le contenu dans `index.html`.
- Le CSS commun est unique : `assets/styles.css`.
- Chaque page HTML doit avoir un `<head>` valide et charger **exactement** :
  `<link rel="stylesheet" href="assets/styles.css">`
- Le menu/bandeau doit être identique sur toutes les pages avec ces liens exacts :
  `index.html`, `vente.html`, `location.html`, `copropriete.html`, `prestations.html`, `devis.html`, `contact.html`.
- Les noms de fichiers doivent rester en minuscules, sans espaces.
- Si une page est créée, son lien de menu doit exister et fonctionner.
- Ne pas modifier DNS/domaine ; uniquement le contenu du repo.

## Checklist avant commit

- Vérifier que chaque `href` du menu pointe vers un fichier existant à la racine.
- Vérifier que `devis.html` charge `devis.js` (si présent) avec un chemin correct.
- Vérifier que les IDs du formulaire devis restent identiques à ceux utilisés dans `devis.js` :
  `surface`, `year`, `contexte`, `typeBien`, `gazFixe`, `elec`, `dpe`, `amiante`, `plomb`, `gaz`, `electricite`, `erp`, `mesurage`, `termites`, `prelevement`, `nom`, `price`, `warn`, `autoBtn`, `sendMail`.
