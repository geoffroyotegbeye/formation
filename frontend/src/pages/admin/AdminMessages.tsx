import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Search, Calendar, Eye, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';
import ContactService, { Contact } from '../../services/contact';

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ContactService.getAllContacts();
      setMessages(data);
    } catch (err) {
      console.error('Erreur lors du chargement des messages:', err);
      setError('Impossible de charger les messages. Veuillez réessayer plus tard.');
      toast.error('Erreur lors du chargement des messages');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMessages = messages.filter(message =>
    message.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsRead = async (id: string) => {
    try {
      await ContactService.updateContactStatus(id, { is_read: true });
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, is_read: true } : msg
      ));
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      toast.error('Erreur lors de la mise à jour du statut du message');
    }
  };

  const openDetailModal = (message: Contact) => {
    setSelectedMessage(message);
    setShowDetailModal(true);
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const openDeleteModal = (message: Contact) => {
    setSelectedMessage(message);
    setShowDeleteModal(true);
  };

  const handleDeleteMessage = async () => {
    if (selectedMessage) {
      try {
        await ContactService.deleteContact(selectedMessage.id);
        setMessages(messages.filter(msg => msg.id !== selectedMessage.id));
        toast.success('Message supprimé avec succès');
        setShowDeleteModal(false);
        setSelectedMessage(null);
      } catch (err) {
        console.error('Erreur lors de la suppression du message:', err);
        toast.error('Erreur lors de la suppression du message');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = messages.filter(msg => !msg.is_read).length;

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
            <h1 className="text-3xl font-bold mb-2">Messages de contact</h1>
            <p className="text-gray-400">
              Gérez les messages reçus depuis le formulaire de contact
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-full">
                  {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher dans les messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
          />
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 text-primary-500 animate-spin" />
            <span className="ml-3 text-gray-400">Chargement des messages...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-error-500">{error}</p>
            <button 
              onClick={fetchMessages}
              className="mt-4 py-2 px-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredMessages.map(message => (
              <div 
                key={message.id}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border ${message.is_read ? 'border-gray-700' : 'border-primary-500'} flex flex-col gap-3`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-medium text-white">{message.full_name}</h3>
                    <p className="text-gray-400 text-sm">{message.email}</p>
                  </div>
                  <div className="text-gray-500 text-sm flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(message.created_at)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 line-clamp-2">{message.message}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openDetailModal(message)}
                    className="flex-1 py-2 px-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <Eye size={14} />
                    Lire
                  </button>
                  <button
                    onClick={() => openDeleteModal(message)}
                    className="py-2 px-3 bg-error-600 hover:bg-error-700 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {filteredMessages.length === 0 && !isLoading && !error && (
          <div className="text-center py-8">
            <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Aucun message trouvé</p>
          </div>
        )}

        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Détails du message"
        >
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Expéditeur</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-400">Nom:</span> {selectedMessage.full_name}</p>
                  <p><span className="text-gray-400">Email:</span> {selectedMessage.email}</p>
                  <p><span className="text-gray-400">Date:</span> {formatDate(selectedMessage.created_at)}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Message</h4>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: Votre message`)}
                  className="flex-1 py-2 px-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Répondre
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    openDeleteModal(selectedMessage);
                  }}
                  className="py-2 px-4 bg-error-600 hover:bg-error-700 rounded-lg transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirmer la suppression"
        >
          <div className="space-y-4">
            <p className="text-gray-300">
              Êtes-vous sûr de vouloir supprimer ce message de <strong>{selectedMessage?.full_name}</strong> ?
            </p>
            <p className="text-sm text-gray-400">Cette action est irréversible.</p>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteMessage}
                className="flex-1 py-2 px-4 bg-error-600 hover:bg-error-700 rounded-lg transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
