from app.models.base import BaseDocument
from app.models.user import User
from app.models.application import Application, ApplicationStatus

# Pour faciliter l'importation des modèles
__all__ = ["BaseDocument", "User", "Application", "ApplicationStatus"]
