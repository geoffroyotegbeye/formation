from typing import Optional, List
from datetime import datetime
from enum import Enum
from beanie import Document, Indexed
from pydantic import EmailStr, Field


class QuoteStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    COMPLETED = "completed"


class Quote(Document):
    full_name: str
    email: EmailStr
    company_name: Optional[str] = None
    phone: str
    service_type: str
    description: str
    budget: Optional[float] = None
    timeline: Optional[str] = None
    status: QuoteStatus = QuoteStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None
    admin_notes: Optional[str] = None

    class Settings:
        name = "quotes"
