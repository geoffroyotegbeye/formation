import React, { useState } from 'react';
import { Application } from '../../services/applicationService';
import applicationService from '../../services/applicationService';
import PreviewModal from './PreviewModal';
import ConfirmationModal from './ConfirmationModal';

interface ApplicationItemProps {
  application: Application;
  onStatusChange: () => void;
}

const ApplicationItem: React.FC<ApplicationItemProps> = ({ application, onStatusChange }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

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

  const handleDelete = async () => {
    try {
      await applicationService.delete(application.id);
      setIsDeleteModalOpen(false);
      onStatusChange();
    } catch (error) {
      console.error('Erreur lors de la suppression de la candidature:', error);
    }
  };

  const handleApprove = async () => {
    try {
      await applicationService.updateStatus(application.id, { status: 'approved' });
      setIsApproveModalOpen(false);
      onStatusChange();
    } catch (error) {
      console.error('Erreur lors de l\'approbation de la candidature:', error);
    }
  };

  const handleReject = async () => {
    try {
      await applicationService.updateStatus(application.id, { status: 'rejected' });
      setIsRejectModalOpen(false);
      onStatusChange();
    } catch (error) {
      console.error('Erreur lors du rejet de la candidature:', error);
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-2 md:ml-4">
              <div className="text-xs md:text-sm font-medium text-gray-900">{application.full_name}</div>
            </div>
          </div>
        </td>
        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900 truncate max-w-[150px] lg:max-w-none">{application.email}</div>
        </td>
        <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">Formation générale</div>
        </td>
        <td className="hidden sm:table-cell px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(application.status)}`}>
            {getStatusText(application.status)}
          </span>
        </td>
        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex item-center justify-end">
            {/* Bouton de prévisualisation */}
            <button 
              className="transform hover:text-blue-500 hover:scale-110 mr-3"
              title="Voir les détails"
              onClick={() => setIsPreviewOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            
            {/* Bouton d'approbation (visible uniquement si en attente) */}
            {application.status === 'pending' && (
              <button 
                className="transform hover:text-green-500 hover:scale-110 mr-3"
                title="Approuver"
                onClick={() => setIsApproveModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
            
            {/* Bouton de rejet (visible uniquement si en attente) */}
            {application.status === 'pending' && (
              <button 
                className="transform hover:text-red-500 hover:scale-110 mr-3"
                title="Rejeter"
                onClick={() => setIsRejectModalOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
            
            {/* Bouton de suppression */}
            <button 
              className="transform hover:text-red-500 hover:scale-110"
              title="Supprimer"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      {/* Modal de prévisualisation */}
      <PreviewModal 
        application={application}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* Modal de confirmation de suppression */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer la candidature de ${application.full_name} ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {/* Modal de confirmation d'approbation */}
      <ConfirmationModal
        isOpen={isApproveModalOpen}
        title="Confirmer l'approbation"
        message={`Êtes-vous sûr de vouloir approuver la candidature de ${application.full_name} ?`}
        confirmText="Approuver"
        cancelText="Annuler"
        confirmButtonClass="bg-green-600 hover:bg-green-700"
        onConfirm={handleApprove}
        onCancel={() => setIsApproveModalOpen(false)}
      />

      {/* Modal de confirmation de rejet */}
      <ConfirmationModal
        isOpen={isRejectModalOpen}
        title="Confirmer le rejet"
        message={`Êtes-vous sûr de vouloir rejeter la candidature de ${application.full_name} ?`}
        confirmText="Rejeter"
        cancelText="Annuler"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        onConfirm={handleReject}
        onCancel={() => setIsRejectModalOpen(false)}
      />
    </>
  );
};

export default ApplicationItem;
