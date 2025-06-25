from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query, Form
from typing import List, Optional
from datetime import datetime

from app.models.testimonial import Testimonial, TestimonialStatus
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# Créer une connexion MongoDB
client = AsyncIOMotorClient(settings.MONGODB_URL)
db = client[settings.MONGODB_DB_NAME]
from app.schemas.testimonial import TestimonialCreate, TestimonialResponse, TestimonialUpdate
from app.api.deps import get_current_admin_user
from app.models.user import User
from app.utils.model_helpers import prepare_mongodb_document

router = APIRouter()

def prepare_testimonial_response(testimonial):
    data = testimonial.dict()
    data['id'] = str(testimonial.id)
    data['created_at'] = testimonial.created_at
    data['updated_at'] = testimonial.updated_at
    return data



@router.get("/", response_model=List[TestimonialResponse])
async def get_testimonials(
    limit: int = Query(None, ge=1, description="Nombre maximum de témoignages à retourner")
):
    """
    Récupère les témoignages approuvés
    """
    # Créer la requête avec filtre sur le statut approuvé
    query_builder = Testimonial.find({"status": "approved"}).sort([("created_at", -1)])
    
    # Appliquer la limite si spécifiée
    if limit is not None:
        query_builder = query_builder.limit(limit)
    
    # Exécuter la requête et préparer la réponse
    return [prepare_testimonial_response(t) for t in await query_builder.to_list()]



@router.post("/", status_code=status.HTTP_201_CREATED, response_model=TestimonialResponse)
async def create_testimonial(
    name: str = Form(...),
    role: str = Form(...),
    content: str = Form(...),
    rating: float = Form(..., ge=1, le=5),
    files: List[UploadFile] = File(None)
):
    """
    Crée un nouveau témoignage
    """
    # Pas de gestion des fichiers pour l'instant
    media_urls = []
    
    # Création du témoignage avec les données validées
    testimonial = Testimonial(
        name=name,
        role=role,
        content=content,
        rating=rating,
        media_urls=media_urls,
        status=TestimonialStatus.PENDING
    )
    await testimonial.save()
    
    return prepare_testimonial_response(testimonial)

@router.get("/admin", dependencies=[Depends(get_current_admin_user)])
async def get_all_testimonials(
    status: Optional[TestimonialStatus] = None,
    skip: int = 0,
    limit: int = 10
):
    """
    Récupère tous les témoignages (admin uniquement)
    """
    query = {"status": status} if status else {}
    
    testimonials = await Testimonial.find(
        query,
        skip=skip,
        limit=limit,
        sort=[("created_at", -1)]
    ).to_list()
    
    return [prepare_testimonial_response(t) for t in testimonials]

@router.patch("/{testimonial_id}", dependencies=[Depends(get_current_admin_user)])
async def update_testimonial_status(
    testimonial_id: str,
    update_data: TestimonialUpdate
):
    """
    Met à jour le statut d'un témoignage (admin uniquement)
    """
    testimonial = await Testimonial.get(testimonial_id)
    if not testimonial:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Témoignage non trouvé"
        )
    
    update_data_dict = update_data.dict(exclude_unset=True)
    
    for field, value in update_data_dict.items():
        setattr(testimonial, field, value)
    
    testimonial.updated_at = datetime.utcnow()
    await testimonial.save()
    
    return prepare_testimonial_response(testimonial)
