from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.services.user import UserService
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from app.core.security import get_password_hash
from app.api.deps import get_current_active_user, get_current_admin_user

router = APIRouter(tags=["users"])

@router.get("/users", response_model=List[UserResponse])
def read_users(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin_user)
):
    """
    Récupérer tous les utilisateurs (admin uniquement)
    """
    users = UserService.get_all(db, skip=skip, limit=limit)
    return users

@router.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(
    user_in: UserCreate, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin_user)
):
    """
    Créer un nouvel utilisateur (admin uniquement)
    """
    user = UserService.create(db, user_in)
    return user

@router.get("/users/me", response_model=UserResponse)
def read_user_me(current_user = Depends(get_current_active_user)):
    """
    Récupérer l'utilisateur connecté
    """
    return current_user

@router.get("/users/{user_id}", response_model=UserResponse)
def read_user(
    user_id: int, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin_user)
):
    """
    Récupérer un utilisateur par son ID (admin uniquement)
    """
    user = UserService.get_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    return user

@router.put("/users/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int, 
    user_in: UserUpdate, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin_user)
):
    """
    Mettre à jour un utilisateur (admin uniquement)
    """
    user = UserService.update(db, user_id, user_in)
    return user

@router.delete("/users/{user_id}", response_model=UserResponse)
def delete_user(
    user_id: int, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_admin_user)
):
    """
    Supprimer un utilisateur (admin uniquement)
    """
    user = UserService.delete(db, user_id)
    return user
