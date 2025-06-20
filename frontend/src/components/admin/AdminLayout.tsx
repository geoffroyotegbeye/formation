import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import authService from '../../services/authService';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier d'abord si un token existe
        const isLoggedIn = authService.isAuthenticated();
        console.log('AdminLayout: isAuthenticated() =', isLoggedIn);
        
        if (!isLoggedIn) {
          console.log('AdminLayout: Pas de token, redirection vers login');
          setIsAuthenticated(false);
          setIsLoading(false);
          navigate('/admin/login');
          return;
        }
        
        // Récupérer les informations utilisateur depuis localStorage d'abord
        const userStr = localStorage.getItem('user');
        
        if (userStr) {
          try {
            const cachedUser = JSON.parse(userStr);
            console.log('AdminLayout: Utilisateur trouvé dans localStorage:', cachedUser);
            setUser(cachedUser);
            setIsAuthenticated(true);
            setIsLoading(false);
          } catch (e) {
            console.error('AdminLayout: Erreur de parsing JSON pour user:', e);
            // Continuer avec l'appel API si le parsing échoue
          }
        } else {
          // Si pas dans localStorage, essayer de récupérer depuis l'API
          try {
            console.log('AdminLayout: Récupération des informations utilisateur depuis l\'API...');
            const apiUser = await authService.getCurrentUser();
            console.log('AdminLayout: Réponse API utilisateur:', apiUser);
            
            if (apiUser) {
              setUser(apiUser);
              setIsAuthenticated(true);
              // Mettre à jour le localStorage
              localStorage.setItem('user', JSON.stringify(apiUser));
            } else {
              console.log('AdminLayout: Aucun utilisateur retourné par l\'API');
              setIsAuthenticated(false);
              navigate('/admin/login');
            }
          } catch (error) {
            console.error('AdminLayout: Erreur lors de la récupération de l\'utilisateur:', error);
            setIsAuthenticated(false);
            navigate('/admin/login');
          }
        }
      } catch (error) {
        console.error('AdminLayout: Erreur lors de la vérification de l\'authentification:', error);
        setIsAuthenticated(false);
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si non authentifié, ne rien afficher (la redirection est déjà gérée dans useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Fonction pour basculer l'état de la sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Si authentifié, afficher le layout admin
  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* Overlay pour fermer la sidebar sur mobile quand elle est ouverte */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar responsive */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <AdminSidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>
      
      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar user={user} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="container mx-auto px-0 sm:px-2 md:px-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
