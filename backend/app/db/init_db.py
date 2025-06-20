from app.core.security import get_password_hash
from app.models.user import User
from app.models.application import Application, ApplicationStatus
from datetime import datetime, timedelta

# Données initiales pour la base de données
async def init_db_data() -> None:
    # Créer un utilisateur admin si aucun n'existe
    admin = await User.find_one({"username": "otegbeyedev"})
    if not admin:
        admin_user = User(
            username="otegbeyedev",
            email="geoffroyotegbeye@gmail.com",
            full_name="Geoffroy OTEGBEYE",
            hashed_password=get_password_hash("Azerty@123"),
            is_active=True,
            is_admin=True
        )
        await admin_user.create()
        
    # Ajouter quelques candidatures de test si aucune n'existe
    applications_count = await Application.count()
    if applications_count == 0:
        applications = [
            Application(
                full_name="Thomas Dubois",
                email="thomas@example.com",
                whatsapp="+33612345678",
                age="24",
                city="Paris",
                has_code_experience=True,
                has_computer=True,
                has_internet=True,
                motivation="Je souhaite apprendre le développement web pour changer de carrière.",
                hours_per_week=20,
                how_did_you_know="Réseaux sociaux",
                status=ApplicationStatus.PENDING,
                created_at=datetime.now() - timedelta(days=5)
            ),
            Application(
                full_name="Sophie Martin",
                email="sophie@example.com",
                whatsapp="+33623456789",
                age="22",
                city="Lyon",
                has_code_experience=False,
                has_computer=True,
                has_internet=True,
                motivation="Je suis étudiante et je veux compléter ma formation.",
                hours_per_week=15,
                how_did_you_know="Ami",
                status=ApplicationStatus.APPROVED,
                created_at=datetime.now() - timedelta(days=10)
            ),
            Application(
                full_name="Lucas Bernard",
                email="lucas@example.com",
                whatsapp="+33634567890",
                age="28",
                city="Marseille",
                has_code_experience=True,
                has_computer=True,
                has_internet=True,
                motivation="Je veux me reconvertir dans le développement web.",
                hours_per_week=25,
                how_did_you_know="Recherche Google",
                status=ApplicationStatus.REJECTED,
                created_at=datetime.now() - timedelta(days=15)
            )
        ]
        
        for app in applications:
            await app.create()
