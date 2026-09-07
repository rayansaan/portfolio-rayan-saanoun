# Portfolio de Rayan Saanoun

Portfolio de Product Designer présentant les études de cas Moove, Nash, Veeton et Rakoono.

## Stack

- React 19 et TypeScript
- Vite
- Tailwind CSS
- Framer Motion, GSAP et Lenis
- React Router

## Développement

```bash
npm install
npm run dev
```

## Vérifications

```bash
npm run lint
npm run build
```

Le site est configuré pour être déployé sur Vercel. Les réécritures définies dans `vercel.json` permettent d'accéder directement aux routes de l'application.

## Galeries photo

Les pages `/photography/:id` utilisent `src/data/photography.ts` et le manifeste `photography.generated.json`. Chaque dossier principal devient un `PhotographyProject`, chaque sous-dossier une catégorie dont `path` conserve l'arborescence complète. Les photos directement dans le dossier du projet restent sans `categoryId`.

La galerie est pleine largeur, avec une disposition éparpillée stable, des filtres par catégorie et un dialogue plein écran (fond sombre, image entière, Échap, flèches, balayage tactile et retour du focus). Le défilement Lenis est suspendu pendant l'agrandissement, puis restauré.

L'archive fournie contient **35 photos** : Cars (3), Portrait (3) et World (29). World conserve les catégories Shanghai (10), Suzhou (8) et Tunisia (11), y compris les variantes retouchées fournies.

Les images du site sont des copies WebP (grand côté jusqu'à 2 560 px) avec des miniatures jusqu'à 1 024 px. Leur orientation et leurs proportions sont conservées, les couleurs sont converties en sRGB et les métadonnées EXIF/GPS sont retirées. Les originaux et l'archive ne sont pas ajoutés au dépôt. Il n'y a pas de dépendance à des liens Drive ni de synchronisation automatique avec Drive.

### Import d'une archive

`scripts/import-photography.py` nécessite Python, Pillow, ImageMagick (WebP) et `heif-convert` pour les fichiers HEIC. Il valide les chemins du ZIP, conserve les originaux dans un dossier temporaire, vérifie les copies et génère le manifeste. Il n'est pas exécuté pendant le build Vercel.

```bash
python scripts/import-photography.py /chemin/photos.zip /chemin/temporaire-vide --editorial scripts/photography-editorial.json
```

Les couvertures et descriptions sont dans `scripts/photography-editorial.json`. L'option `--resume` reprend un import interrompu après vérification des originaux, sans remplacer les images déjà générées. Pour modifier une image existante, utiliser un nouveau nom ou préparer une nouvelle version séparément. Vérifier ensuite les fichiers et exécuter `npm run build` avant une publication.
