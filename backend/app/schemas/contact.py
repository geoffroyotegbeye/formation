from pydantic import BaseModel, field_validator, Field
from typing import Optional
from datetime import datetime
import re
from bson import ObjectId

# Classe pour gérer la conversion des ObjectId en chaînes
class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return str(v)
        elif isinstance(v, str):
            return v
        raise ValueError("Not a valid ObjectId")

# Schéma de base pour les contacts
class ContactBase(BaseModel):
    full_name: str
    email: str
    message: str
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        # Simple email validation regex
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, v):
            raise ValueError('Invalid email format')
        return v

# Schéma pour la création d'un contact
class ContactCreate(ContactBase):
    pass

# Schéma pour la mise à jour d'un contact
class ContactUpdate(BaseModel):
    is_read: bool

# Schéma pour la réponse d'un contact
class ContactResponse(ContactBase):
    id: PyObjectId = Field(alias="_id")
    is_read: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            ObjectId: lambda v: str(v)
        }
