import api from './api';
import { Application } from './applicationService';
import { User } from './userService';

export interface DashboardStats {
  totalUsers: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
}

export interface RecentActivity {
  type: 'user_created' | 'application_approved' | 'application_rejected' | 'application_created';
  title: string;
  description: string;
  date: string;
  id: string;
}

// Fonction utilitaire pour formater les dates selon le fuseau horaire du Bénin (UTC+1)
const formatBeninDate = (date: string): { daysSince: number; timeFormatted: string } => {
  const dateObj = new Date(date);
  const now = new Date();
  
  // Calculer la différence en jours
  const daysSince = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
  
  // Formater l'heure pour le fuseau horaire du Bénin
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
  // Générer la description du temps
  let timeDescription = '';
  if (daysSince === 0) timeDescription = `aujourd'hui à ${hours}h${minutes}`;
  else if (daysSince === 1) timeDescription = `hier à ${hours}h${minutes}`;
  else if (daysSince === 2) timeDescription = `avant-hier à ${hours}h${minutes}`;
  else timeDescription = `il y a ${daysSince} jours à ${hours}h${minutes}`;
  
  return { daysSince, timeFormatted: timeDescription };
};

const dashboardService = {
  /**
   * Récupérer les statistiques pour le tableau de bord
   * @returns Statistiques du tableau de bord
   */
  async getStats(): Promise<DashboardStats> {
    // Récupérer les utilisateurs et les candidatures
    const usersResponse = await api.get<User[]>('/users');
    const applicationsResponse = await api.get<Application[]>('/applications');
    
    const users = usersResponse.data;
    const applications = applicationsResponse.data;
    
    // Calculer les statistiques
    const totalUsers = users.length;
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const approvedApplications = applications.filter(app => app.status === 'approved').length;
    const rejectedApplications = applications.filter(app => app.status === 'rejected').length;
    
    return {
      totalUsers,
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications
    };
  },
  
  /**
   * Récupérer les activités récentes
   * @param limit Nombre d'activités à récupérer
   * @returns Liste des activités récentes
   */
  async getRecentActivity(limit: number = 5): Promise<RecentActivity[]> {
    // Récupérer les utilisateurs et les candidatures
    const usersResponse = await api.get<User[]>('/users');
    const applicationsResponse = await api.get<Application[]>('/applications');
    
    const users = usersResponse.data;
    const applications = applicationsResponse.data;
    
    // Créer des activités à partir des données
    const activities: RecentActivity[] = [];
    
    // Ajouter les utilisateurs récemment créés
    users
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
      .forEach(user => {
        // Formater la date avec le fuseau horaire du Bénin
        const { timeFormatted } = formatBeninDate(user.created_at);
        
        activities.push({
          type: 'user_created',
          title: 'Nouvel utilisateur enregistré',
          description: `${user.full_name} s'est inscrit(e) ${timeFormatted}`,
          date: user.created_at,
          id: user.id
        });
      });
      
    // Ajouter les nouvelles candidatures
    applications
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
      .forEach(app => {
        // Formater la date avec le fuseau horaire du Bénin
        const { timeFormatted } = formatBeninDate(app.created_at);
        
        activities.push({
          type: 'application_created',
          title: 'Nouvelle candidature',
          description: `${app.full_name} a soumis une candidature ${timeFormatted}`,
          date: app.created_at,
          id: app.id
        });
      });
    
    // Ajouter les candidatures récemment approuvées
    applications
      .filter(app => app.status === 'approved')
      .sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime())
      .slice(0, limit)
      .forEach(app => {
        const date = app.updated_at || app.created_at;
        // Formater la date avec le fuseau horaire du Bénin
        const { timeFormatted } = formatBeninDate(date);
        
        activities.push({
          type: 'application_approved',
          title: 'Candidature approuvée',
          description: `La candidature de ${app.full_name} a été approuvée ${timeFormatted}`,
          date: date,
          id: app.id
        });
      });
    
    // Ajouter les candidatures récemment rejetées
    applications
      .filter(app => app.status === 'rejected')
      .sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime())
      .slice(0, limit)
      .forEach(app => {
        const date = app.updated_at || app.created_at;
        // Formater la date avec le fuseau horaire du Bénin
        const { timeFormatted } = formatBeninDate(date);
        
        activities.push({
          type: 'application_rejected',
          title: 'Candidature rejetée',
          description: `La candidature de ${app.full_name} a été rejetée ${timeFormatted}`,
          date: date,
          id: app.id
        });
      });
    
    // Trier toutes les activités par date et limiter le nombre
    return activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }
};

export default dashboardService;
