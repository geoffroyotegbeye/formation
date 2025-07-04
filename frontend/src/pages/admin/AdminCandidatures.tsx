import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Download, Search, Calendar, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';
import ApplicationService, { Application, ApplicationStatus } from '../../services/application';

// Interface pour le filtrage et la recherche
interface FilterOptions {
  searchTerm: string;
}

const AdminCandidatures: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Récupérer les candidatures depuis le backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const data = await ApplicationService.getAllApplications();
        setApplications(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la récupération des candidatures:', err);
        setError('Impossible de charger les candidatures. Veuillez réessayer plus tard.');
        toast.error('Erreur lors du chargement des candidatures');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Filtrer les candidatures selon le terme de recherche
  const filteredApplications = applications.filter(application =>
    application.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mettre à jour le statut d'une candidature
  const updateStatus = async (id: string, newStatus: ApplicationStatus) => {
    try {
      setIsLoading(true);
      await ApplicationService.updateApplicationStatus(id, { status: newStatus });
      
      // Mettre à jour l'état local après la mise à jour réussie
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      
      // Mettre à jour la candidature sélectionnée si elle est ouverte
      if (selectedApplication && selectedApplication.id === id) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }
      
      toast.success('Statut mis à jour avec succès');
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      toast.error('Erreur lors de la mise à jour du statut');
    } finally {
      setIsLoading(false);
    }
  };

  // Ouvrir le modal de détail
  const openDetailModal = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  // Obtenir la couleur du badge de statut
  const getStatusColor = (status: ApplicationStatus) => {
    return ApplicationService.getStatusColor(status);
  };

  // Obtenir le libellé du statut en français
  const getStatusLabel = (status: ApplicationStatus) => {
    return ApplicationService.getStatusTranslation(status);
  };

  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Formater l'expérience en code
  const getExperienceLabel = (hasExperience: boolean) => {
    return hasExperience ? 'Oui' : 'Non';
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Candidatures Bootcamp</h1>
            <p className="text-gray-400">Gérez les candidatures reçues pour la formation</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary-600 hover:bg-secondary-700 rounded-lg transition-colors">
            <Download size={20} />
            Exporter CSV
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher une candidature..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </motion.div>

        {/* État de chargement */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-primary-500" size={40} />
            <span className="ml-2 text-gray-400">Chargement des candidatures...</span>
          </div>
        )}

        {/* Message d'erreur */}
        {error && !isLoading && (
          <div className="bg-error-900 text-white p-4 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-error-700 hover:bg-error-600 rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Tableau des candidatures - Responsive */}
        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="p-3 rounded-tl-lg">Candidat</th>
                  {/* Email visible uniquement sur desktop */}
                  <th className="p-3 hidden lg:table-cell">Email</th>
                  {/* Formation visible sur tablette et desktop */}
                  <th className="p-3 hidden md:table-cell">Formation</th>
                  {/* Statut visible sur tablette et desktop */}
                  <th className="p-3 hidden md:table-cell">Statut</th>
                  <th className="p-3 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-400">
                      Aucune candidature trouvée
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((application) => (
                    <tr key={application.id} className="bg-gray-800 hover:bg-gray-750 transition-colors">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{application.full_name}</p>
                          <p className="text-xs text-gray-400 md:hidden">{application.email}</p>
                          <p className="text-xs text-gray-400 md:hidden">
                            <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(application.status)} mr-1`}></span>
                            {getStatusLabel(application.status)}
                          </p>
                        </div>
                      </td>
                      <td className="p-3 hidden lg:table-cell">{application.email}</td>
                      <td className="p-3 hidden md:table-cell">Bootcamp Dev Web</td>
                      <td className="p-3 hidden md:table-cell">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(application.status)}`}>
                          {getStatusLabel(application.status)}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openDetailModal(application)}
                            className="p-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                            title="Voir les détails"
                          >
                            <Eye size={16} />
                          </button>
                          
                          {application.status === ApplicationStatus.PENDING && (
                            <>
                              <button
                                onClick={() => updateStatus(application.id, ApplicationStatus.ACCEPTED)}
                                className="p-2 bg-success-600 hover:bg-success-700 rounded-lg transition-colors"
                                title="Accepter"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => updateStatus(application.id, ApplicationStatus.REJECTED)}
                                className="p-2 bg-error-600 hover:bg-error-700 rounded-lg transition-colors"
                                title="Refuser"
                              >
                                ✗
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal de détail */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Détails de la candidature"
        >
          {selectedApplication && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Informations personnelles</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Nom:</span> {selectedApplication.full_name}</p>
                  <p><span className="text-gray-400">Email:</span> {selectedApplication.email}</p>
                  <p><span className="text-gray-400">WhatsApp:</span> {selectedApplication.whatsapp}</p>
                  <p><span className="text-gray-400">Âge:</span> {selectedApplication.age} ans</p>
                  <p><span className="text-gray-400">Ville:</span> {selectedApplication.city}</p>
                  <p><span className="text-gray-400">Date d'envoi:</span> {formatDate(selectedApplication.created_at)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">Expérience et équipement</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Expérience en code:</span> {getExperienceLabel(selectedApplication.has_code_experience)}</p>
                  <p><span className="text-gray-400">Possède un ordinateur:</span> {getExperienceLabel(selectedApplication.has_computer)}</p>
                  <p><span className="text-gray-400">Accès internet:</span> {getExperienceLabel(selectedApplication.has_internet)}</p>
                  <p><span className="text-gray-400">Heures disponibles/semaine:</span> {selectedApplication.hours_per_week}h</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">Motivation</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedApplication.motivation}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">Comment a-t-il connu la formation</h4>
                <p className="text-sm text-gray-300">
                  {selectedApplication.how_did_you_know}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">Statut actuel</h4>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedApplication.status)}`}>
                  {getStatusLabel(selectedApplication.status)}
                </span>
              </div>

              {selectedApplication.status === ApplicationStatus.PENDING && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      updateStatus(selectedApplication.id, ApplicationStatus.ACCEPTED);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 py-2 px-4 bg-success-600 hover:bg-success-700 rounded-lg transition-colors"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => {
                      updateStatus(selectedApplication.id, ApplicationStatus.REJECTED);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 py-2 px-4 bg-error-600 hover:bg-error-700 rounded-lg transition-colors"
                  >
                    Refuser
                  </button>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminCandidatures;