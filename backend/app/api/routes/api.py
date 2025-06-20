from fastapi import APIRouter

from app.api.routes import auth, users, applications

# Créer un routeur API principal
api_router = APIRouter()

# Inclure les sous-routeurs
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(applications.router, prefix="/applications", tags=["applications"])
