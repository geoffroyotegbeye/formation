import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  CheckCircle,
  Computer,
  Wifi,
  Calendar,
  Euro
} from 'lucide-react';
import toast from 'react-hot-toast';
import ApplicationService, { ApplicationCreate } from '../services/application';

const Bootcamp: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationCreate>({
    full_name: '',
    email: '',
    whatsapp: '',
    age: '',
    city: '',
    has_code_experience: false,
    has_computer: false,
    has_internet: false,
    motivation: '',
    hours_per_week: 10,
    how_did_you_know: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await ApplicationService.createApplication(formData);
      toast.success('Candidature envoyée avec succès ! Nous vous contacterons bientôt.');
      setFormData({
        full_name: '',
        email: '',
        whatsapp: '',
        age: '',
        city: '',
        has_code_experience: false,
        has_computer: false,
        has_internet: false,
        motivation: '',
        hours_per_week: 10,
        how_did_you_know: ''
      });
    } catch (error) {
      console.error('Erreur lors de la soumission de la candidature:', error);
      toast.error("Une erreur est survenue lors de l'envoi de votre candidature. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.type === 'number' 
        ? parseInt(e.target.value, 10) 
        : e.target.value;
        
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Notre Formation Bootcamp
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Devenez développeur Full Stack en 9 mois avec notre programme intensif
          </p>
        </motion.div>
        
        {/* Programme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-primary-400">
              Programme de formation
            </h2>

             {/* Frais d'inscription */}
             <div className="my-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-600 border-dashed">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Euro size={20} className="text-primary-400" />
                Frais d'inscription
              </h3>
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  Pour valider votre inscription à la formation, des frais d'inscription de <span className="text-primary-400 font-bold">20€</span> sont requis avant le début de la formation.
                </p>
                <p className="text-gray-300 text-sm">
                  Ces frais couvrent les coûts administratifs et vous donnent accès à :
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary-400" />
                    L'accès au forum de discussion des apprenants
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary-400" />
                    Le support technique pendant toute la formation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary-400" />
                    Les ressources pédagogiques exclusives
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-success-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-success-400">Phase 1 - Fondamentaux</h3>
                    <p className="text-sm text-gray-400">2 mois gratuits</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-success-400" />
                    HTML5 & CSS3 avancé
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-success-400" />
                    JavaScript ES6+
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-success-400" />
                    Git & GitHub
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-success-400" />
                    Responsive Design
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Euro size={14} />
                    Payant
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-400">Phase 2 - Avancé</h3>
                    <div className="text-sm text-gray-400 space-y-1">
                      <p className="font-medium text-primary-300">4 mois - 50€/mois</p>
                      <p className="text-sm font-bold text-success-300 bg-success-900/20 py-1 px-2 rounded-md inline-block mt-1 border border-success-500/30">
                        ou <span className="text-success-200 text-base">170€</span> au début des 4 mois
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary-400" />
                    React & TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary-400" />
                    Python & FastAPI
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary-400" />
                    MongoDB & PostgreSQL
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary-400" />
                    APIs RESTful
                  </li>
                </ul>
                
                {/* Options de paiement */}
                <div className="mt-4 p-3 bg-primary-900/20 rounded-lg border border-primary-600/30">
                  <h4 className="text-sm font-medium text-primary-300 mb-2">Options de paiement :</h4>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex items-center justify-between">
                      <span>• Mensuel :</span>
                      <span className="text-primary-300 font-medium">50€ × 4 mois</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Paiement unique :</span>
                      <span className="text-success-300 font-medium">170€ (économie 30€)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent-400">Phase 3 - Projets</h3>
                    <p className="text-sm text-gray-400">3 mois gratuits</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-accent-400" />
                    Projets Full Stack
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-accent-400" />
                    Déploiement & DevOps
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-accent-400" />
                    Préparation certification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-accent-400" />
                    Portfolio professionnel
                  </li>
                </ul>
              </div>
            </div>

           

            {/* Résumé tarification */}
            <div className="mt-6 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-xl p-6 border border-primary-500/30">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Euro size={20} className="text-primary-400" />
                Résumé de la formation
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Frais d'inscription :</span>
                  <span className="text-primary-400 font-medium">20€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Phase 1 (2 mois) :</span>
                  <span className="text-success-400 font-medium">Gratuit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Phase 2 (4 mois) :</span>
                  <span className="text-primary-400 font-medium">50€/mois ou 170€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Phase 3 (3 mois) :</span>
                  <span className="text-success-400 font-medium">Gratuit</span>
                </div>
                <div className="border-t border-gray-600 pt-2 mt-3">
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-white">Total formation :</span>
                    <span className="text-primary-300">220€ max</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-secondary-400">
              Pourquoi nous choisir ?
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Cours en ligne</h3>
                  <p className="text-gray-400 text-sm">
                    Formation 100% en ligne avec vidéos, exercices pratiques et projets réels.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-secondary-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Mentorat personnalisé</h3>
                  <p className="text-gray-400 text-sm">
                    Accompagnement individuel avec nos développeurs expérimentés.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-accent-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Certification</h3>
                  <p className="text-gray-400 text-sm">
                    Certification reconnue par l'industrie à la fin de la formation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-success-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Flexibilité</h3>
                  <p className="text-gray-400 text-sm">
                    Apprenez à votre rythme, compatible avec votre emploi du temps.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Prérequis */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold mb-4 text-warning-400">
                Prérequis simples
              </h3>
              <p className="text-gray-300 mb-4 text-sm">
                Pas besoin d'expérience en programmation ! Seuls 3 éléments sont nécessaires :
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Computer className="w-5 h-5 text-warning-400" />
                  <span className="text-sm">Un ordinateur (PC ou Mac)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-warning-400" />
                  <span className="text-sm">Une connexion internet stable</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-warning-400" />
                  <span className="text-sm">Du temps pour apprendre (10-15h/semaine)</span>
                </div>
              </div>
            </div>

             {/* Formulaire de candidature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-2xl mx-auto pt-20"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary-400">
              Candidater maintenant
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">
                  Numéro WhatsApp *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  placeholder="+33 6 XX XX XX XX"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                    Âge *
                  </label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    placeholder="Ex: 25"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                    placeholder="Votre ville"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hours_per_week" className="block text-sm font-medium text-gray-300 mb-2">
                    Heures disponibles par semaine *
                  </label>
                  <input
                    type="number"
                    id="hours_per_week"
                    name="hours_per_week"
                    value={formData.hours_per_week}
                    onChange={handleChange}
                    required
                    min="1"
                    max="40"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="how_did_you_know" className="block text-sm font-medium text-gray-300 mb-2">
                    Comment avez-vous connu la formation ? *
                  </label>
                  <select
                    id="how_did_you_know"
                    name="how_did_you_know"
                    value={formData.how_did_you_know}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                  >
                    <option value="">Sélectionnez une option</option>
                    <option value="social_media">Réseaux sociaux</option>
                    <option value="friend">Ami ou connaissance</option>
                    <option value="search_engine">Moteur de recherche</option>
                    <option value="advertisement">Publicité</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-300">Équipement et expérience *</p>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="has_code_experience"
                    name="has_code_experience"
                    checked={formData.has_code_experience}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded"
                  />
                  <label htmlFor="has_code_experience" className="ml-2 block text-sm text-gray-300">
                    J'ai déjà une expérience en programmation
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="has_computer"
                    name="has_computer"
                    checked={formData.has_computer}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded"
                  />
                  <label htmlFor="has_computer" className="ml-2 block text-sm text-gray-300">
                    Je dispose d'un ordinateur pour suivre la formation
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="has_internet"
                    name="has_internet"
                    checked={formData.has_internet}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded"
                  />
                  <label htmlFor="has_internet" className="ml-2 block text-sm text-gray-300">
                    Je dispose d'une connexion internet stable
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-300 mb-2">
                  Motivation *
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white resize-none"
                  placeholder="Pourquoi souhaitez-vous devenir développeur ? Quels sont vos objectifs ?"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
              </button>
            </form>
          </div>
        </motion.div>
          </motion.div>

          
        </div>
        
       
      </div>
    </div>
  );
};

export default Bootcamp;