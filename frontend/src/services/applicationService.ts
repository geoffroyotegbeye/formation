import api from './api';

export interface Application {
  id: string;
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
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string | null;
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

export interface ApplicationUpdate {
  status: 'pending' | 'approved' | 'rejected';
}

const applicationService = {
  /**
   * Récupérer toutes les candidatures
   * @returns Liste des candidatures
   */
  async getAll(): Promise<Application[]> {
    const response = await api.get<Application[]>('/applications');
    return response.data;
  },

  /**
   * Récupérer les candidatures filtrées par statut
   * @param status Statut des candidatures à récupérer
   * @returns Liste des candidatures filtrées
   */
  async getByStatus(status: string): Promise<Application[]> {
    const response = await api.get<Application[]>(`/applications?status=${status}`);
    return response.data;
  },

  /**
   * Récupérer une candidature par son ID
   * @param id ID de la candidature
   * @returns Détails de la candidature
   */
  async getById(id: string): Promise<Application> {
    const response = await api.get<Application>(`/applications/${id}`);
    return response.data;
  },

  /**
   * Créer une nouvelle candidature
   * @param application Données de la candidature
   * @returns Candidature créée
   */
  async create(application: ApplicationCreate): Promise<Application> {
    const response = await api.post<Application>('/applications', application);
    return response.data;
  },

  /**
   * Mettre à jour le statut d'une candidature
   * @param id ID de la candidature
   * @param update Données de mise à jour (statut)
   * @returns Candidature mise à jour
   */
  async updateStatus(id: string, update: ApplicationUpdate): Promise<Application> {
    const response = await api.put<Application>(`/applications/${id}`, update);
    return response.data;
  },

  /**
   * Supprimer une candidature
   * @param id ID de la candidature
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/applications/${id}`);
  }
};

export default applicationService;
