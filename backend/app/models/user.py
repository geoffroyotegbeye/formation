from typing import Optional
from beanie import Indexed
from pydantic import Field, field_validator
import re
from app.models.base import BaseDocument

class User(BaseDocument):
    username: Indexed(str, unique=True) = Field(...)
    email: Indexed(str, unique=True) = Field(...)
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        # Simple email validation regex
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, v):
            raise ValueError('Invalid email format')
        return v
    full_name: str = Field(...)
    hashed_password: str = Field(...)
    is_active: bool = Field(default=True)
    is_admin: bool = Field(default=False)
    
    class Settings:
        name = "users"
