from typing import Optional
from beanie import Indexed
from pydantic import Field, field_validator
import re
from app.models.base import BaseDocument

class Contact(BaseDocument):
    """
    Modèle pour les messages de contact
    """
    full_name: str = Field(...)
    email: Indexed(str) = Field(...)
    message: str = Field(...)
    is_read: bool = Field(default=False)
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        # Simple email validation regex
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, v):
            raise ValueError('Invalid email format')
        return v
    
    class Settings:
        name = "contacts"
