from fastapi import APIRouter, Depends, HTTPException, status, Query, Response
from typing import List, Optional, Dict, Any
from bson import ObjectId

from app.api.deps import get_current_admin_user
from app.models.user import User
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate, ContactResponse
from app.utils.model_helpers import prepare_mongodb_document, prepare_mongodb_documents
from app.services.email_service import EmailService

router = APIRouter(tags=["contacts"])

@router.get("/")
async def read_contacts(
    response: Response,
    skip: int = 0, 
    limit: int = 100,
    is_read: Optional[bool] = Query(None, description="Filtrer par statut de lecture"),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Récupérer tous les messages de contact (admin uniquement)
    """
    # Construire la requête
    query = {}
    
    # Filtrer par statut de lecture si spécifié
    if is_read is not None:
        query["is_read"] = is_read
    
    # Exécuter la requête
    contacts = await Contact.find(query).sort([("created_at", -1)]).skip(skip).limit(limit).to_list()
    
    # Convertir les documents MongoDB en dictionnaires avec les ID convertis en chaînes
    result = prepare_mongodb_documents(contacts)
    return result

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_contact(contact_in: ContactCreate):
    """
    Créer un nouveau message de contact (accessible publiquement)
    """
    # Créer le message de contact
    contact = Contact(
        full_name=contact_in.full_name,
        email=contact_in.email,
        message=contact_in.message,
        is_read=False
    )
    await contact.create()
    
    # Envoyer un email de notification à l'administrateur
    try:
        # Vous pouvez créer une méthode spécifique dans EmailService pour les notifications de contact
        await EmailService.send_email(
            recipient_email="admin@example.com",  # Remplacer par l'email de l'admin
            subject="Nouveau message de contact",
            html_content=f"""
            <h2>Nouveau message de contact</h2>
            <p><strong>De:</strong> {contact_in.full_name} ({contact_in.email})</p>
            <p><strong>Message:</strong></p>
            <p>{contact_in.message}</p>
            """
        )
    except Exception as e:
        # Log l'erreur mais ne pas faire échouer la requête
        print(f"Erreur lors de l'envoi de l'email de notification: {str(e)}")
    
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(contact)
    return result

@router.get("/{contact_id}")
async def read_contact(
    contact_id: str, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Récupérer un message de contact par son ID (admin uniquement)
    """
    try:
        obj_id = ObjectId(contact_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID de message invalide"
        )
        
    contact = await Contact.get(obj_id)
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message non trouvé"
        )
    
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(contact)
    return result

@router.put("/{contact_id}")
async def update_contact_status(
    contact_id: str, 
    contact_update: ContactUpdate, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Mettre à jour le statut de lecture d'un message (admin uniquement)
    """
    try:
        obj_id = ObjectId(contact_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID de message invalide"
        )
        
    contact = await Contact.get(obj_id)
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message non trouvé"
        )
    
    # Mettre à jour le statut de lecture
    contact.is_read = contact_update.is_read
    await contact.save()
    
    # Convertir le document MongoDB en dictionnaire avec l'ID converti en chaîne
    result = prepare_mongodb_document(contact)
    return result

@router.delete("/{contact_id}")
async def delete_contact(
    contact_id: str, 
    current_user: User = Depends(get_current_admin_user)
):
    """
    Supprimer un message de contact (admin uniquement)
    """
    try:
        obj_id = ObjectId(contact_id)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID de message invalide"
        )
        
    contact = await Contact.get(obj_id)
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message non trouvé"
        )
    
    # Sauvegarder une copie avant suppression
    result = prepare_mongodb_document(contact)
    
    # Supprimer le message
    await contact.delete()
    return result
