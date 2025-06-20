# Ce fichier est nécessaire pour que Python traite le répertoire comme un package
from app.schemas.user import UserBase, UserCreate, UserUpdate, UserResponse, Token, TokenPayload
from app.schemas.application import ApplicationBase, ApplicationCreate, ApplicationUpdate, ApplicationResponse, ApplicationStatus

# Pour faciliter l'importation des schémas
__all__ = [
    "UserBase", "UserCreate", "UserUpdate", "UserResponse", "Token", "TokenPayload",
    "ApplicationBase", "ApplicationCreate", "ApplicationUpdate", "ApplicationResponse", "ApplicationStatus"
]
