import React from 'react';
import { Application } from '../../services/applicationService';

interface PreviewModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ application, isOpen, onClose }) => {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Détails de la candidature</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Nom complet</p>
              <p className="text-base font-semibold">{application.full_name}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base">{application.email}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">WhatsApp</p>
              <p className="text-base">{application.whatsapp}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Âge</p>
              <p className="text-base">{application.age}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Ville</p>
              <p className="text-base">{application.city}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Expérience en programmation</p>
              <p className="text-base">{application.has_code_experience ? 'Oui' : 'Non'}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Statut</p>
              <p className={`inline-block px-2 py-1 rounded-full text-xs ${
                application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {application.status === 'pending' ? 'En attente' : 
                 application.status === 'approved' ? 'Approuvé' : 'Rejeté'}
              </p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Date de soumission</p>
              <p className="text-base">{new Date(application.created_at).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Motivation</p>
            <p className="text-base whitespace-pre-line">{application.motivation}</p>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Attentes</p>
            <p className="text-base whitespace-pre-line">{application.expectations}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
