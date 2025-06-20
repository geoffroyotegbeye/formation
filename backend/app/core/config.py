from pydantic_settings import BaseSettings
from typing import Optional, List
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Formation API"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "un_secret_tres_secret_a_changer_en_production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # MongoDB settings
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    MONGODB_DB_NAME: str = os.getenv("MONGODB_DB_NAME", "formation_db")
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173"]  # URL du frontend en développement

settings = Settings()
