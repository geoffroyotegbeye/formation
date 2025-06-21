from fastapi import APIRouter, Depends, HTTPException, status, Query, Response
from typing import List, Optional, Dict, Any
from bson import ObjectId

from app.api.deps import get_current_active_user, get_current_admin_user
from app.models.user import User
from app.models.application import Application, ApplicationStatus
from app.schemas.application import ApplicationCreate, ApplicationUpdate, ApplicationResponse
from app.utils.model_helpers import prepare_mongodb_document, prepare_mongodb_documents
from app.services.email_service import EmailService

router = APIRouter(tags=["applications"])

@router.get("/")
async def read_applications(
    response: Response,
    skip: int = 0, 
    limit: int = 100,
    status: Optional[str] = Query(None, description="Filtrer par statut (pending, approved, rejected)"),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Récupérer toutes les candidatures (admin uniquement)
    """
    # Construire la requête
    query = {}
    
    # Filtrer par statut si spécifié
    if status:
        try:
            status_enum = ApplicationStatus(status)
            query["status"] = status_enum
        except ValueError:
            # Si le statut n'est pas valide, on ignore le filtre
            pass
    
    # Exécuter la requête
    applications = await Application.find(query).sort([("created_at", -1)]).skip(skip).limit(limit).to_list()
    
    # Convertir les documents MongoDB en dictionnaires avec les ID convertis en chaînes
    result = prepare_mongodb_documents(applications)
    return result

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_application(application_in: ApplicationCreate):
    """
    Créer une nouvelle candidature (accessible publiquement)
    """
    # Vérifier si une candidature avec cet email existe déjà
    existing_application = await Application.find_one({"email": application_in.email})
    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Une candidature avec cet email existe déjà"
        )
    
    # Créer la candidature
    application = Application(
        full_name=application_in.full_name,
        email=application_in.email,
        whatsapp=application_in.whatsapp,
        age=application_in.age,
        city=application_in.city,
        has_code_experience=application_in.has_code_experience,
        has_computer=application_in.has_computer,
        has_internet=application_in.has_internet,
        motivation=application_in.motivation,
        hours_per_week=application_in.hours_per_week,
        how_did_you_know=application_in.how_did_you_know,
        status=ApplicationStatus.PENDING
    )
    await application.create()
    
    # Envoyer un email de bienvenue au candidat
    try:
        await EmailService.send_welcome_email(
            recipient_name=application_in.full_name,
            recipient_email=application_in.email
        )
    except Exception as e:
        # Log l'erreur mais ne pas faire échouer la requête
        print(f"Erreur lors de l'envoi de l'email de bienvenue: {str(e)}")
    
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(application)
    return result

@router.get("/{application_id}")
async def read_application(
    application_id: str, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Récupérer une candidature par son ID (admin uniquement)
    """
    try:
        obj_id = ObjectId(application_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID de candidature invalide"
        )
        
    application = await Application.get(obj_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidature non trouvée"
        )
    
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(application)
    return result

@router.put("/{application_id}")
async def update_application_status(
    application_id: str, 
    application_update: ApplicationUpdate, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Mettre à jour le statut d'une candidature (admin uniquement)
    """
    try:
        obj_id = ObjectId(application_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID de candidature invalide"
        )
        
    application = await Application.get(obj_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidature non trouvée"
        )
    
    # Mettre à jour le statut
    application.status = application_update.status
    await application.save()
    
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(application)
    return result

@router.delete("/{application_id}")
async def delete_application(
    application_id: str, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Supprimer une candidature (admin uniquement)
    """
    try:
        obj_id = ObjectId(application_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID de candidature invalide"
        )
        
    application = await Application.get(obj_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidature non trouvée"
        )
    
    # Sauvegarder une copie avant suppression
    result = prepare_mongodb_document(application)
    
    # Supprimer l'application
    await application.delete()
    return result
