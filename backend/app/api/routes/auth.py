from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from app.core.config import settings
from app.core.security import create_access_token, verify_password
from app.models.user import User
from app.schemas.user import Token
from app.utils.model_helpers import prepare_mongodb_document

router = APIRouter(tags=["authentication"])

@router.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    """
    Obtenir un token d'accès JWT pour l'authentification
    """
    # Rechercher l'utilisateur dans la base de données
    user = await User.find_one({"username": form_data.username})
    
    # Vérifier si l'utilisateur existe et si le mot de passe est correct
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nom d'utilisateur ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Vérifier si l'utilisateur est actif
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Utilisateur inactif"
        )
    
    # Créer un token d'accès JWT
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.username, expires_delta=access_token_expires
    )
    
    # Préparer la réponse
    token_data = {"access_token": access_token, "token_type": "bearer"}
    
    # Ajouter les informations utilisateur pour le frontend
    user_data = prepare_mongodb_document(user)
    token_data["user"] = user_data
    
    return token_data
