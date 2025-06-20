@echo off
echo Demarrage des serveurs de developpement...

:: Ouvrir un terminal pour le backend
start cmd /k "cd backend && call venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --port 8000"

:: Attendre quelques secondes pour que le backend démarre
timeout /t 5

:: Ouvrir un terminal pour le frontend
start cmd /k "cd frontend && npm run dev"

echo Les serveurs ont ete lances!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo Documentation API: http://localhost:8000/docs
