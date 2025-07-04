// Service pour gérer les statistiques du tableau de bord
import ApiService from './api';
import UserService from './user';
import ApplicationService from './application';
import ContactService from './contact';

// Types pour les statistiques du tableau de bord
export interface DashboardStats {
  userCount: number;
  applicationCount: number;
  messageCount: number;
  // On pourrait ajouter d'autres statistiques ici à l'avenir
}

export interface RecentActivity {
  type: 'user' | 'application' | 'message';
  message: string;
  time: string;
  data?: any; // Données supplémentaires optionnelles
}

/**
 * Service pour gérer les opérations liées au tableau de bord
 */
class DashboardService {
  /**
   * Récupère toutes les statistiques pour le tableau de bord
   * @returns Statistiques du tableau de bord
   */
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Récupération parallèle des données pour optimiser les performances
      const [users, applications, messages] = await Promise.all([
        UserService.getAllUsers(),
        ApplicationService.getAllApplications(),
        ContactService.getAllContacts()
      ]);

      return {
        userCount: users.length,
        applicationCount: applications.length,
        messageCount: messages.length
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }

  /**
   * Récupère les activités récentes
   * @param limit - Nombre d'activités à récupérer
   * @returns Liste des activités récentes
   */
  static async getRecentActivities(limit: number = 5): Promise<RecentActivity[]> {
    try {
      // Récupération parallèle des données
      const [users, applications, messages] = await Promise.all([
        UserService.getAllUsers(),
        ApplicationService.getAllApplications(),
        ContactService.getAllContacts()
      ]);

      // Formatage des données en activités
      const userActivities: RecentActivity[] = users.slice(0, limit).map(user => ({
        type: 'user',
        message: `Nouvel utilisateur: ${user.full_name}`,
        time: this.formatTimeAgo(user.created_at),
        data: user
      }));

      const applicationActivities: RecentActivity[] = applications.slice(0, limit).map(app => ({
        type: 'application',
        message: `Nouvelle candidature: ${app.full_name}`,
        time: this.formatTimeAgo(app.created_at),
        data: app
      }));

      const messageActivities: RecentActivity[] = messages.slice(0, limit).map(msg => ({
        type: 'message',
        message: `Nouveau message de: ${msg.full_name}`,
        time: this.formatTimeAgo(msg.created_at),
        data: msg
      }));

      // Fusion et tri des activités par date (les plus récentes d'abord)
      const allActivities = [...userActivities, ...applicationActivities, ...messageActivities];
      allActivities.sort((a, b) => {
        const dateA = new Date(a.data?.created_at || 0);
        const dateB = new Date(b.data?.created_at || 0);
        return dateB.getTime() - dateA.getTime();
      });

      // Retourne les X plus récentes activités
      return allActivities.slice(0, limit);
    } catch (error) {
      console.error('Erreur lors de la récupération des activités récentes:', error);
      throw error;
    }
  }

  /**
   * Formate une date en "il y a X temps"
   * @param dateString - Date à formater
   * @returns Texte formaté
   */
  private static formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffMins > 0) {
      return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    } else {
      return 'À l\'instant';
    }
  }
}

export default DashboardService;
