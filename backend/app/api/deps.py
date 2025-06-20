from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import ValidationError
from typing import Optional

from app.core.config import settings
from app.core.security import verify_password
from app.models.user import User
from app.schemas.user import TokenPayload

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/token")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """
    Valider le token JWT et récupérer l'utilisateur courant
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Impossible de valider les identifiants",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Décoder le token JWT
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
        
        # Vérifier si le token a expiré
        if token_data.exp is None:
            raise credentials_exception
    except (JWTError, ValidationError):
        raise credentials_exception
    
    # Récupérer l'utilisateur depuis la base de données
    user = await User.find_one({"username": token_data.sub})
    if user is None:
        raise credentials_exception
    
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Vérifier si l'utilisateur courant est actif
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Utilisateur inactif"
        )
    return current_user

async def get_current_admin_user(current_user: User = Depends(get_current_active_user)) -> User:
    """
    Vérifier si l'utilisateur courant est un administrateur
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permissions insuffisantes"
        )
    return current_user
