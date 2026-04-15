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

Les produits sont gérés via le fichier JSON :
- `data/products.json`

Pour ajouter un produit, ajoute simplement un nouvel objet dans ce tableau (avec les mêmes champs que les autres éléments : `id`, `title`, `shortTitle`, `description`, `image`, `features`, `applications`, `advantages`, etc.).
