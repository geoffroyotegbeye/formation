FROM python:3.11

WORKDIR /app

# Copier les requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code
COPY . .

# Commande correcte pour FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3002"]
# OU
# CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]