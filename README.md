# Formation - Plateforme de Candidature

Cette application est une plateforme complète pour gérer les candidatures à une formation de développement web. Elle comprend un backend FastAPI avec MongoDB et un frontend React/TypeScript.

## Structure du projet

```
formation/
├── backend/               # API FastAPI avec MongoDB
│   ├── app/               # Code source du backend
│   ├── .env               # Variables d'environnement
│   ├── test_api.py        # Script de test de l'API
│   └── install_dependencies.bat  # Script d'installation des dépendances
└── frontend/              # Application React/TypeScript
    ├── src/               # Code source du frontend
    ├── public/            # Fichiers statiques
    └── package.json       # Dépendances du frontend
```

## Prérequis

- Python 3.8+
- Node.js 14+
- MongoDB (local ou distant)

## Configuration

### Backend

1. Créez un fichier `.env` dans le dossier `backend/` avec les variables suivantes:

```
SECRET_KEY=votre_clé_secrète_pour_jwt
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=formation_db
```

2. Installez les dépendances:

```bash
cd backend
# Sur Windows
install_dependencies.bat
# Sur Linux/Mac
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn motor beanie pydantic pydantic-settings python-jose[cryptography] passlib[bcrypt] python-multipart httpx
```

3. Lancez le serveur:

```bash
# Activez l'environnement virtuel si ce n'est pas déjà fait
# Sur Windows: venv\Scripts\activate
# Sur Linux/Mac: source venv/bin/activate

# Lancez le serveur
uvicorn app.main:app --reload
```

Le backend sera accessible à l'adresse: http://localhost:3003

Documentation API: http://localhost:3003/docs

### Frontend

1. Installez les dépendances:

```bash
cd frontend
npm install
```

2. Lancez le serveur de développement:

```bash
npm run dev
```

Le frontend sera accessible à l'adresse: http://localhost:5173

## Fonctionnalités

### Backend

- Authentification JWT
- Gestion des utilisateurs (admin/non-admin)
- Gestion des candidatures
- API RESTful

### Frontend

- Interface utilisateur pour les candidats
- Panneau d'administration pour gérer les candidatures
- Authentification sécurisée

## Utilisateur par défaut

Un utilisateur administrateur est créé par défaut:

- Username: admin
- Password: admin123

## Test de l'API

Un script de test est fourni pour vérifier le bon fonctionnement de l'API:

```bash
cd backend
# Activez l'environnement virtuel
python test_api.py
```

Ce script teste les fonctionnalités principales de l'API: authentification, récupération des utilisateurs et des candidatures, création et mise à jour des candidatures.
