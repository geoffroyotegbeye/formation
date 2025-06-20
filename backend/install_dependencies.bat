@echo off
echo Installation des dependances pour le backend FastAPI avec MongoDB...

:: Créer un environnement virtuel s'il n'existe pas
if not exist venv (
    echo Creation de l'environnement virtuel...
    python -m venv venv
)

:: Activer l'environnement virtuel
call venv\Scripts\activate.bat

:: Installer les dépendances
echo Installation des packages Python...
pip install fastapi uvicorn motor beanie pydantic pydantic-settings python-jose[cryptography] passlib[bcrypt] python-multipart httpx

echo Installation terminee!
echo Pour lancer le serveur: venv\Scripts\python.exe -m uvicorn app.main:app --reload
