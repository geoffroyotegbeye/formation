import React, { useState, useEffect } from 'react';
import { Star, StarHalf, X as CloseIcon, CheckCircle, MessageSquarePlus } from 'lucide-react';
import { MediaTestimony } from '../testimonials/MediaTestimony';
import { getTestimonials, createTestimonial, Testimonial as TestimonialType } from '../../services/testimonialService';

// Types pour les données du formulaire
interface FormData {
  name: string;
  role: string;
  content: string;
  rating: number;
}

// Types pour les médias
type MediaType = 'image' | 'video';

interface Media {
  type: MediaType;
  url: string;
  preview?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  created_at: string;
  media_urls?: string[];
}

export const TestimonialsSection: React.FC = () => {
  // États pour la gestion des témoignages
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // États pour le formulaire
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: 'Étudiant',
    content: '',
    rating: 5
  });
  
  // États pour les notifications
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Charger les témoignages au montage du composant
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        const data = await getTestimonials(6);
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

  // Gérer les changements de formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Créer un nouvel objet témoignage avec les données du formulaire
      const newTestimonial = {
        ...formData,
        status: 'pending' as const, // Statut en attente de modération
        created_at: new Date().toISOString(),
        media_urls: [] // Pour l'instant, pas de médias uploadés
      };
      
      // Envoyer au backend
      const createdTestimonial = await createTestimonial(newTestimonial);
      
      // Mettre à jour la liste des témoignages
      setTestimonials(prev => [createdTestimonial, ...prev]);
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        role: 'Étudiant',
        content: '',
        rating: 5
      });
      
      // Afficher un message de succès
      setToastMessage('Merci pour votre témoignage ! Il sera publié après modération.');
      setShowToast(true);
      setShowForm(false);
      
      // Cacher le toast après 5 secondes
      setTimeout(() => setShowToast(false), 5000);
      
    } catch (err) {
      console.error('Erreur lors de la soumission du témoignage:', err);
      setToastMessage('Une erreur est survenue. Veuillez réessayer.');
      setShowToast(true);
    }
  };

  // Formater la date en français
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Erreur de format de date:', error);
      return '';
    }
  };

  // Afficher les étoiles de notation
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-slate-300" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  // Afficher un indicateur de chargement
  if (isLoading) {
    return (
      <section id="temoignages" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-100 p-6 rounded-lg">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Afficher un message d'erreur si nécessaire


  if (error) {
    return (
      <section id="temoignages" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="temoignages" className="py-20 bg-white relative">
      {/* Toast de notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{toastMessage}</p>
            <button 
              onClick={() => setShowToast(false)}
              className="ml-auto p-1 hover:bg-green-700 rounded transition-colors"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ce que disent nos étudiants</h2>
          <p className="text-slate-600 text-lg">Découvrez les retours de nos étudiants sur leur expérience de formation</p>
        </div>

        {/* Section des médias */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Témoignages en images</h3>
          <MediaTestimony className="max-w-6xl mx-auto" />
        </div>

        {/* Bouton pour ajouter un avis */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <MessageSquarePlus className="w-5 h-5" />
            {showForm ? 'Annuler' : 'Laisser un avis'}
          </button>
        </div>

        {/* Formulaire d'ajout de témoignage */}
        {showForm && (
          <div className="bg-slate-50 rounded-2xl p-6 mb-12 border border-slate-200 animate-in fade-in">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Partagez votre expérience</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
                    Votre rôle
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  >
                    <option value="Étudiant">Étudiant</option>
                    <option value="Professionnel">Professionnel</option>
                    <option value="Entreprise">Entreprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">
                  Votre témoignage *
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  required
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Décrivez votre expérience..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Note *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, rating: star })
                      }
                      className="text-2xl focus:outline-none"
                    >
                      {star <= formData.rating ? (
                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      ) : (
                        <Star className="w-6 h-6 text-slate-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Envoyer mon témoignage
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des témoignages */}
        {testimonials.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500 mb-6">Aucun avis disponible pour le moment.</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageSquarePlus className="w-5 h-5" />
              Soyez le premier à laisser un avis
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-xl shadow-md p-6 border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                  <span className="text-slate-500 text-sm">
                    {formatDate(testimonial.created_at)}
                  </span>
                </div>
                
                <div className="mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-slate-700 mb-3">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
