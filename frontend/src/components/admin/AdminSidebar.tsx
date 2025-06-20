import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Administration</h2>
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
            >
              <div className="flex items-center">
                <span className="material-icons mr-3">description</span>
                <span>Candidatures</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
