import React, { useState } from 'react';
import authService from '../../services/authService';
import { Toast } from '../../components/Toast';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Pas besoin de navigate car nous utilisons window.location.href

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log('Début de la tentative de connexion');
    
    try {
      // Authentification avec l'API
      console.log('Appel API de connexion...');
      const authResponse = await authService.login({ username, password });
      console.log('Réponse de connexion reçue:', authResponse);
      
      // S'assurer que le token est bien enregistré
      if (!authResponse.access_token) {
        throw new Error('Token non reçu');
      }
      console.log('Token reçu et enregistré');
      
      // Récupérer les informations de l'utilisateur
      console.log('Récupération des informations utilisateur...');
      const user = await authService.getCurrentUser();
      console.log('Informations utilisateur reçues:', user);
      
      // Vérifier si l'utilisateur est administrateur
      if (user && user.is_admin) {
        console.log('Utilisateur admin confirmé, préparation de la redirection');
        
        // Afficher la notification de succès
        setToastMessage(`Bienvenue ${user.full_name || user.username} !`);
        setShowToast(true);
        
        // Stocker explicitement les informations utilisateur
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Informations utilisateur stockées dans localStorage');
        
        // Utiliser setTimeout pour permettre à React de mettre à jour l'état et afficher le toast
        setTimeout(() => {
          console.log('Redirection vers le tableau de bord...');
          // Utiliser window.location pour une redirection plus directe
          window.location.href = '/admin/dashboard';
        }, 500);
      } else {
        console.log('Utilisateur non admin ou informations manquantes');
        setError('Vous n\'avez pas les droits administrateur');
        authService.logout();
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setError(error.response?.data?.detail || 'Identifiants incorrects');
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
      <div className="bg-white p-5 sm:p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        <div className="flex justify-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center">Administration</h1>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-4 text-sm sm:text-base">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1 sm:mb-2" htmlFor="username">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1 sm:mb-2" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className="absolute inset-y-0 right-0 pr-3 flex items-center" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#001F5C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#001F5C] hover:bg-blue-800 active:bg-blue-900 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#001F5C] focus:ring-offset-2 w-full transition-colors duration-200 text-sm sm:text-base relative"
            >
              {isLoading ? (
                <>
                  <span className="opacity-0">Se connecter</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </>
              ) : (
                <span className="flex items-center justify-center">
                  Se connecter
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
