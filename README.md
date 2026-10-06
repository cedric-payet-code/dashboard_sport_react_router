# SportSee — Dashboard

Tableau de bord sportif en React permettant à un utilisateur de suivre ses courses : profil, statistiques, distance parcourue, fréquence cardiaque et objectif hebdomadaire.

Le projet se compose de deux parties :

- **le front** (ce dépôt) : React + Vite + React Router + Recharts ;
- **l'API** : [P6JS](https://github.com/cedric-payet-code/P6JS), une micro-API Node/Express qui fournit les données des utilisateurs.

## Prérequis

- [Git](https://git-scm.com/)
- [Podman](https://podman.io/) + `podman-compose`, **ou** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

> Les commandes ci-dessous utilisent `podman compose`. Avec Docker, remplacez simplement `podman compose` par `docker compose`.

## Installation

### 1. Cloner le front

```bash
git clone https://github.com/cedric-payet-code/dashboard_sport_react_router.git
cd dashboard_sport_react_router
```

### 2. Cloner l'API dans le dossier `P6JS`

L'API doit être clonée **à la racine du projet**, dans un dossier nommé `P6JS` (c'est le chemin attendu par `compose.yml`) :

```bash
git clone https://github.com/cedric-payet-code/P6JS.git P6JS
```

> Ce fork de l'API renvoie aussi le genre (`gender`) et l'objectif hebdomadaire (`weeklyGoal`) de l'utilisateur, utilisés par le front.

### 3. Créer le fichier d'environnement

```bash
cp app/.env.example app/.env
```

| Variable            | Description                                                      | Valeur par défaut       |
| ------------------- | ---------------------------------------------------------------- | ----------------------- |
| `VITE_API_BASE_URL` | URL de l'API                                                     | `http://localhost:8000` |
| `VITE_USE_MOCK`     | `true` pour utiliser les données simulées au lieu de l'API       | `false`                 |

### 4. Lancer le projet

```bash
podman compose up -d
```

Les dépendances sont installées automatiquement au démarrage des conteneurs.

- Front : <http://localhost:5173>
- API : <http://localhost:8000>

Pour arrêter le projet :

```bash
podman compose down
```

## Comptes de test

| Identifiant    | Mot de passe  |
| -------------- | ------------- |
| `sophiemartin` | `password123` |
| `emmaleroy`    | `password789` |
| `marcdubois`   | `password456` |

## Mode mock

Pour travailler sans l'API, passez `VITE_USE_MOCK=true` dans `app/.env` puis redémarrez le front :

```bash
podman compose restart react
```

Les données viennent alors de [`app/src/mocks/mockData.js`](app/src/mocks/mockData.js). Seul le compte `sophiemartin` / `password123` est accepté.

## Commandes utiles

```bash
# Ouvrir un terminal dans le conteneur du front
podman compose exec -it react bash

# Ajouter une dépendance au front
podman compose exec react yarn add <paquet>

# Voir les logs du front / de l'API
podman compose logs -f react
podman compose logs -f api

# Repartir d'un node_modules propre
podman compose up -d --build --renew-anon-volumes
```

## Structure du front

```
app/src/
├── assets/       Images et logos
├── components/   Composants réutilisables (un dossier par composant : index.jsx + style.module.css)
├── context/      Contextes React (authentification, infos et activité utilisateur)
├── hooks/        Hooks personnalisés
├── mocks/        Données simulées (mode mock)
├── pages/        Pages de l'application (Login, Profile, Dashboard, NotFound)
├── routes/       Configuration de React Router
├── services/     Appels à l'API
└── utils/        Fonctions utilitaires (formatage, calculs, dates)
```

## Routes

| Route        | Page                                  | Accès     |
| ------------ | ------------------------------------- | --------- |
| `/login`     | Connexion                             | Public    |
| `/profil`    | Profil et statistiques globales       | Connecté  |
| `/dashboard` | Graphiques d'activité                 | Connecté  |
| `/`          | Redirige vers `/profil`               | —         |
| `*`          | Page 404                              | Public    |
