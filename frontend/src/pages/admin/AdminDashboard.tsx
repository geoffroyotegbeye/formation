import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, FileText, Mail, BarChart3, TrendingUp, Clock, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import DashboardService, { DashboardStats, RecentActivity } from '../../services/dashboard';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any[]>([
    {
      icon: Users,
      label: 'Utilisateurs',
      value: '-',
      color: 'primary'
    },
    {
      icon: FileText,
      label: 'Candidatures',
      value: '-',
      color: 'secondary'
    },
    {
      icon: Mail,
      label: 'Messages',
      value: '-',
      color: 'accent'
    },
    {
      icon: BarChart3,
      label: 'Vues',
      value: '0',
      color: 'success'
    }
  ]);

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dashboardStats = await DashboardService.getDashboardStats();
      setStats([
        {
          icon: Users,
          label: 'Utilisateurs',
          value: dashboardStats.userCount.toString(),
          color: 'primary'
        },
        {
          icon: FileText,
          label: 'Candidatures',
          value: dashboardStats.applicationCount.toString(),
          color: 'secondary'
        },
        {
          icon: Mail,
          label: 'Messages',
          value: dashboardStats.messageCount.toString(),
          color: 'accent'
        },
        {
          icon: BarChart3,
          label: 'Vues',
          value: '0',
          color: 'success'
        }
      ]);
      const activities = await DashboardService.getRecentActivities(4);
      setRecentActivities(activities);
    } catch (err) {
      console.error('Erreur lors du chargement des données du tableau de bord:', err);
      setError('Impossible de charger les données. Veuillez réessayer plus tard.');
      toast.error('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  const colorMap = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    accent: 'from-accent-500 to-accent-600',
    success: 'from-success-500 to-success-600',
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-gray-400">Aperçu de vos données et statistiques</p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 text-primary-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-error-500">{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="mt-4 py-2 px-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorMap[stat.color as keyof typeof colorMap]} flex items-center justify-center`}>
                      <stat.icon size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Link to="/admin/users" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-colors group">
                <Users className="w-8 h-8 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">Gérer les utilisateurs</h3>
                <p className="text-gray-400 text-sm">Voir et gérer tous les utilisateurs inscrits</p>
              </Link>

              <Link to="/admin/candidatures" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-secondary-500 transition-colors group">
                <FileText className="w-8 h-8 text-secondary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">Candidatures bootcamp</h3>
                <p className="text-gray-400 text-sm">Examiner les nouvelles candidatures</p>
              </Link>

              <Link to="/admin/messages" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-colors group">
                <Mail className="w-8 h-8 text-accent-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">Messages de contact</h3>
                <p className="text-gray-400 text-sm">Répondre aux messages reçus</p>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
