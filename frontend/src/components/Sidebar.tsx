import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Mail,
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Accueil' },
  { path: '/about', icon: User, label: 'À propos' },
  { path: '/services', icon: Briefcase, label: 'Services' },
  { path: '/portfolio', icon: FolderOpen, label: 'Portfolio' },
  { path: '/bootcamp', icon: GraduationCap, label: 'Formation' },
  { path: '/contact', icon: Mail, label: 'Contact' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Hide sidebar on admin pages
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar - Centered vertically */}
      <div className="hidden lg:flex fixed left-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl p-4">
          <div className="flex flex-col items-center space-y-4">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `group relative p-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-lg scale-110'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700 hover:scale-105'
                  }`
                }
              >
                <Icon size={24} />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-700 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none transform translate-x-2 group-hover:translate-x-0">
                  {label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-700 rotate-45"></div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30">
        <div className="bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 px-4 py-3">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 min-w-0 ${
                    isActive
                      ? 'text-primary-400'
                      : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                <Icon size={20} className={`${location.pathname === path ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs font-medium truncate">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;