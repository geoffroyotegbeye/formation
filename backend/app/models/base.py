from datetime import datetime
from typing import Optional
from beanie import Document, Indexed
from pydantic import Field

class BaseDocument(Document):
    """Document de base pour tous les modèles MongoDB"""
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        use_state_management = True
        
    async def save_document(self):
        """Méthode pour mettre à jour le champ updated_at lors de la sauvegarde"""
        self.updated_at = datetime.utcnow()
        await self.save()
