from pydantic_settings import BaseSettings
from typing import List
from dotenv import load_dotenv
import os

# Charger les variables depuis un fichier spécifique (.env.production)
load_dotenv(dotenv_path=".env.production")

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Formation API"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "un_secret_tres_secret_a_changer_en_production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # MongoDB
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    MONGODB_DB_NAME: str = os.getenv("MONGODB_DB_NAME", "formation_db")

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173"]

    # SMTP / email (optionnel, pour plus tard)
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", 587))
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    EMAIL_SENDER: str = os.getenv("EMAIL_SENDER", "")
    EMAIL_SENDER_NAME: str = os.getenv("EMAIL_SENDER_NAME", "")

settings = Settings()
