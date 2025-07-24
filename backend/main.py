from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
from dotenv import load_dotenv

from app.api.routes.api import api_router
from app.core.config import settings
from app.db.session import init_db
from app.db.init_db import init_db_data

# Charger les variables d'environnement depuis .env.production
load_dotenv(".env")

# Configurer le logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Événements de démarrage
@app.on_event("startup")
async def startup_event():
    """Initialiser la connexion à la base de données MongoDB"""
    try:
        logger.info("Initialisation de la connexion à MongoDB...")
        await init_db()
        logger.info("✔️ Connexion à MongoDB OK")

        logger.info("Initialisation des données de test...")
        await init_db_data()
        logger.info("✔️ Données de test insérées")
    except Exception as e:
        logger.error(f"❌ Erreur MongoDB : {e}")
        raise

# Inclure les routes API
app.include_router(api_router, prefix=settings.API_V1_STR)

# Route racine
@app.get("/")
async def root():
    return {"message": "Bienvenue sur l'API de Formation"}

# Point d'entrée (à utiliser en local uniquement)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
