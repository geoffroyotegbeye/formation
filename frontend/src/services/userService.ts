import api from './api';

export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface UserCreate {
  username: string;
  email: string;
  full_name: string;
  password: string;
  is_active?: boolean;
  is_admin?: boolean;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  full_name?: string;
  password?: string;
  is_active?: boolean;
  is_admin?: boolean;
}

const userService = {
  /**
   * Récupérer tous les utilisateurs
   * @returns Liste des utilisateurs
   */
  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  /**
   * Récupérer un utilisateur par son ID
   * @param id ID de l'utilisateur
   * @returns Détails de l'utilisateur
   */
  async getById(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  /**
   * Créer un nouvel utilisateur
   * @param user Données de l'utilisateur
   * @returns Utilisateur créé
   */
  async create(user: UserCreate): Promise<User> {
    const response = await api.post<User>('/users', user);
    return response.data;
  },

  /**
   * Mettre à jour un utilisateur
   * @param id ID de l'utilisateur
   * @param update Données de mise à jour
   * @returns Utilisateur mis à jour
   */
  async update(id: string, update: UserUpdate): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, update);
    return response.data;
  },

  /**
   * Supprimer un utilisateur
   * @param id ID de l'utilisateur
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }
};

export default userService;
