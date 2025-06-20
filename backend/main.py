from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import logging

from app.api.routes.api import api_router
from app.core.config import settings
from app.db.session import init_db
from app.db.init_db import init_db_data

# Configurer le logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Charger les variables d'environnement
load_dotenv()

# Créer l'application FastAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API pour la gestion des candidatures et des utilisateurs",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configuration CORS pour permettre les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autoriser toutes les origines en développement
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Événements de démarrage et d'arrêt de l'application
@app.on_event("startup")
async def startup_event():
    """Initialiser la connexion à la base de données au démarrage de l'application"""
    try:
        logger.info("Initialisation de la connexion à la base de données MongoDB...")
        await init_db()
        logger.info("Connexion à la base de données MongoDB établie avec succès")
        
        # Initialiser les données de test si nécessaire
        logger.info("Initialisation des données de test...")
        await init_db_data()
        logger.info("Données de test initialisées avec succès")
    except Exception as e:
        logger.error(f"Erreur lors de l'initialisation de la base de données: {e}")
        raise

# Inclure les routes API
app.include_router(api_router, prefix=settings.API_V1_STR)

# Route racine
@app.get("/")
async def root():
    """Route racine de l'API"""
    return {"message": "Bienvenue sur l'API de Formation"}

# Point d'entrée pour exécuter l'application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
