import React, { useState, useEffect } from 'react';
import userService, { User } from '../../services/userService';

// Interface User est déjà importée depuis userService

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  
  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');
        console.log('Chargement des utilisateurs...');
        const data = await userService.getAll();
        console.log('Utilisateurs reçus:', data);
        setUsers(data);
      } catch (err: any) {
        console.error('Erreur lors du chargement des utilisateurs:', err);
        setError(err.message || 'Erreur lors du chargement des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculer les indices pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  
  // Changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Liste des utilisateurs</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Rechercher..."
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Ajouter
          </button>
        </div>
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nom d'utilisateur</th>
                <th className="py-3 px-6 text-left">Nom complet</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Rôle</th>
                <th className="py-3 px-6 text-left">Statut</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6">{user.id}</td>
                    <td className="py-3 px-6">{user.username}</td>
                    <td className="py-3 px-6">{user.full_name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.is_admin ? 'Administrateur' : 'Utilisateur'}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button className="transform hover:text-blue-500 hover:scale-110 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="transform hover:text-red-500 hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          {filteredUsers.length > itemsPerPage && (
            <div className="flex justify-center mt-6">
              <nav>
                <ul className="flex space-x-2">
                  {/* Bouton précédent */}
                  <li>
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      &laquo;
                    </button>
                  </li>
                  
                  {/* Pages numérotées */}
                  {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }).map((_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  
                  {/* Bouton suivant */}
                  <li>
                    <button
                      onClick={() => paginate(Math.min(Math.ceil(filteredUsers.length / itemsPerPage), currentPage + 1))}
                      disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
                      className={`px-3 py-1 rounded-md ${currentPage === Math.ceil(filteredUsers.length / itemsPerPage) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersList;
