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
  
  // Aucune fonction paginate nécessaire car nous utilisons setCurrentPage directement

  const startIndex = indexOfFirstItem + 1;
  const endIndex = indexOfLastItem;
  const pageNumbers = Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, index) => index + 1);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-3 md:p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between md:items-center space-y-3 md:space-y-0">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Liste des utilisateurs</h2>
        <div className="flex space-x-2">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full md:w-auto border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              >
                <span className="material-icons text-sm">close</span>
              </button>
            )}
          </div>
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th scope="col" className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 md:px-6 py-3">{user.username}</td>
                    <td className="hidden md:table-cell px-6 py-3">{user.email}</td>
                    <td className="hidden sm:table-cell px-6 py-3">{user.is_admin ? 'Administrateur' : 'Utilisateur'}</td>
                    <td className="hidden lg:table-cell px-6 py-3">{user.created_at}</td>
                    <td className="px-3 md:px-6 py-3 text-right">
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
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          {filteredUsers.length > itemsPerPage && (
            <div className="px-3 md:px-6 py-3 md:py-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                <div className="text-xs md:text-sm text-gray-500 w-full md:w-auto text-center md:text-left">
                  Affichage de {startIndex} à {endIndex} sur {filteredUsers.length} utilisateurs
                </div>
                <div className="flex flex-wrap justify-center md:justify-end space-x-1 md:space-x-2 items-center w-full md:w-auto">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Précédent
                  </button>
                  
                  {/* Afficher les numéros de page avec responsive */}
                  <div className="flex space-x-1 md:space-x-2">
                    {pageNumbers.map(number => (
                      <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={endIndex >= filteredUsers.length}
                    className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm ${endIndex >= filteredUsers.length ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersList;
