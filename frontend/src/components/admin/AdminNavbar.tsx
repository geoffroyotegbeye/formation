import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

interface AdminNavbarProps {
  user?: {
    username: string;
    full_name?: string;
    email?: string;
  };
  toggleSidebar: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ user, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Utiliser le service d'authentification pour la déconnexion
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button 
            className="lg:hidden text-white focus:outline-none" 
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Tableau de bord Admin</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          {user && (
            <span className="hidden sm:inline text-sm">
              Bienvenue, <span className="font-semibold">{user.full_name || user.username}</span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-md text-xs md:text-sm"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
