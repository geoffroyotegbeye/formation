from pydantic import BaseModel, field_validator, Field
from typing import Optional, Any
from datetime import datetime
from enum import Enum
import re
from bson import ObjectId

class ApplicationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

# Schéma de base pour les candidatures
class ApplicationBase(BaseModel):
    full_name: str
    email: str
    whatsapp: str
    age: str
    city: str
    has_code_experience: bool
    has_computer: bool
    has_internet: bool
    motivation: str
    hours_per_week: int
    how_did_you_know: str
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        # Simple email validation regex
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, v):
            raise ValueError('Invalid email format')
        return v

# Schéma pour la création d'une candidature
class ApplicationCreate(ApplicationBase):
    pass

# Schéma pour la mise à jour d'une candidature
class ApplicationUpdate(BaseModel):
    status: ApplicationStatus

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

# Schéma pour la réponse d'une candidature
class ApplicationResponse(ApplicationBase):
    id: PyObjectId = Field(alias="_id")
    status: ApplicationStatus
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat(),
            ObjectId: lambda v: str(v)
        }
