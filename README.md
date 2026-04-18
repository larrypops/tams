# TAM'S EMPIRE CONSTRUCTION - Next.js

Ce projet a été migré de Vite vers Next.js (App Router).

## Prérequis

- Node.js 20+
- npm

## Lancer en local

1. Installer les dépendances :
   `npm install`
2. Démarrer le serveur de développement :
   `npm run dev`
3. Ouvrir l'application :
   [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

- `npm run dev` : mode développement
- `npm run build` : build de production
- `npm run start` : démarrage en production
- `npm run lint` : vérification TypeScript

## Ajouter un produit

Le catalogue est géré via le fichier JSON :
- `data/products.json`

Structure du fichier :
- `categories`: menu des catégories (id, label, emoji)
- `products`: liste des produits

Pour ajouter un produit :
1. Vérifier que la catégorie existe dans `categories`
2. Ajouter un objet dans `products` avec :
   `id`, `categoryId`, `title`, `shortTitle`, `description`, `image`, `features`, `applications`, `advantages`
3. Optionnel : `gallery`, `videoUrl`, `specs`, `availability` (`available` ou `coming-soon`)

La page `/produits` affiche automatiquement les produits groupés par catégorie dans l’ordre du menu JSON.

## Déploiement Vercel

- Framework preset : `Next.js`
- Root Directory : la racine du projet (pas `src`)
- Build Command : `npm run build`
- Install Command : `npm install`

Si un ancien cache provoque une erreur de types, relance un déploiement avec **Clear build cache**.
