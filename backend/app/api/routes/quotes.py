from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends, Query
from app.models.quote import Quote, QuoteStatus
from app.models.user import User
from app.api.deps import get_current_admin_user
from datetime import datetime

router = APIRouter()


@router.post("/", response_model=Quote)
async def create_quote(quote: Quote):
    """
    Créer une nouvelle demande de devis.
    """
    await quote.create()
    return quote


@router.get("/", response_model=List[Quote])
async def get_quotes(
    skip: int = 0,
    limit: int = 100,
    status: Optional[QuoteStatus] = None,
    current_admin: User = Depends(get_current_admin_user),
):
    """
    Récupérer tous les devis (admin uniquement).
    """
    query = {}
    if status:
        query["status"] = status
    
    quotes = await Quote.find(query).skip(skip).limit(limit).to_list()
    return quotes


@router.get("/{quote_id}", response_model=Quote)
async def get_quote(
    quote_id: str,
    current_admin: User = Depends(get_current_admin_user),
):
    """
    Récupérer un devis spécifique par ID (admin uniquement).
    """
    quote = await Quote.get(quote_id)
    if not quote:
        raise HTTPException(status_code=404, detail="Devis non trouvé")
    return quote


@router.put("/{quote_id}", response_model=Quote)
async def update_quote(
    quote_id: str,
    quote_update: Quote,
    current_admin: User = Depends(get_current_admin_user),
):
    """
    Mettre à jour un devis (admin uniquement).
    """
    quote = await Quote.get(quote_id)
    if not quote:
        raise HTTPException(status_code=404, detail="Devis non trouvé")
    
    quote_update.updated_at = datetime.now()
    
    # Exclure les champs qui ne peuvent pas être mis à jour
    update_data = quote_update.dict(exclude={"id", "created_at"})
    
    await quote.update({"$set": update_data})
    return await Quote.get(quote_id)


@router.patch("/{quote_id}/status", response_model=Quote)
async def update_quote_status(
    quote_id: str,
    status: QuoteStatus,
    admin_notes: Optional[str] = None,
    current_admin: User = Depends(get_current_admin_user),
):
    """
    Mettre à jour le statut d'un devis (admin uniquement).
    """
    quote = await Quote.get(quote_id)
    if not quote:
        raise HTTPException(status_code=404, detail="Devis non trouvé")
    
    update_data = {"status": status, "updated_at": datetime.now()}
    if admin_notes:
        update_data["admin_notes"] = admin_notes
    
    await quote.update({"$set": update_data})
    return await Quote.get(quote_id)


@router.delete("/{quote_id}", response_model=dict)
async def delete_quote(
    quote_id: str,
    current_admin: User = Depends(get_current_admin_user),
):
    """
    Supprimer un devis (admin uniquement).
    """
    quote = await Quote.get(quote_id)
    if not quote:
        raise HTTPException(status_code=404, detail="Devis non trouvé")
    
    await quote.delete()
    return {"message": "Devis supprimé avec succès"}
