import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

interface AdminNavbarProps {
  user?: {
    username: string;
    full_name?: string;
    email?: string;
  };
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Utiliser le service d'authentification pour la déconnexion
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Tableau de bord Admin</h1>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-sm">
              Bienvenue, <span className="font-semibold">{user.full_name || user.username}</span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
