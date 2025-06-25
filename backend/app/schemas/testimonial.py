from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
from datetime import datetime
from app.models.testimonial import TestimonialStatus

class TestimonialBase(BaseModel):
    name: str
    role: str
    content: str
    rating: float = Field(..., ge=1, le=5)
    media_urls: List[str] = []

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    status: Optional[TestimonialStatus] = None
    content: Optional[str] = None
    rating: Optional[float] = Field(None, ge=1, le=5)

class TestimonialResponse(TestimonialBase):
    id: str
    status: TestimonialStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
