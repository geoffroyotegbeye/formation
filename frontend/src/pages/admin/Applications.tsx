import React from 'react';
import ApplicationsList from '../../components/admin/ApplicationsList';

const Applications: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Gestion des candidatures</h1>
      <ApplicationsList />
    </>
  );
};

export default Applications;
