import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { QuoteService, Quote } from '../services/quote';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    service_type: '',
    budget: '',
    description: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Pas besoin d'instancier le service ici car nous utiliserons directement QuoteService.getInstance()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Préparer les données pour l'API
      const quoteData: Quote = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        company_name: formData.company_name || undefined,
        service_type: formData.service_type,
        description: formData.description,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        timeline: formData.timeline || undefined
      };
      
      // Envoyer la demande de devis
      await QuoteService.getInstance().createQuote(quoteData);
      
      toast.success('Demande de devis envoyée avec succès ! Nous vous contacterons dans les 24h.');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company_name: '',
        service_type: '',
        budget: '',
        description: '',
        timeline: ''
      });
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du devis:', error);
      toast.error('Une erreur est survenue lors de l\'envoi de votre demande');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop grisé */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl border border-gray-700 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Demander un devis</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                placeholder="Votre nom complet"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-300 mb-2">
                Entreprise
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div>
              <label htmlFor="service_type" className="block text-sm font-medium text-gray-300 mb-2">
                Type de service *
              </label>
              <select
                id="service_type"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
              >
                <option value="">Sélectionnez un type</option>
                <option value="Développement Web">Développement Web</option>
                <option value="Développement Mobile">Développement Mobile</option>
                <option value="Design UX/UI">Design UX/UI</option>
                <option value="Conseil Technique">Conseil Technique</option>
                <option value="Formation">Formation</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                Budget estimé
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
              >
                <option value="">Sélectionnez un budget</option>
                <option value="moins-5k">Moins de 5 000€</option>
                <option value="5k-10k">5 000€ - 10 000€</option>
                <option value="10k-25k">10 000€ - 25 000€</option>
                <option value="25k-50k">25 000€ - 50 000€</option>
                <option value="plus-50k">Plus de 50 000€</option>
              </select>
            </div>

            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                Délai souhaité
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
              >
                <option value="">Sélectionnez un délai</option>
                <option value="Urgent (moins d'1 mois)">Urgent (moins d'1 mois)</option>
                <option value="1 à 3 mois">1 à 3 mois</option>
                <option value="3 à 6 mois">3 à 6 mois</option>
                <option value="Plus de 6 mois">Plus de 6 mois</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description du projet *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white resize-none"
              placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités souhaitées, public cible..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                'Envoi en cours...'
              ) : (
                <>
                  <Send size={20} />
                  Envoyer la demande
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default QuoteModal;