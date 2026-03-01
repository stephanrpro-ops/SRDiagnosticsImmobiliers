# README Design

## Ajouter une nouvelle section animée
1. Créer la section en HTML avec classes existantes (`card`, `grid`, `hero`, etc.).
2. Aucun JS additionnel requis: `assets/site.js` applique automatiquement les animations reveal sur titres/listes/cartes.
3. Pour forcer un style, ajouter `.reveal`, `.reveal-left` ou `.reveal-right`.

## Ajouter une illustration SVG
1. Déposer le fichier dans `assets/illustrations/`.
2. Intégrer dans une page:
   ```html
   <img src="assets/illustrations/mon-fichier.svg" alt="Description" loading="lazy" width="320" height="220">
   ```
3. Pour une icône de carte, utiliser la classe `card-icon` (72x72 conseillé).

## Tester `prefers-reduced-motion`
- Outils navigateur > Rendering > Emulate CSS media feature `prefers-reduced-motion: reduce`.
- Vérifier:
  - pas de glissements/fades,
  - scroll non lissé,
  - contenu visible immédiatement.

## Déploiement
- Site statique, aucun build obligatoire pour les pages HTML/CSS/JS.
- Déploiement GitHub Pages/Netlify: push de la branche contenant les fichiers racine + `assets/`.
