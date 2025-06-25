import React, { useState, useEffect } from 'react';
import { Check, X, Star, StarHalf, Eye, ThumbsUp, ThumbsDown, Trash2, XCircle } from 'lucide-react';
import { getTestimonials, updateTestimonial, deleteTestimonial, Testimonial as TestimonialType } from '../../services/testimonialService';

// Composant de prévisualisation du témoignage
const TestimonialPreview: React.FC<{ testimonial: TestimonialType | null; onClose: () => void }> = ({ testimonial, onClose }) => {
  if (!testimonial) return null;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-current inline" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="w-5 h-5 text-yellow-400 fill-current inline" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300 inline" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">Prévisualisation du témoignage</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(testimonial.created_at || '').toLocaleDateString('fr-FR')}
                </p>
                <div className="mt-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-gray-700 whitespace-pre-line">{testimonial.content}</p>
            </div>
            
            {testimonial.media_urls && testimonial.media_urls.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {testimonial.media_urls.map((url, idx) => (
                  <div key={idx} className="border rounded overflow-hidden">
                    <img 
                      src={url} 
                      alt={`Média ${idx + 1}`} 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4 border-t">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                testimonial.status === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : testimonial.status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {testimonial.status === 'approved' ? 'Approuvé' : 
                 testimonial.status === 'rejected' ? 'Rejeté' : 'En attente'}
              </span>
              
              <div className="flex space-x-2">
                {testimonial.status !== 'approved' && (
                  <button 
                    onClick={() => {
                      if (window.confirm('Approuver ce témoignage ?')) {
                        updateTestimonial(testimonial.id!, { status: 'approved' })
                          .then(() => onClose())
                          .catch(console.error);
                      }
                    }}
                    className="flex items-center text-sm text-green-600 hover:text-green-800"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" /> Approuver
                  </button>
                )}
                
                {testimonial.status !== 'rejected' && (
                  <button 
                    onClick={() => {
                      if (window.confirm('Rejeter ce témoignage ?')) {
                        updateTestimonial(testimonial.id!, { status: 'rejected' })
                          .then(() => onClose())
                          .catch(console.error);
                      }
                    }}
                    className="flex items-center text-sm text-red-600 hover:text-red-800"
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" /> Rejeter
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    if (window.confirm('Supprimer définitivement ce témoignage ?')) {
                      deleteTestimonial(testimonial.id!)
                        .then(() => onClose())
                        .catch(console.error);
                    }
                  }}
                  className="flex items-center text-sm text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialType | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Charger les témoignages
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        // Récupérer tous les témoignages
        const data = await getTestimonials(100); // Augmenter la limite pour récupérer plus de témoignages
        setTestimonials(data);
      } catch (err) {
        setError('Erreur lors du chargement des témoignages');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);
  
  // Filtrer les témoignages en fonction du statut
  const filteredTestimonials = statusFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.status === statusFilter);

  // Afficher les étoiles de notation
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current inline" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="w-4 h-4 text-yellow-400 fill-current inline" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300 inline" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Approuver un témoignage
  const handleApprove = async (id: string) => {
    try {
      await updateTestimonial(id, { status: 'approved' });
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, status: 'approved' } : t
      ));
      setMessage({ type: 'success', text: 'Témoignage approuvé avec succès' });
    } catch (err) {
      console.error('Erreur lors de l\'approbation du témoignage:', err);
      setMessage({ type: 'error', text: 'Erreur lors de l\'approbation du témoignage' });
    }
    setTimeout(() => setMessage(null), 5000);
  };

  // Mettre à jour le statut d'un témoignage
  const updateStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
      await updateTestimonial(id, { status });
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, status } : t
      ));
      setMessage({ 
        type: 'success', 
        text: `Témoignage ${status === 'approved' ? 'approuvé' : status === 'rejected' ? 'rejeté' : 'mis en attente'} avec succès` 
      });
    } catch (err) {
      console.error('Erreur lors de la mise à jour du témoignage:', err);
      setMessage({ 
        type: 'error', 
        text: `Erreur lors de la mise à jour du témoignage` 
      });
    }
    setTimeout(() => setMessage(null), 5000);
  };

  // Supprimer un témoignage
  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer définitivement ce témoignage ?')) {
      try {
        await deleteTestimonial(id);
        setTestimonials(testimonials.filter(t => t.id !== id));
        setMessage({ type: 'success', text: 'Témoignage supprimé avec succès' });
      } catch (err) {
        console.error('Erreur lors de la suppression du témoignage:', err);
        setMessage({ type: 'error', text: 'Erreur lors de la suppression du témoignage' });
      }
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Gestion des témoignages</h1>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Tous ({testimonials.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            En attente ({testimonials.filter(t => t.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Approuvés ({testimonials.filter(t => t.status === 'approved').length})
          </button>
          <button
            onClick={() => setStatusFilter('rejected')}
            className={`px-3 py-1 text-sm rounded-full ${statusFilter === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Rejetés ({testimonials.filter(t => t.status === 'rejected').length})
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Chargement des témoignages...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contenu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTestimonials.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Aucun témoignage à afficher
                    </td>
                  </tr>
                ) : (
                  filteredTestimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(testimonial.rating)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{testimonial.content}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(testimonial.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          testimonial.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {testimonial.status === 'approved' ? 'Approuvé' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedTestimonial(testimonial)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Voir les détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {testimonial.status !== 'approved' && (
                            <button
                              onClick={() => updateStatus(testimonial.id!, 'approved')}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Approuver"
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                          )}
                          
                          {testimonial.status !== 'rejected' && (
                            <button
                              onClick={() => updateStatus(testimonial.id!, 'rejected')}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Rejeter"
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDelete(testimonial.id!)}
                            className="text-gray-600 hover:text-red-600 p-1"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de prévisualisation */}
      {selectedTestimonial && (
        <TestimonialPreview 
          testimonial={selectedTestimonial} 
          onClose={() => setSelectedTestimonial(null)} 
        />
      )}
    </div>
  );
};

export default Testimonials;
