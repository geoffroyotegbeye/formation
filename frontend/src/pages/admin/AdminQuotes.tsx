import React, { useState, useEffect } from 'react';
import { QuoteService, Quote } from '../../services/quote';
import { motion } from 'framer-motion';
import { Search, Trash2, CheckCircle, XCircle, Clock, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState<'pending' | 'approved' | 'rejected' | 'completed'>('pending');
  const [adminNotes, setAdminNotes] = useState('');

  const quoteService = QuoteService.getInstance();

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredQuotes(quotes);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredQuotes(
        quotes.filter(
          quote =>
            quote.full_name.toLowerCase().includes(term) ||
            quote.email.toLowerCase().includes(term) ||
            quote.company_name?.toLowerCase().includes(term) ||
            quote.service_type.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, quotes]);

  const fetchQuotes = async () => {
    try {
      setIsLoading(true);
      const data = await quoteService.getAllQuotes();
      setQuotes(data);
      setFilteredQuotes(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des devis:', error);
      toast.error('Erreur lors du chargement des devis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuote = async () => {
    if (!selectedQuote?.id) return;

    try {
      await quoteService.deleteQuote(selectedQuote.id);
      setQuotes(quotes.filter(quote => quote.id !== selectedQuote.id));
      toast.success('Devis supprimé avec succès');
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du devis:', error);
      toast.error('Erreur lors de la suppression du devis');
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedQuote?.id) return;

    try {
      const updatedQuote = await quoteService.updateQuoteStatus(
        selectedQuote.id,
        statusToUpdate,
        adminNotes
      );

      setQuotes(quotes.map(quote => (quote.id === selectedQuote.id ? updatedQuote : quote)));
      toast.success(`Statut mis à jour: ${getStatusLabel(statusToUpdate)}`);
      setIsStatusModalOpen(false);
      setAdminNotes('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const openDeleteModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsDeleteModalOpen(true);
  };

  const openViewModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setIsViewModalOpen(true);
  };

  const openStatusModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setStatusToUpdate(quote.status || 'pending');
    setAdminNotes(quote.admin_notes || '');
    setIsStatusModalOpen(true);
  };

  const getStatusLabel = (status: string | undefined) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Approuvé';
      case 'rejected':
        return 'Rejeté';
      case 'completed':
        return 'Complété';
      default:
        return 'Inconnu';
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm', { locale: fr });
    } catch (error) {
      return 'Date invalide';
    }
  };

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Gestion des Devis</h1>
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun devis trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{quote.full_name}</div>
                        <div className="text-sm text-gray-500">{quote.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900">{quote.service_type}</div>
                      {quote.company_name && (
                        <div className="text-sm text-gray-500">{quote.company_name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-500">{formatDate(quote.created_at)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(quote.status)}
                        <span className="ml-2 text-sm">{getStatusLabel(quote.status)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openViewModal(quote)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Voir
                      </button>
                      <button
                        onClick={() => openStatusModal(quote)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Statut
                      </button>
                      <button
                        onClick={() => openDeleteModal(quote)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modal de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer le devis de <span className="font-semibold">{selectedQuote?.full_name}</span> ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteQuote}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualisation */}
      {isViewModalOpen && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Détails du devis</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Client</h4>
                <p className="text-base font-medium">{selectedQuote.full_name}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                <p className="text-base">{selectedQuote.email}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Téléphone</h4>
                <p className="text-base">{selectedQuote.phone}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Entreprise</h4>
                <p className="text-base">{selectedQuote.company_name || 'Non spécifié'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Type de service</h4>
                <p className="text-base">{selectedQuote.service_type}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Budget</h4>
                <p className="text-base">{selectedQuote.budget ? `${selectedQuote.budget} €` : 'Non spécifié'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Délai souhaité</h4>
                <p className="text-base">{selectedQuote.timeline || 'Non spécifié'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Statut</h4>
                <div className="flex items-center">
                  {getStatusIcon(selectedQuote.status)}
                  <span className="ml-2">{getStatusLabel(selectedQuote.status)}</span>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Date de création</h4>
                <p className="text-base">{formatDate(selectedQuote.created_at)}</p>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-base whitespace-pre-wrap">{selectedQuote.description}</p>
              </div>
              
              {selectedQuote.admin_notes && (
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Notes administratives</h4>
                  <p className="text-base whitespace-pre-wrap bg-gray-50 p-3 rounded-md">{selectedQuote.admin_notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  openStatusModal(selectedQuote);
                }}
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
              >
                Modifier le statut
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de mise à jour du statut */}
      {isStatusModalOpen && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Mettre à jour le statut</h3>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut actuel: {getStatusLabel(selectedQuote.status)}
              </label>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setStatusToUpdate('pending')}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                    statusToUpdate === 'pending'
                      ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Clock className="h-5 w-5 mr-2" />
                  En attente
                </button>
                
                <button
                  type="button"
                  onClick={() => setStatusToUpdate('approved')}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                    statusToUpdate === 'approved'
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Approuvé
                </button>
                
                <button
                  type="button"
                  onClick={() => setStatusToUpdate('rejected')}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                    statusToUpdate === 'rejected'
                      ? 'bg-red-100 border-red-500 text-red-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Rejeté
                </button>
                
                <button
                  type="button"
                  onClick={() => setStatusToUpdate('completed')}
                  className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                    statusToUpdate === 'completed'
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Check className="h-5 w-5 mr-2" />
                  Complété
                </button>
              </div>
              
              <div className="mt-4">
                <label htmlFor="admin_notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notes administratives
                </label>
                <textarea
                  id="admin_notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ajoutez des notes ou commentaires (optionnel)"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuotes;
