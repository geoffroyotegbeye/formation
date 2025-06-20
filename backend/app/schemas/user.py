from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
import re

# Schémas de base
class UserBase(BaseModel):
    username: str
    email: str
    full_name: str
    is_active: bool = True
    is_admin: bool = False
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        # Simple email validation regex
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, v):
            raise ValueError('Invalid email format')
        return v

# Schéma pour la création d'un utilisateur
class UserCreate(UserBase):
    password: str

# Schéma pour la mise à jour d'un utilisateur
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    full_name: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_admin: Optional[bool] = None
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        if v is None:
            return v
        # Simple email validation regex
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, v):
            raise ValueError('Invalid email format')
        return v

# Schéma pour la réponse d'un utilisateur
class UserResponse(UserBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# Schéma pour l'authentification
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None
