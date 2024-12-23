# Pokedex React

Un projet de Pokédex interactif basé sur le design du Pokedex de la 3ème génération, permettant de parcourir et d'afficher des informations sur les Pokémons.

## Fonctionnalités

- Recherche de Pokémons avec une API.
- Affichage interactif des Pokémons, leur cris, leur description et leur visuel.
- Liste déroulante pour parcourir les Pokémons.
- Interface inspirée du Pokédex de la série tv Pokémon.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre système :

- [Node.js](https://nodejs.org/) (version recommandée : 16 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Installation

1. Clonez le répertoire du projet :

   ```bash
   git clone <URL_DU_DEPOT>
   cd Pokedex-React-main
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

## Scripts disponibles

- **`npm run dev`** : Lance le serveur de développement.
- **`npm run build`** : Compile le projet pour la production.
- **`npm run preview`** : Prévisualise la version build du projet.
- **`npm run lint`** : Analyse le code pour détecter les problèmes.

## Structure du projet

- `public/` : Contient les ressources publiques comme les images.
- `src/` : Contient le code source de l'application.
  - `components/` : Composants React pour l'affichage des Pokémons.
  - `utils/` : Fonctions utilitaires pour la logique de l'application.
  - `img/` : Images utilisées dans l'application.
- `package.json` : Fichier de configuration npm.
- `vite.config.js` : Configuration de Vite.

## Technologies utilisées

- **React** : Framework JavaScript pour construire l'interface utilisateur.
- **Vite** : Outil de bundling pour un développement rapide.
- **Axios** : Librairie pour effectuer des requêtes HTTP.
- **React Router** : Gestion de navigation.

## Contribution

Les contributions sont les bienvenues ! Pour commencer :

1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité : `git checkout -b ma-fonctionnalite`.
3. Faites vos modifications et committez : `git commit -m 'Ajout d\u2019une fonctionnalité'`.
4. Poussez votre branche : `git push origin ma-fonctionnalite`.
5. Ouvrez une pull request.

---

Commencez à explorer votre Pokédex !

