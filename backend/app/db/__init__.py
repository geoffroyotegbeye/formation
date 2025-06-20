# Ce fichier est nécessaire pour que Python traite le répertoire comme un package
from app.db.session import init_db
from app.db.init_db import init_db_data

__all__ = ["init_db", "init_db_data"]
