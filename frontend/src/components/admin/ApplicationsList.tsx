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
  
  // Changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Liste des candidatures</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Rechercher..."
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
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
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nom</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">WhatsApp</th>
                <th className="py-3 px-6 text-left">Âge</th>
                <th className="py-3 px-6 text-left">Ville</th>
                <th className="py-3 px-6 text-left">Exp. Code</th>
                <th className="py-3 px-6 text-left">Statut</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-center">Actions</th>
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
                  <td colSpan={9} className="py-6 text-center text-gray-500">
                    Aucune candidature trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          {filteredApplications.length > itemsPerPage && (
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
                  {Array.from({ length: Math.ceil(filteredApplications.length / itemsPerPage) }).map((_, index) => (
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
                      onClick={() => paginate(Math.min(Math.ceil(filteredApplications.length / itemsPerPage), currentPage + 1))}
                      disabled={currentPage === Math.ceil(filteredApplications.length / itemsPerPage)}
                      className={`px-3 py-1 rounded-md ${currentPage === Math.ceil(filteredApplications.length / itemsPerPage) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
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

export default ApplicationsList;
