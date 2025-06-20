from typing import Optional
from enum import Enum
from beanie import Indexed
from pydantic import Field, field_validator
import re
from app.models.base import BaseDocument

class ApplicationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Application(BaseDocument):
    full_name: str = Field(...)
    email: Indexed(str) = Field(...)
    
    @field_validator('email')
    @classmethod
    def validate_email(cls, v):
        # Simple email validation regex
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, v):
            raise ValueError('Invalid email format')
        return v
    whatsapp: str = Field(...)
    age: str = Field(...)
    city: str = Field(...)
    has_code_experience: bool = Field(default=False)
    has_computer: bool = Field(default=False)
    has_internet: bool = Field(default=False)
    motivation: str = Field(...)
    hours_per_week: int = Field(...)
    how_did_you_know: str = Field(...)
    status: ApplicationStatus = Field(default=ApplicationStatus.PENDING)
    
    class Settings:
        name = "applications"
