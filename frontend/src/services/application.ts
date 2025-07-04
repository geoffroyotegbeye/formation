// Service pour gérer les candidatures
import ApiService from './api';

// Types pour les candidatures
export interface Application {
  id: string;
  full_name: string;
  email: string;
  whatsapp: string;
  age: string; // Changé en string car c'est ce qu'attend le backend
  city: string;
  has_code_experience: boolean;
  has_computer: boolean;
  has_internet: boolean;
  motivation: string;
  hours_per_week: number;
  how_did_you_know: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface ApplicationCreate {
  full_name: string;
  email: string;
  whatsapp: string;
  age: string;
  city: string;
  has_code_experience: boolean;
  has_computer: boolean;
  has_internet: boolean;
  motivation: string;
  hours_per_week: number;
  how_did_you_know: string;
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WAITLISTED = 'WAITLISTED'
}

export interface ApplicationStatusUpdate {
  status: ApplicationStatus;
}

/**
 * Service pour gérer les opérations liées aux candidatures
 */
class ApplicationService {
  /**
   * Récupère toutes les candidatures
   * @returns Liste des candidatures
   */
  static async getAllApplications(): Promise<Application[]> {
    return await ApiService.get<Application[]>('/applications');
  }

  /**
   * Récupère une candidature par son ID
   * @param id - ID de la candidature
   * @returns Détails de la candidature
   */
  static async getApplicationById(id: string): Promise<Application> {
    return await ApiService.get<Application>(`/applications/${id}`);
  }

  /**
   * Met à jour le statut d'une candidature
   * @param id - ID de la candidature
   * @param statusUpdate - Nouveau statut
   * @returns Candidature mise à jour
   */
  static async updateApplicationStatus(
    id: string, 
    statusUpdate: ApplicationStatusUpdate
  ): Promise<Application> {
    return await ApiService.put<Application>(
      `/applications/${id}/status`, 
      statusUpdate
    );
  }

  /**
   * Supprime une candidature
   * @param id - ID de la candidature
   * @returns Candidature supprimée
   */
  static async deleteApplication(id: string): Promise<Application> {
    return await ApiService.delete<Application>(`/applications/${id}`);
  }
  
  /**
   * Crée une nouvelle candidature
   * @param application - Données de la candidature
   * @returns Candidature créée
   */
  static async createApplication(application: ApplicationCreate): Promise<Application> {
    return await ApiService.post<Application>('/applications', application);
  }
  
  /**
   * Traduit le statut d'une candidature en français
   * @param status - Statut de la candidature
   * @returns Traduction française du statut
   */
  static getStatusTranslation(status: ApplicationStatus): string {
    const translations = {
      [ApplicationStatus.PENDING]: 'En attente',
      [ApplicationStatus.REVIEWING]: 'En cours d\'examen',
      [ApplicationStatus.ACCEPTED]: 'Accepté',
      [ApplicationStatus.REJECTED]: 'Refusé',
      [ApplicationStatus.WAITLISTED]: 'Liste d\'attente'
    };
    
    return translations[status] || status;
  }
  
  /**
   * Retourne la couleur associée au statut
   * @param status - Statut de la candidature
   * @returns Classe Tailwind CSS pour la couleur
   */
  static getStatusColor(status: ApplicationStatus): string {
    const colors = {
      [ApplicationStatus.PENDING]: 'bg-yellow-500',
      [ApplicationStatus.REVIEWING]: 'bg-blue-500',
      [ApplicationStatus.ACCEPTED]: 'bg-green-500',
      [ApplicationStatus.REJECTED]: 'bg-red-500',
      [ApplicationStatus.WAITLISTED]: 'bg-purple-500'
    };
    
    return colors[status] || 'bg-gray-500';
  }
}

export default ApplicationService;
