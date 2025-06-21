import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Optional
from fastapi import HTTPException
import os
from pydantic import EmailStr

class EmailService:
    @staticmethod
    async def send_email(
        recipient_email: EmailStr,
        subject: str,
        html_content: str,
        sender_email: Optional[str] = None,
        sender_name: Optional[str] = None
    ) -> bool:
        """
        Envoie un email au format HTML
        
        Args:
            recipient_email: Email du destinataire
            subject: Sujet de l'email
            html_content: Contenu HTML de l'email
            sender_email: Email de l'expéditeur (optionnel, utilise la variable d'environnement par défaut)
            sender_name: Nom de l'expéditeur (optionnel, utilise la variable d'environnement par défaut)
            
        Returns:
            bool: True si l'email a été envoyé avec succès
        """
        try:
            # Récupérer les informations SMTP depuis les variables d'environnement
            smtp_server = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
            smtp_port = int(os.environ.get("SMTP_PORT", 587))
            smtp_username = os.environ.get("SMTP_USERNAME", "")
            smtp_password = os.environ.get("SMTP_PASSWORD", "")
            
            # Utiliser les valeurs par défaut si non fournies
            sender_email = sender_email or os.environ.get("EMAIL_SENDER", "geoffroyotegbeye@gmail.com")
            sender_name = sender_name or os.environ.get("EMAIL_SENDER_NAME", "Geoffroy OTEGBEYE")
            
            # Pour Gmail, l'expéditeur doit être le même que le compte d'authentification
            # sinon l'authentification échouera
            from_email = smtp_username if smtp_username else sender_email
            
            # Créer le message
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = f"{sender_name} <{from_email}>"
            message["To"] = recipient_email
            # Ajouter Reply-To pour que les réponses aillent à l'adresse souhaitée
            message["Reply-To"] = sender_email
            
            # Ajouter le contenu HTML
            html_part = MIMEText(html_content, "html")
            message.attach(html_part)
            
            # Se connecter au serveur SMTP et envoyer l'email
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                if smtp_username and smtp_password:
                    server.login(smtp_username, smtp_password)
                server.sendmail(from_email, recipient_email, message.as_string())
            
            return True
        except Exception as e:
            # Log l'erreur mais ne pas faire échouer la requête
            print(f"Erreur lors de l'envoi de l'email: {str(e)}")
            return False
    
    @staticmethod
    async def send_welcome_email(recipient_name: str, recipient_email: EmailStr) -> bool:
        """
        Envoie un email de bienvenue après la soumission d'une candidature
        
        Args:
            recipient_name: Nom du destinataire
            recipient_email: Email du destinataire
            
        Returns:
            bool: True si l'email a été envoyé avec succès
        """
        subject = "Bienvenue dans notre programme de formation en développement web"
        
        html_content = f"""
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .header {{
                    background-color: #001F5C;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }}
                .content {{
                    padding: 20px;
                    background-color: #f9f9f9;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #666;
                }}
                .button {{
                    display: inline-block;
                    background-color: #FF6B00;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Bienvenue {recipient_name} !</h1>
                </div>
                <div class="content">
                    <p>Bonjour {recipient_name},</p>
                    
                    <p>Nous sommes ravis de vous confirmer que votre candidature a bien été reçue pour notre programme de formation en développement web.</p>
                    
                    <p>Félicitations pour avoir fait ce premier pas important vers votre avenir dans le domaine du développement web ! Vous avez déjà montré votre motivation et votre détermination en soumettant votre candidature.</p>
                    
                    <p>Voici ce qui va se passer maintenant :</p>
                    <ol>
                        <li>Notre équipe va examiner attentivement votre candidature</li>
                        <li>Vous recevrez une réponse dans les prochains jours concernant la suite du processus</li>
                        <li>Si votre candidature est retenue, vous serez invité(e) à participer à la prochaine étape</li>
                    </ol>
                    
                    <p>En attendant, nous vous encourageons à rester motivé(e) et à commencer à vous familiariser avec les concepts de base de la programmation web si ce n'est pas déjà fait.</p>
                    
                    <p>Si vous avez des questions, n'hésitez pas à nous contacter en répondant à cet email.</p>
                    
                    <p>Cordialement,</p>
                    <p>L'équipe de Formation Coding</p>
                </div>
                <div class="footer">
                    <p>© 2025 Formation Coding. Tous droits réservés.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        return await EmailService.send_email(
            recipient_email=recipient_email,
            subject=subject,
            html_content=html_content
        )
