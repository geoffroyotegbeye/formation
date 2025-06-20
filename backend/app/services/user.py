from sqlalchemy.orm import Session
from typing import List, Optional
from fastapi import HTTPException, status

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password

class UserService:
    @staticmethod
    def get_by_id(db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def get_by_username(db: Session, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()
    
    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        return db.query(User).offset(skip).limit(limit).all()
    
    @staticmethod
    def create(db: Session, user_in: UserCreate) -> User:
        # Vérifier si l'utilisateur existe déjà
        db_user = UserService.get_by_username(db, username=user_in.username)
        if db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )
        
        db_user = UserService.get_by_email(db, email=user_in.email)
        if db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
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
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def update(db: Session, user_id: int, user_in: UserUpdate) -> User:
        user = UserService.get_by_id(db, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        update_data = user_in.dict(exclude_unset=True)
        
        # Hasher le mot de passe si fourni
        if "password" in update_data:
            update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
        
        # Mettre à jour les attributs de l'utilisateur
        for field, value in update_data.items():
            setattr(user, field, value)
        
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def delete(db: Session, user_id: int) -> User:
        user = UserService.get_by_id(db, user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        db.delete(user)
        db.commit()
        return user
    
    @staticmethod
    def authenticate(db: Session, username: str, password: str) -> Optional[User]:
        user = UserService.get_by_username(db, username)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
