# SR Diagnostics Immobiliers — Site public + Intranet (MVP)

Plateforme full-stack en **Next.js App Router + TypeScript** pour SR Diagnostics Immobiliers.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + composants UI réutilisables
- Supabase (DB, Auth, Storage)
- ESLint + Prettier
- Déploiement recommandé: **Vercel**
- Déploiement alternatif: **Netlify** (plugin Next.js)

## Branding
- Nom: **SR Diagnostics Immobiliers**
- Gérant: **Raspado Stephan**
- Slogan: **« Bâtir votre confiance dans les règles de l’art »**
- Adresse: **328 boulevard Fosse 2, 62320 Rouvroy, France**
- Contact: **07 67 07 67 61** · **stephanr.pro@gmail.com**
- Couleurs: RAL 5005 / 9016 / 9005

## Pages publiques
- `/` Accueil
- `/prestations`
- Détails: `/prestations/dpe`, `/amiante`, `/plomb`, `/electricite`, `/gaz`, `/termites`, `/erp`
- `/devis` Wizard multi-étapes (A→E) + moteur packs JSON
- `/actualites` veille RSS (liens sources + résumés originaux)
- `/valeurs`, `/contact`
- `/mentions-legales`, `/confidentialite`, `/cgv`

## Intranet (MVP)
- `/login`
- `/dashboard`
- `/client`
- `/admin`
- `/admin/veille`

> Les écrans intranet sont prêts côté UI/flux MVP. Le branchement complet des contrôles d’accès Supabase Auth se fait avec vos clés en production.

## Moteur de packs (configurable)
- Fichier: `config/packs.json`
- Utilisé par `lib/packs.ts`
- Règles configurables sur: transaction, année, gaz, électricité, copropriété, termites.
- Sans grille tarifaire fournie: affichage **sur devis**.

## Veille RSS (sans scraping)
- Endpoint serveur: `GET /api/veille/fetch`
- Source des items: tables `news_sources` / `news_items`
- Stockage limité à: `title`, `url`, `published_at`, `source`, `tags`, `summary`.
- Pas de stockage du contenu intégral externe.

## Base de données Supabase
- Schéma SQL complet: `supabase/schema.sql`
- Tables: users, clients, properties, quotes_requests, missions, documents, invoices, reminders, news_sources, news_items, content_blocks
- RLS inclus:
  - admin = accès complet
  - client = accès à ses missions/documents/factures

## Storage Supabase (documents)
- Bucket privé recommandé: `documents`
- Convention de chemin:
  - `clients/{client_id}/properties/{property_id}/missions/{mission_id}/{document_id}.pdf`
- Validation stricte: PDF only + limite taille (à imposer côté API upload)

## Démarrage local
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables d’environnement
Voir `.env.example`.

Principales:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Déploiement Vercel (recommandé)
1. Importer le repo dans Vercel.
2. Ajouter les variables d’environnement.
3. Déployer (framework auto-détecté Next.js).
4. Configurer Supabase URL/keys + policies RLS.

## Déploiement Netlify (option)
- `netlify.toml` fourni pour Next.js plugin.
- Ajouter les mêmes variables d’environnement.

## RGPD / conformité
- Consentement requis sur formulaire devis.
- Minimisation des données collectées.
- Mention explicite: “Résumé généré automatiquement” sur la veille.
- Textes juridiques en mode placeholder à valider juridiquement.

## Seed admin (placeholder)
- Dans `supabase/schema.sql`:
  - email: `admin@example.com`
  - rôle: `admin`
- Remplacer en production.

## Guide simple: mise en place GitHub Pages (avec ou sans Codex)

### A. Principe
Pour éviter le piège “one-page”, la solution la plus fiable sur GitHub Pages est un **site statique multi-pages**:
`index.html`, `vente.html`, `location.html`, `diagnostics.html`, etc.

### B. Arborescence recommandée (racine)
```text
index.html
vente.html
location.html
diagnostics.html
copropriete.html
audit.html
devis.html
a-propos.html
contact.html
assets/
  styles.css
  app.js
  img/
```

Utiliser des liens **relatifs** dans le menu (`href="vente.html"`) pour éviter les 404 sur GitHub Pages.

### C. Activer GitHub Pages
1. GitHub → `Settings`
2. `Pages`
3. `Deploy from a branch`
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

### D. Nom de domaine personnalisé
- Côté GitHub Pages: `Settings → Pages → Custom domain`
- Côté DNS: créer un `CNAME` pour `www` vers `<user>.github.io` (valeur fournie par GitHub)

### E. Devis sans backend
GitHub Pages est statique. Pour recevoir les demandes:
- Formspree / Getform / Google Forms
- Ou Netlify Forms si l’hébergement est déplacé sur Netlify

### F. Workflows
- **Sans Codex**: modifier → commit/push → publication GitHub Pages.
- **Avec Codex**: travailler en PR et valider les fichiers créés/modifiés.

### G. Check-list anti-galère
- ✅ Une page = un fichier `.html`
- ✅ Liens relatifs (`vente.html`, pas `/vente.html`)
- ✅ Assets dans `/assets`
- ✅ Publication depuis `main / root`
- ✅ Formulaire via service externe

## Conformité cookies & pages légales (FR/UE)

### Fichiers ajoutés
- Gestionnaire de consentement : `assets/consent-manager.js`
- Configuration des services : `config/consent.config.js`
- Pages légales :
  - `mentions-legales.html`
  - `politique-de-confidentialite.html`
  - `politique-cookies.html`
  - `conditions-d-utilisation.html`

### Comportement CNIL implémenté
- Bandeau 1er niveau avec boutons de même niveau : **Tout accepter / Tout refuser / Personnaliser**.
- Aucune injection de script non essentiel tant qu’aucun consentement valide n’existe.
- Lien permanent **« Gérer mes cookies »** dans le footer (toutes les pages).
- Revalidation du choix après ~6 mois (183 jours) ou changement de version (`CONSENT_VERSION`).
- Fonction globale : `openCookieSettings()`.

### Configurer les services tiers (GA4, etc.)
1. Ouvrir `config/consent.config.js`.
2. Renseigner les services dans `services.analytics`, `services.marketing`, `services.social`.
3. Chaque service peut exposer une fonction `init()` appelée uniquement si la catégorie est acceptée.
4. Exemple GA4 fourni : remplacer `G-XXXXXXXXXX` par votre ID réel.

### Modifier les textes et coordonnées légales
- Mettre à jour les placeholders : `NOM_ENTREPRISE`, `ADRESSE`, `EMAIL`, `TELEPHONE`, SIRET/SIREN, directeur de publication, hébergeur.
- Modifier les pages légales HTML directement à la racine.

### Vérifier le bon fonctionnement
1. Ouvrir le site en navigation privée.
2. Vérifier que le bandeau apparaît (si au moins un service optionnel est configuré).
3. Ouvrir les DevTools > Network et confirmer qu’aucun appel analytics/marketing n’est déclenché avant consentement.
4. Cliquer **Tout refuser** : aucun service optionnel ne doit se charger.
5. Cliquer **Tout accepter** : les services acceptés sont injectés.
6. Cliquer **Gérer mes cookies** (footer) pour modifier ou retirer le consentement.

### Forcer une redemande de consentement
- Incrémenter `CONSENT_VERSION` dans `config/consent.config.js`.
- Au prochain chargement, le consentement stocké est considéré obsolète et le bandeau est réaffiché.

## Formulaire de devis (Netlify Forms)

La page statique `devis.html` contient maintenant le formulaire principal avec:
- `data-netlify="true"`
- champ caché `form-name`
- honeypot `netlify-honeypot="bot-field"`
- consentement RGPD obligatoire + lien vers la politique de confidentialité.

### Test local
```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080/devis.html
```

### Activation email Netlify (obligatoire)
1. Déployer sur Netlify.
2. Ouvrir **Netlify > Forms** et vérifier que le formulaire `devis` est détecté.
3. Aller dans **Forms > Settings > Form notifications**.
4. Ajouter une notification email vers `stephanr.pro@gmail.com`.
5. Faire un envoi de test depuis `/devis.html`.

## Option SMS Twilio (Netlify Function)

Fonction ajoutée: `netlify/functions/send-sms.js` (appelée via `/api/send-sms`).

Variables d'environnement à définir dans Netlify:
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`
- `SMS_TO_NUMBER=+33767076761`

Comportement:
- Après validation front, le formulaire tente d'appeler `/api/send-sms`.
- En cas d'échec SMS, la soumission du devis continue (email Netlify Forms prioritaire).
