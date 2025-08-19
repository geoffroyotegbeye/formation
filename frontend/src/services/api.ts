// Service API pour gérer les appels au backend avec authentification
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

// URL de base de l'API
// Forcer l'utilisation de HTTPS pour l'API
const API_URL = 'https://api.akanni.solutions/api/v1';

// S'assurer que toutes les requêtes utilisent HTTPS
if (typeof window !== 'undefined' && window.location.protocol === 'http:' && !window.location.hostname.includes('localhost')) {
  window.location.href = window.location.href.replace('http:', 'https:');
}
 
/**
 * Classe pour gérer les appels API authentifiés
 */
class ApiService {
  /**
   * Effectue une requête GET authentifiée
   * @param endpoint - Point de terminaison de l'API
   * @returns Données de la réponse
   */
  static async get<T>(endpoint: string): Promise<T> {
    const token = Cookies.get('admin_token');
    
    if (!token) {
      throw new Error('Non authentifié');
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Si le token est expiré ou invalide (401)
      if (response.status === 401) {
        // Détecter si nous sommes en environnement de production (HTTPS) ou développement (HTTP)
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // En développement, ne pas utiliser secure:true car nous sommes en HTTP
        const cookieOptions = {
          secure: !isLocalhost,
          sameSite: 'lax' as 'lax'
        };
        
        Cookies.remove('admin_token', cookieOptions);
        Cookies.remove('admin_user', cookieOptions);
        toast.error('Session expirée, veuillez vous reconnecter');
        window.location.href = '/login';
        throw new Error('Session expirée');
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Une erreur est survenue');
    }
    
    return await response.json();
  }
  
  /**
   * Effectue une requête POST authentifiée
   * @param endpoint - Point de terminaison de l'API
   * @param data - Données à envoyer
   * @returns Données de la réponse
   */
  static async post<T>(endpoint: string, data: any): Promise<T> {
    const token = Cookies.get('admin_token');
    
    if (!token) {
      throw new Error('Non authentifié');
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      // Si le token est expiré ou invalide (401)
      if (response.status === 401) {
        // Détecter si nous sommes en environnement de production (HTTPS) ou développement (HTTP)
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // En développement, ne pas utiliser secure:true car nous sommes en HTTP
        const cookieOptions = {
          secure: !isLocalhost,
          sameSite: 'lax' as 'lax'
        };
        
        Cookies.remove('admin_token', cookieOptions);
        Cookies.remove('admin_user', cookieOptions);
        toast.error('Session expirée, veuillez vous reconnecter');
        window.location.href = '/login';
        throw new Error('Session expirée');
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Une erreur est survenue');
    }
    
    return await response.json();
  }
  
  /**
   * Effectue une requête PUT authentifiée
   * @param endpoint - Point de terminaison de l'API
   * @param data - Données à envoyer
   * @returns Données de la réponse
   */
  static async put<T>(endpoint: string, data: any): Promise<T> {
    const token = Cookies.get('admin_token');
    
    if (!token) {
      throw new Error('Non authentifié');
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      // Si le token est expiré ou invalide (401)
      if (response.status === 401) {
        // Détecter si nous sommes en environnement de production (HTTPS) ou développement (HTTP)
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // En développement, ne pas utiliser secure:true car nous sommes en HTTP
        const cookieOptions = {
          secure: !isLocalhost,
          sameSite: 'lax' as 'lax'
        };
        
        Cookies.remove('admin_token', cookieOptions);
        Cookies.remove('admin_user', cookieOptions);
        toast.error('Session expirée, veuillez vous reconnecter');
        window.location.href = '/login';
        throw new Error('Session expirée');
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Une erreur est survenue');
    }
    
    return await response.json();
  }
  
  /**
   * Effectue une requête DELETE authentifiée
   * @param endpoint - Point de terminaison de l'API
   * @returns Données de la réponse
   */
  static async delete<T>(endpoint: string): Promise<T> {
    const token = Cookies.get('admin_token');
    
    if (!token) {
      throw new Error('Non authentifié');
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Si le token est expiré ou invalide (401)   
      if (response.status === 401) {
        // Détecter si nous sommes en environnement de production (HTTPS) ou développement (HTTP)
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // En développement, ne pas utiliser secure:true car nous sommes en HTTP
        const cookieOptions = {
          secure: !isLocalhost,
          sameSite: 'lax' as 'lax'
        };
        
        Cookies.remove('admin_token', cookieOptions);
        Cookies.remove('admin_user', cookieOptions);
        toast.error('Session expirée, veuillez vous reconnecter');
        window.location.href = '/login';
        throw new Error('Session expirée');
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Une erreur est survenue');
    }
    
    return await response.json();
  }
}

export default ApiService;
