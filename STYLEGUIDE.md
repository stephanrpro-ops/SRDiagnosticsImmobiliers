# Styleguide – SR Diagnostics Immobiliers

## Palette
- `--bg`: fond global clair bleuté.
- `--surface`: cartes et sections.
- `--primary`: couleur de marque principale (actions).
- `--accent`: accent secondaire pour dégradés CTA.
- `--text` / `--text-muted`: hiérarchie typographique.

## Typographie
- Police: `Inter, Segoe UI, Roboto, Arial, sans-serif`.
- H1 responsive via `clamp(1.85rem, 4.5vw, 2.8rem)`.
- Interlignage global: `1.65`.

## Espacement & layout
- Variables `--space-1` à `--space-6` pour les marges/paddings.
- Conteneur max: `--container: 1120px`.
- Cartes: radius `--radius-md`, ombres `--shadow-sm` / `--shadow-md`.

## Composants
- `hero`: bloc principal avec illustration.
- `card`: blocs de contenu homogènes.
- `btn`: boutons arrondis avec dégradé et hover léger.
- `menu`: navigation sticky avec item actif (`aria-current="page"`).
- `site-footer`: footer en carte + illustration discrète.

## Animations
- Révélations au scroll avec `IntersectionObserver` (`assets/site.js`).
- Classes animées: `.reveal`, `.reveal-left`, `.reveal-right`, `.is-visible`.
- Micro-interactions: hover/scale cartes et boutons (`280ms`).
- `prefers-reduced-motion`: animations neutralisées automatiquement.

## Accessibilité
- Focus visible via `outline` fort sur liens/champs/boutons.
- Scroll smooth désactivé si reduced motion.
- Images décoratives en cartes: `alt=""`; illustrations héro explicites en `alt` descriptif.
