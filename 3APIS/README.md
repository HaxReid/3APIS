Projet Railroad

Introduction

Le projet Railroad est une application de gestion ferroviaire qui permet de gérer les utilisateurs, les trains, les stations et les tickets. L'application expose une API RESTful documentée avec Swagger pour faciliter l'utilisation et le développement.

Prérequis

Avant de commencer, assurez-vous d'avoir installé Docker.

Configuration du Projet

1. Cloner le Projet : Dé-zipper le projet

2. Configurer MongoDB avec Docker :
- Ouvrez Docker Desktop sur votre machine.
- Exécutez la commande suivante à la racine du projet pour lancer les conteneurs Docker :
  ```
  docker compose up -d
  ```
- Cela lancera MongoDB et Swagger UI. Assurez-vous que les ports `27017` et `8080` ne sont pas déjà utilisés sur votre machine.

3. Configurer MongoDB Compass :
- Utilisez MongoDB Compass pour accéder à la base de données MongoDB.
- Connectez-vous à `localhost:27017` avec les paramètres par défaut (laissez le nom de la base de données vide pour créer la base de données `railroad`).

4. Créer les Collections MongoDB :
- Dans MongoDB Compass, créez les collections suivantes dans la base de données `Railroad` : `trains`, `stations`, `users`, `tickets`.
- Ajoutez les données CSV du dossier `datas` aux collections correspondantes.

5. Installer les Dépendances Node.js :
  ```
  npm install
  ```

6. Lancer l'application :
  ```
  npm start
  ```


