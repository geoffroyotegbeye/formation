from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from beanie.operators import In
from bson import ObjectId

from app.api.deps import get_current_active_user, get_current_admin_user
from app.core.security import get_password_hash
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from app.utils.model_helpers import prepare_mongodb_document, prepare_mongodb_documents

router = APIRouter(tags=["users"])

@router.get("/")
async def read_users(
    skip: int = 0, 
    limit: int = 100, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Récupérer tous les utilisateurs (admin uniquement)
    """
    users = await User.find_all().skip(skip).limit(limit).to_list()
    # Convertir les documents MongoDB en dictionnaires avec les ID convertis en chaînes
    result = prepare_mongodb_documents(users)
    return result

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(
    user_in: UserCreate, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Créer un nouvel utilisateur (admin uniquement)
    """
    # Vérifier si l'utilisateur existe déjà
    existing_user = await User.find_one({"username": user_in.username})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nom d'utilisateur déjà utilisé"
        )
    
    # Vérifier si l'email existe déjà
    existing_email = await User.find_one({"email": user_in.email})
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email déjà utilisé"
        )
    
    # Créer l'utilisateur
    user = User(
        username=user_in.username,
        email=user_in.email,
        full_name=user_in.full_name,
        hashed_password=get_password_hash(user_in.password),
        is_active=user_in.is_active,
        is_admin=user_in.is_admin
    )
    await user.create()
    
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(user)
    return result

@router.get("/me")
async def read_user_me(current_user: User = Depends(get_current_active_user)):
    """
    Récupérer l'utilisateur connecté
    """
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(current_user)
    return result

@router.get("/{user_id}")
async def read_user(
    user_id: str, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Récupérer un utilisateur par son ID (admin uniquement)
    """
    try:
        obj_id = ObjectId(user_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID d'utilisateur invalide"
        )
        
    user = await User.get(obj_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(user)
    return result

@router.put("/{user_id}")
async def update_user(
    user_id: str, 
    user_in: UserUpdate, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Mettre à jour un utilisateur (admin uniquement)
    """
    try:
        obj_id = ObjectId(user_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID d'utilisateur invalide"
        )
        
    user = await User.get(obj_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    
    # Mettre à jour les champs
    update_data = user_in.dict(exclude_unset=True)
    
    # Hasher le mot de passe si fourni
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
    
    # Mettre à jour l'utilisateur
    for field, value in update_data.items():
        setattr(user, field, value)
    
    await user.save()
    
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(user)
    return result

@router.delete("/{user_id}")
async def delete_user(
    user_id: str, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Supprimer un utilisateur (admin uniquement)
    """
    try:
        obj_id = ObjectId(user_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID d'utilisateur invalide"
        )
        
    user = await User.get(obj_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    
    # Sauvegarder une copie avant suppression
    result = prepare_mongodb_document(user)
    
    # Supprimer l'utilisateur
    await user.delete()
    return result
