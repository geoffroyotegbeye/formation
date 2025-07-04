// Service pour gérer les contacts
import ApiService from './api';

// Types pour les contacts
export interface Contact {
  id: string;
  full_name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactCreate {
  full_name: string;
  email: string;
  message: string;
}

export interface ContactUpdate {
  is_read: boolean;
}

/**
 * Service pour gérer les opérations liées aux contacts
 */
class ContactService {
  /**
   * Récupère tous les messages de contact
   * @returns Liste des messages de contact
   */
  static async getAllContacts(): Promise<Contact[]> {
    return await ApiService.get<Contact[]>('/contacts');
  }

  /**
   * Récupère un message de contact par son ID
   * @param id - ID du message
   * @returns Détails du message
   */
  static async getContactById(id: string): Promise<Contact> {
    return await ApiService.get<Contact>(`/contacts/${id}`);
  }

  /**
   * Met à jour le statut de lecture d'un message
   * @param id - ID du message
   * @param statusUpdate - Nouveau statut de lecture
   * @returns Message mis à jour
   */
  static async updateContactStatus(
    id: string, 
    statusUpdate: ContactUpdate
  ): Promise<Contact> {
    return await ApiService.put<Contact>(
      `/contacts/${id}`, 
      statusUpdate
    );
  }

  /**
   * Supprime un message de contact
   * @param id - ID du message
   * @returns Message supprimé
   */
  static async deleteContact(id: string): Promise<Contact> {
    return await ApiService.delete<Contact>(`/contacts/${id}`);
  }
  
  /**
   * Crée un nouveau message de contact
   * @param contact - Données du message
   * @returns Message créé
   */
  static async createContact(contact: ContactCreate): Promise<Contact> {
    return await ApiService.post<Contact>('/contacts', contact);
  }
}

export default ContactService;
