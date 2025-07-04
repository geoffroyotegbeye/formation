import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LogoutButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'text';
}

/**
 * Bouton de déconnexion qui permet à l'utilisateur de se déconnecter
 * et d'être redirigé vers la page d'accueil
 */
const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  className = '', 
  variant = 'primary' 
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getButtonClasses = () => {
    const baseClasses = 'px-4 py-2 rounded-lg transition-colors';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-primary-600 hover:bg-primary-700 text-white ${className}`;
      case 'secondary':
        return `${baseClasses} bg-gray-700 hover:bg-gray-600 text-white ${className}`;
      case 'text':
        return `text-gray-300 hover:text-white transition-colors ${className}`;
      default:
        return `${baseClasses} bg-primary-600 hover:bg-primary-700 text-white ${className}`;
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className={getButtonClasses()}
      aria-label="Se déconnecter"
    >
      Se déconnecter
    </button>
  );
};

export default LogoutButton;
