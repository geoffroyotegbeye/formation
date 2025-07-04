import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  is_admin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// URL de base de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si un token existe dans les cookies
    const storedToken = Cookies.get('admin_token');
    const storedUser = Cookies.get('admin_user');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        // En cas d'erreur, on nettoie les cookies
        logout();
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Créer un objet FormData pour l'envoi (compatible avec OAuth2PasswordRequestForm)
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      // Appel à l'API d'authentification
      const response = await fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error("Échec de l'authentification");
      }

      // Récupérer les données de réponse
      const data = await response.json();
      
      // Stocker le token et les informations utilisateur dans des cookies
      // Définir une expiration de 7 jours pour les cookies
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      
      // Détecter si nous sommes en environnement de production (HTTPS) ou développement (HTTP)
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      // En développement, ne pas utiliser secure:true car nous sommes en HTTP
      const cookieOptions = {
        expires: 7,
        secure: !isLocalhost, // secure uniquement en production
        sameSite: 'lax' as 'lax' // 'lax' est plus permissif que 'strict'
      };
      
      console.log('Ajout des cookies avec options:', cookieOptions);
      Cookies.set('admin_token', data.access_token, cookieOptions);
      Cookies.set('admin_user', JSON.stringify(data.user), cookieOptions);
      
      setToken(data.access_token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    }
  };

  const logout = () => {
    // Détecter si nous sommes en environnement de production (HTTPS) ou développement (HTTP)
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // En développement, ne pas utiliser secure:true car nous sommes en HTTP
    const cookieOptions = {
      secure: !isLocalhost,
      sameSite: 'lax' as 'lax'
    };
    
    // Supprimer les données d'authentification des cookies
    Cookies.remove('admin_token', cookieOptions);
    Cookies.remove('admin_user', cookieOptions);
    
    // Réinitialiser l'état
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};