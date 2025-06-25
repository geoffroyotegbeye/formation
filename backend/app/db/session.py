import motor.motor_asyncio
from beanie import init_beanie
from app.core.config import settings
from app.models.user import User
from app.models.application import Application
from app.models.testimonial import Testimonial

async def init_db():
    """Initialiser la connexion à la base de données MongoDB"""
    # Créer un client MongoDB
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URL)
    
    # Initialiser Beanie avec les modèles
    await init_beanie(
        database=client[settings.MONGODB_DB_NAME],
        document_models=[
            User,
            Application,
            Testimonial
        ]
    )
    
    return client
