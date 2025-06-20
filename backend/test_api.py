import asyncio
import httpx
import json
from pprint import pprint

# URL de base de l'API
BASE_URL = "http://localhost:8000/api/v1"

# Token d'accès (à remplir après l'authentification)
access_token = None

async def login():
    """Authentification et récupération du token"""
    global access_token
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/auth/token",
            data={"username": "admin", "password": "admin123"}
        )
        
        if response.status_code == 200:
            data = response.json()
            access_token = data["access_token"]
            print(f"Authentification réussie! Token: {access_token[:10]}...")
            return True
        else:
            print(f"Erreur d'authentification: {response.status_code}")
            print(response.text)
            return False

async def get_current_user():
    """Récupérer les informations de l'utilisateur connecté"""
    if not access_token:
        print("Pas de token d'accès disponible. Veuillez vous connecter d'abord.")
        return
    
    headers = {"Authorization": f"Bearer {access_token}"}
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/users/me", headers=headers)
        
        if response.status_code == 200:
            user_data = response.json()
            print("\nInformations de l'utilisateur connecté:")
            pprint(user_data)
        else:
            print(f"Erreur lors de la récupération de l'utilisateur: {response.status_code}")
            print(response.text)

async def get_applications():
    """Récupérer la liste des candidatures"""
    if not access_token:
        print("Pas de token d'accès disponible. Veuillez vous connecter d'abord.")
        return
    
    headers = {"Authorization": f"Bearer {access_token}"}
    
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/applications", headers=headers)
        
        if response.status_code == 200:
            applications = response.json()
            print(f"\nNombre de candidatures: {len(applications)}")
            for app in applications:
                print(f"- {app['full_name']} ({app['email']}) - Statut: {app['status']}")
        else:
            print(f"Erreur lors de la récupération des candidatures: {response.status_code}")
            print(response.text)

async def create_application():
    """Créer une nouvelle candidature"""
    # Cette opération ne nécessite pas d'authentification
    new_application = {
        "full_name": "Jean Dupont",
        "email": "jean.dupont@example.com",
        "whatsapp": "+33678901234",
        "age": "26",
        "city": "Bordeaux",
        "has_code_experience": True,
        "has_computer": True,
        "has_internet": True,
        "motivation": "Je souhaite apprendre le développement web pour créer ma propre application.",
        "hours_per_week": 18,
        "how_did_you_know": "LinkedIn"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{BASE_URL}/applications",
            json=new_application
        )
        
        if response.status_code == 201:
            application = response.json()
            print("\nNouvelle candidature créée:")
            print(f"ID: {application['id']}")
            print(f"Nom: {application['full_name']}")
            print(f"Email: {application['email']}")
            print(f"Statut: {application['status']}")
            return application['id']
        else:
            print(f"Erreur lors de la création de la candidature: {response.status_code}")
            print(response.text)
            return None

async def update_application_status(application_id, new_status):
    """Mettre à jour le statut d'une candidature"""
    if not access_token:
        print("Pas de token d'accès disponible. Veuillez vous connecter d'abord.")
        return
    
    headers = {"Authorization": f"Bearer {access_token}"}
    
    async with httpx.AsyncClient() as client:
        response = await client.put(
            f"{BASE_URL}/applications/{application_id}",
            json={"status": new_status},
            headers=headers
        )
        
        if response.status_code == 200:
            application = response.json()
            print(f"\nStatut de la candidature mis à jour:")
            print(f"ID: {application['id']}")
            print(f"Nom: {application['full_name']}")
            print(f"Nouveau statut: {application['status']}")
        else:
            print(f"Erreur lors de la mise à jour du statut: {response.status_code}")
            print(response.text)

async def main():
    """Fonction principale pour tester l'API"""
    print("=== Test de l'API Formation ===")
    
    # Authentification
    if not await login():
        return
    
    # Récupérer les informations de l'utilisateur connecté
    await get_current_user()
    
    # Récupérer la liste des candidatures
    await get_applications()
    
    # Créer une nouvelle candidature
    app_id = await create_application()
    
    if app_id:
        # Mettre à jour le statut de la candidature
        await update_application_status(app_id, "approved")
        
        # Vérifier que la liste des candidatures a été mise à jour
        await get_applications()

if __name__ == "__main__":
    asyncio.run(main())
