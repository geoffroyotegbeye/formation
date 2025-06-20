import React from 'react';
import UsersList from '../../components/admin/UsersList';

const Users: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6">Gestion des utilisateurs</h1>
      <UsersList />
    </>
  );
};

export default Users;
