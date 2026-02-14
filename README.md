# SR Diagnostics Immobiliers — MVP Next.js / Netlify

MVP professionnel (français) prêt à déployer sur Netlify.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + composants style shadcn/ui (`Button`, `Card`, `Badge`)
- Supabase (DB/Auth/Storage)
- Netlify (`@netlify/plugin-nextjs`)
- ESLint + Prettier

## Contrainte binaire
Ce dépôt n’ajoute **aucun fichier binaire** applicatif (pas de PNG/JPG/PDF/ICO/WOFF).  
Le logo est un composant React SVG inline : `components/brand/logo.tsx`.

## Grille tarifaire codée
- Données et helpers : `src/lib/pricing.ts`
  - `getPackPrice(count)`
  - `isOver200m2(surface)`
  - `formatPriceEUR(value)`
- UI responsive : `src/components/PricingGrid.tsx`
- Intégration :
  - `/tarifs` (page complète)
  - `/` (extrait)
  - `/devis` (rappel)

## Démarrage
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variables d’environnement
Voir `.env.example`.

### Obligatoires
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Optionnelles
- `RESEND_API_KEY` (ou SMTP)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`
- `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
- `GOOGLE_APPOINTMENT_URL`, `NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL`
- `STRIPE_PAYMENT_LINK_PREFIX`
- `NEXT_PUBLIC_SITE_URL`

## Pages
- `/`, `/prestations` + sous-pages, `/copro`, `/devis`, `/tarifs`, `/actualites`, `/contact`, `/valeurs`
- `/mentions-legales`, `/confidentialite`, `/cgv`
- `/espace-client`, `/admin`

## Devis (règles MVP)
- ERP auto-inclus
- Amiante si année < 1997
- Plomb si année < 1949
- DPE exclu si déjà valide
- Électricité/Gaz selon présence installation
- Termites si confirmation utilisateur
- Surface > 200 m² => **sur devis**
- Packs 1→6 : 150 / 230 / 300 / 360 / 420 / 470

## Anti-spam
- Honeypot
- Rate limiting IP (mémoire)
- Turnstile auto-activé si clé secrète configurée

## Supabase
- Schéma SQL: `supabase/schema.sql`
- Bucket privé recommandé: `documents`
- Structure stockage:
  `/clients/{client_id}/properties/{property_id}/missions/{mission_id}/{document_id}.pdf`

## Netlify
1. Connecter le repo
2. Build command: `npm run build`
3. Ajouter les env vars
4. `netlify.toml` active le plugin Next.js
5. (option) cron Netlify pour import RSS veille

## TODO production
- Auth admin Supabase + ACL/RLS complètes
- PDF viewer pdf.js + watermark “IMPAYÉ” par mission
- Envoi mails (Resend/SMTP) + SMS Twilio branchés
- CRUD admin complets (clients, missions, docs, factures, tokens)
- Import RSS / workflow brouillon-publication
