import React, { useState } from 'react';
import authService from '../../services/authService';
import { Toast } from '../../components/Toast';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  // Pas besoin de navigate car nous utilisons window.location.href

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setError(error.response?.data?.detail || 'Identifiants incorrects');
    }
  };
  
  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Administration</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
