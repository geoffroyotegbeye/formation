import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { AdminLogin, Dashboard, Users, Applications } from './pages/admin';
import { AdminLayout } from './components/admin';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<App />} />
      
      {/* Routes d'administration */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Routes d'administration (sans protection) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="applications" element={<Applications />} />
      </Route>
      
      {/* Route par défaut - redirection vers la page d'accueil */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
