from typing import List, Optional
from fastapi import HTTPException, status
from bson import ObjectId

from app.models.application import Application, ApplicationStatus
from app.schemas.application import ApplicationCreate, ApplicationUpdate

class ApplicationService:
    @staticmethod
    async def get_by_id(application_id: str) -> Optional[Application]:
        # Convertir l'ID en ObjectId si c'est une chaîne
        if isinstance(application_id, str):
            try:
                obj_id = ObjectId(application_id)
            except:
                return None
        else:
            obj_id = application_id
            
        return await Application.get(obj_id)
    
    @staticmethod
    async def get_by_email(email: str) -> Optional[Application]:
        return await Application.find_one(Application.email == email)
    
    @staticmethod
    async def get_all(skip: int = 0, limit: int = 100, status: Optional[str] = None) -> List[Application]:
        # Construire la requête de base
        query = {}
        
        # Ajouter le filtre de statut si spécifié
        if status:
            try:
                status_enum = ApplicationStatus(status)
                query["status"] = status_enum
            except ValueError:
                # Si le statut n'est pas valide, on ignore le filtre
                pass
        
        # Exécuter la requête avec tri, pagination
        cursor = Application.find(query)
        cursor = cursor.sort([("created_at", -1)]).skip(skip).limit(limit)
        
        # Convertir le curseur en liste
        return await cursor.to_list()
    
    @staticmethod
    async def create(application_in: ApplicationCreate) -> Application:
        # Vérifier si une candidature avec cet email existe déjà
        db_application = await ApplicationService.get_by_email(email=application_in.email)
        if db_application:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Application with this email already exists"
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
        
        # Sauvegarder dans MongoDB
        await application.save()
        return application
    
    @staticmethod
    async def update_status(application_id: str, status_update: ApplicationUpdate) -> Application:
        application = await ApplicationService.get_by_id(application_id)
        if not application:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Application not found"
            )
        
        # Mettre à jour le statut
        application.status = status_update.status
        await application.save_document()  # Utilise notre méthode personnalisée qui met à jour updated_at
        return application
    
    @staticmethod
    async def delete(application_id: str) -> Application:
        application = await ApplicationService.get_by_id(application_id)
        if not application:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Application not found"
            )
        
        # Supprimer l'application
        await application.delete()
        return application
