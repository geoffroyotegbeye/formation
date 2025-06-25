from enum import Enum
from typing import List, Optional
from beanie import Document, Indexed
from pydantic import Field, validator
from datetime import datetime

class TestimonialStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Testimonial(Document):
    name: str
    role: str
    content: str
    rating: float = Field(..., ge=1, le=5)
    status: TestimonialStatus = Field(default=TestimonialStatus.PENDING)
    media_urls: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "testimonials"
        indexes = [
            [("status", 1)],
            [("created_at", -1)],
        ]

    @validator('rating')
    def round_rating(cls, v):
        return round(v * 2) / 2  # Arrondir à 0.5 près
