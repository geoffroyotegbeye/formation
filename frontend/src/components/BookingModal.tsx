import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Video, Phone } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
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
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl border border-gray-700 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-secondary-500 to-secondary-600 flex items-center justify-center">
              <Calendar size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Réserver un appel</h2>
              <p className="text-gray-400">Discutons de votre projet ensemble</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Options d'appel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <Video size={24} className="text-primary-400" />
                <h3 className="text-lg font-semibold text-white">Appel vidéo</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-center gap-2">
                  <Clock size={14} className="text-secondary-400" />
                  30 minutes
                </li>
                <li>• Présentation de votre projet</li>
                <li>• Analyse des besoins</li>
                <li>• Estimation préliminaire</li>
                <li>• Questions/réponses</li>
              </ul>
              <button className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
                Réserver un appel vidéo
              </button>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <Phone size={24} className="text-secondary-400" />
                <h3 className="text-lg font-semibold text-white">Appel téléphonique</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-center gap-2">
                  <Clock size={14} className="text-secondary-400" />
                  20 minutes
                </li>
                <li>• Discussion rapide</li>
                <li>• Première évaluation</li>
                <li>• Conseils gratuits</li>
                <li>• Orientation projet</li>
              </ul>
              <button className="w-full py-2 px-4 bg-secondary-600 hover:bg-secondary-700 rounded-lg transition-colors">
                Réserver un appel téléphonique
              </button>
            </div>
          </div>

          {/* Calendrier intégré */}
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Choisissez votre créneau
            </h3>
            
            {/* Simulation d'un calendrier - En production, vous intégreriez Calendly */}
            <div className="bg-white rounded-lg p-4 min-h-[400px] flex items-center justify-center">
              <div className="text-center text-gray-600">
                <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                <h4 className="text-lg font-semibold mb-2">Calendrier de réservation</h4>
                <p className="text-sm mb-4">
                  En production, ici s'afficherait le widget Calendly<br />
                  permettant de choisir un créneau disponible
                </p>
                
                {/* Créneaux d'exemple */}
                <div className="space-y-2 max-w-sm mx-auto">
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <span className="text-sm font-medium">Lundi 15 Jan - 14h00</span>
                    <button className="px-3 py-1 bg-primary-600 text-white text-xs rounded">
                      Réserver
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <span className="text-sm font-medium">Mardi 16 Jan - 10h30</span>
                    <button className="px-3 py-1 bg-primary-600 text-white text-xs rounded">
                      Réserver
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <span className="text-sm font-medium">Mercredi 17 Jan - 16h00</span>
                    <button className="px-3 py-1 bg-primary-600 text-white text-xs rounded">
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations pratiques */}
          <div className="mt-6 p-4 bg-secondary-900/20 rounded-lg border border-secondary-600/30">
            <h4 className="font-medium text-secondary-300 mb-2">Informations importantes :</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• L'appel est gratuit et sans engagement</li>
              <li>• Vous recevrez un lien de connexion par email</li>
              <li>• Possibilité de reporter 24h avant</li>
              <li>• Nous parlons français et anglais</li>
            </ul>
          </div>

          {/* Contact direct */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-3">
              Vous préférez nous contacter directement ?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+22901579725"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
              >
                <Phone size={16} />
                +229 01 57 97 25 75
              </a>
              <a
                href="https://wa.me/22901579725"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
              >
                📱 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;