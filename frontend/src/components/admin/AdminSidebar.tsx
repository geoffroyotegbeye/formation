import React from 'react';
import { NavLink } from 'react-router-dom';

interface AdminSidebarProps {
  closeSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ closeSidebar }) => {
  return (
    <div className="bg-gray-900 text-white w-64 h-full p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-center">Administration</h2>
        <button 
          className="lg:hidden text-gray-300 hover:text-white focus:outline-none" 
          onClick={closeSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => 
                `block p-3 rounded-lg ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`
              }
              end
              onClick={() => closeSidebar()}
            >
              <div className="flex items-center">
                <span className="material-icons mr-3">dashboard</span>
                <span>Tableau de bord</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => 
                `block p-3 rounded-lg ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`
              }
              onClick={() => closeSidebar()}
            >
              <div className="flex items-center">
                <span className="material-icons mr-3">people</span>
                <span>Utilisateurs</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/applications" 
              className={({ isActive }) => 
                `block p-3 rounded-lg ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`
              }
              onClick={() => closeSidebar()}
            >
              <div className="flex items-center">
                <span className="material-icons mr-3">description</span>
                <span>Candidatures</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/testimonials" 
              className={({ isActive }) => 
                `block p-3 rounded-lg ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`
              }
              onClick={() => closeSidebar()}
            >
              <div className="flex items-center">
                <span className="material-icons mr-3">rate_review</span>
                <span>Témoignages</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
