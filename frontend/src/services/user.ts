// Service pour gérer les utilisateurs
import ApiService from './api';

// Types pour les utilisateurs
export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
  is_admin: boolean;
}

export interface UpdateUserRequest {
  email?: string;
  full_name?: string;
  is_admin?: boolean;
  password?: string;
}

/**
 * Service pour gérer les opérations liées aux utilisateurs
 */
class UserService {
  /**
   * Récupère tous les utilisateurs
   * @returns Liste des utilisateurs
   */
  static async getAllUsers(): Promise<User[]> {
    return await ApiService.get<User[]>('/users');
  }

  /**
   * Récupère un utilisateur par son ID
   * @param id - ID de l'utilisateur
   * @returns Détails de l'utilisateur
   */
  static async getUserById(id: string): Promise<User> {
    return await ApiService.get<User>(`/users/${id}`);
  }

  /**
   * Crée un nouvel utilisateur
   * @param userData - Données du nouvel utilisateur
   * @returns Utilisateur créé
   */
  static async createUser(userData: CreateUserRequest): Promise<User> {
    return await ApiService.post<User>('/users', userData);
  }

  /**
   * Met à jour un utilisateur existant
   * @param id - ID de l'utilisateur
   * @param userData - Données à mettre à jour
   * @returns Utilisateur mis à jour
   */
  static async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    return await ApiService.put<User>(`/users/${id}`, userData);
  }

  /**
   * Supprime un utilisateur
   * @param id - ID de l'utilisateur
   * @returns Utilisateur supprimé
   */
  static async deleteUser(id: string): Promise<User> {
    return await ApiService.delete<User>(`/users/${id}`);
  }

  /**
   * Récupère le profil de l'utilisateur actuellement connecté
   * @returns Profil de l'utilisateur
   */
  static async getCurrentUserProfile(): Promise<User> {
    return await ApiService.get<User>('/users/me');
  }

  /**
   * Met à jour le mot de passe de l'utilisateur
   * @param oldPassword - Ancien mot de passe
   * @param newPassword - Nouveau mot de passe
   * @returns Confirmation de mise à jour
   */
  static async updatePassword(oldPassword: string, newPassword: string): Promise<{ message: string }> {
    return await ApiService.post<{ message: string }>('/users/update-password', {
      old_password: oldPassword,
      new_password: newPassword
    });
  }
}

export default UserService;
