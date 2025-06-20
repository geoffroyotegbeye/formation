from typing import Any, Dict, List, Type, TypeVar, Union
from bson import ObjectId
from pydantic import BaseModel

T = TypeVar('T', bound=BaseModel)

def convert_mongodb_id(obj: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convertit les ObjectId en chaînes dans un dictionnaire
    """
    if not obj:
        return obj
    
    result = {}
    for key, value in obj.items():
        if key == "_id" and isinstance(value, ObjectId):
            # Renommer _id en id et convertir en chaîne
            result["id"] = str(value)
        elif isinstance(value, ObjectId):
            # Convertir les autres ObjectId en chaînes
            result[key] = str(value)
        elif isinstance(value, dict):
            # Récursion pour les dictionnaires imbriqués
            result[key] = convert_mongodb_id(value)
        elif isinstance(value, list):
            # Récursion pour les listes
            result[key] = [
                convert_mongodb_id(item) if isinstance(item, dict) else item
                for item in value
            ]
        else:
            # Garder les autres valeurs inchangées
            result[key] = value
    
    return result

def prepare_mongodb_document(document: Any) -> Dict[str, Any]:
    """
    Prépare un document MongoDB pour la sérialisation en convertissant les ObjectId en chaînes
    et en renommant _id en id.
    """
    if not document:
        return {}
    
    # Convertir en dictionnaire si c'est un modèle Beanie
    if hasattr(document, "model_dump"):
        doc_dict = document.model_dump()
    elif hasattr(document, "dict"):
        doc_dict = document.dict()
    else:
        # Si c'est déjà un dictionnaire
        doc_dict = dict(document)
    
    return convert_mongodb_id(doc_dict)

def prepare_mongodb_documents(documents: List[Any]) -> List[Dict[str, Any]]:
    """
    Prépare une liste de documents MongoDB pour la sérialisation
    """
    return [prepare_mongodb_document(doc) for doc in documents]
