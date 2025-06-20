import api from './api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  is_active: boolean;
  is_admin: boolean;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

const authService = {
  /**
   * Authentification de l'utilisateur
   * @param credentials Identifiants de connexion
   * @returns Réponse d'authentification avec token
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await api.post<AuthResponse>('/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    // Stocker le token dans le localStorage
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    
    return response.data;
  },

  /**
   * Récupérer les informations de l'utilisateur connecté
   * @returns Informations de l'utilisateur
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/users/me');
    
    // Stocker les informations de l'utilisateur dans le localStorage
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns true si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  /**
   * Vérifier si l'utilisateur est administrateur
   * @returns true si l'utilisateur est administrateur
   */
  isAdmin(): boolean {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    
    try {
      const user = JSON.parse(userStr) as User;
      return user.is_admin;
    } catch (error) {
      return false;
    }
  }
};

export default authService;
