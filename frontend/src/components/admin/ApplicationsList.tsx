import React, { useState, useEffect } from 'react';
import applicationService, { Application } from '../../services/applicationService';
import ApplicationItem from './ApplicationItem';
interface ApplicationDisplay {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  age: string;
  city: string;
  hasCodeExperience: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const ApplicationsList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Charger les candidatures depuis l'API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        let data: Application[];
        
        if (statusFilter !== 'all') {
          data = await applicationService.getByStatus(statusFilter);
        } else {
          data = await applicationService.getAll();
        }
        
        setApplications(data);
        setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
        setError('');
      } catch (err: any) {
        console.error('Erreur lors du chargement des candidatures:', err);
        setError('Erreur lors du chargement des candidatures');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [statusFilter]);
  
  // Fonction pour rafraîchir les données après une action
  const refreshData = async () => {
    try {
      setLoading(true);
      let data: Application[];
      
      if (statusFilter !== 'all') {
        data = await applicationService.getByStatus(statusFilter);
      } else {
        data = await applicationService.getAll();
      }
      
      setApplications(data);
      setError('');
    } catch (err: any) {
      console.error('Erreur lors du rafraîchissement des candidatures:', err);
      setError('Erreur lors du chargement des candidatures');
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app => 
    (app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     app.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Calculer les indices pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  
  // Aucune fonction paginate nécessaire car nous utilisons setCurrentPage directement

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Approuvé';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-3 md:p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between md:items-center space-y-3 md:space-y-0">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Liste des candidatures</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvé</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidat
                </th>
                <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Formation
                </th>
                <th scope="col" className="hidden sm:table-cell px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {currentItems.length > 0 ? (
                currentItems.map(app => (
                  <ApplicationItem 
                    key={app.id} 
                    application={app} 
                    onStatusChange={refreshData} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    Aucune candidature trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          {filteredApplications.length > itemsPerPage && (
            <div className="px-3 md:px-6 py-3 md:py-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                <div className="text-xs md:text-sm text-gray-500 w-full md:w-auto text-center md:text-left">
                  Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredApplications.length)} sur {filteredApplications.length} candidatures
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
                    {Array.from({ length: Math.ceil(filteredApplications.length / itemsPerPage) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastItem >= filteredApplications.length}
                    className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm ${indexOfLastItem >= filteredApplications.length ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
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

export default ApplicationsList;
