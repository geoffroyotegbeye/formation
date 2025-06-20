import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <span className="material-icons text-2xl">people</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 uppercase">Utilisateurs</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <span className="material-icons text-2xl">description</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 uppercase">Candidatures</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <span className="material-icons text-2xl">pending</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 uppercase">En attente</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 text-blue-500">
              <span className="material-icons">person_add</span>
            </div>
            <div className="ml-4">
              <p className="font-medium">Nouvel utilisateur enregistré</p>
              <p className="text-sm text-gray-500">Marie Martin s'est inscrite il y a 2 jours</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-green-100 text-green-500">
              <span className="material-icons">check_circle</span>
            </div>
            <div className="ml-4">
              <p className="font-medium">Candidature approuvée</p>
              <p className="text-sm text-gray-500">La candidature de Sophie Martin a été approuvée hier</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-red-100 text-red-500">
              <span className="material-icons">cancel</span>
            </div>
            <div className="ml-4">
              <p className="font-medium">Candidature rejetée</p>
              <p className="text-sm text-gray-500">La candidature de Lucas Bernard a été rejetée il y a 3 jours</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
