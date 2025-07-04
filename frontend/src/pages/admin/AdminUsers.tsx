import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Search, UserPlus, Edit2, Loader2, X, Check, Eye, EyeOff } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';
import UserService, { User, CreateUserRequest, UpdateUserRequest } from '../../services/user';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // États pour les modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // États pour les formulaires
  const [newUser, setNewUser] = useState<CreateUserRequest>({
    username: '',
    email: '',
    password: '',
    full_name: '',
    is_admin: false
  });
  
  const [editUser, setEditUser] = useState<UpdateUserRequest>({
    email: '',
    full_name: '',
    is_admin: false
  });
  
  // État pour afficher/masquer les mots de passe
  const [showPassword, setShowPassword] = useState(false);

  // Récupérer tous les utilisateurs au chargement
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      toast.error('Impossible de charger les utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ouvrir le modal de suppression
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Ouvrir le modal d'édition
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditUser({
      email: user.email,
      full_name: user.full_name,
      is_admin: user.is_admin
    });
    setShowEditModal(true);
  };

  // Gérer la suppression d'un utilisateur
  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        setProcessing(true);
        await UserService.deleteUser(selectedUser.id);
        setUsers(users.filter(u => u.id !== selectedUser.id));
        toast.success('Utilisateur supprimé avec succès');
        setShowDeleteModal(false);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Impossible de supprimer l\'utilisateur');
      } finally {
        setProcessing(false);
        setSelectedUser(null);
      }
    }
  };

  // Gérer l'ajout d'un utilisateur
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const createdUser = await UserService.createUser(newUser);
      setUsers([...users, createdUser]);
      toast.success('Utilisateur ajouté avec succès');
      setShowAddModal(false);
      // Réinitialiser le formulaire
      setNewUser({
        username: '',
        email: '',
        password: '',
        full_name: '',
        is_admin: false
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      toast.error('Impossible d\'ajouter l\'utilisateur');
    } finally {
      setProcessing(false);
    }
  };

  // Gérer la modification d'un utilisateur
  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      try {
        setProcessing(true);
        const updatedUser = await UserService.updateUser(selectedUser.id, editUser);
        setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
        toast.success('Utilisateur mis à jour avec succès');
        setShowEditModal(false);
      } catch (error) {
        console.error('Erreur lors de la modification:', error);
        toast.error('Impossible de modifier l\'utilisateur');
      } finally {
        setProcessing(false);
        setSelectedUser(null);
      }
    }
  };

  // Gérer les changements dans le formulaire d'ajout
  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setNewUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Gérer les changements dans le formulaire d'édition
  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setEditUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestion des utilisateurs</h1>
            <p className="text-gray-400">Gérez tous les utilisateurs de la plateforme</p>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            <UserPlus size={20} />
            Ajouter un utilisateur
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
          />
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-primary-500" size={40} />
              <span className="ml-2 text-gray-400">Chargement des utilisateurs...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date d'inscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {user.full_name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{user.full_name}</div>
                            <div className="text-xs text-gray-400">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.email}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.is_admin 
                            ? 'bg-primary-100 text-primary-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.is_admin ? 'Admin' : 'Utilisateur'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openEditModal(user)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="text-error-400 hover:text-error-300 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {!loading && filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">Aucun utilisateur trouvé</p>
            </div>
          )}
        </motion.div>

        {/* Add User Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Ajouter un utilisateur"
        >
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleNewUserChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={newUser.full_name}
                onChange={handleNewUserChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleNewUserChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleNewUserChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_admin"
                name="is_admin"
                checked={newUser.is_admin}
                onChange={handleNewUserChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded"
              />
              <label htmlFor="is_admin" className="ml-2 block text-sm text-gray-300">
                Administrateur
              </label>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                disabled={processing}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Création...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Créer
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit User Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Modifier l'utilisateur"
        >
          <form onSubmit={handleEditUser} className="space-y-4">
            <div>
              <label htmlFor="edit_username" className="block text-sm font-medium text-gray-300 mb-1">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="edit_username"
                value={selectedUser?.username || ''}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400"
                disabled
              />
              <p className="text-xs text-gray-400 mt-1">Le nom d'utilisateur ne peut pas être modifié</p>
            </div>
            
            <div>
              <label htmlFor="edit_full_name" className="block text-sm font-medium text-gray-300 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="edit_full_name"
                name="full_name"
                value={editUser.full_name}
                onChange={handleEditUserChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="edit_email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="edit_email"
                name="email"
                value={editUser.email}
                onChange={handleEditUserChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="edit_password" className="block text-sm font-medium text-gray-300 mb-1">
                Nouveau mot de passe (laisser vide pour ne pas modifier)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="edit_password"
                  name="password"
                  value={editUser.password || ''}
                  onChange={handleEditUserChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="edit_is_admin"
                name="is_admin"
                checked={editUser.is_admin}
                onChange={handleEditUserChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded"
              />
              <label htmlFor="edit_is_admin" className="ml-2 block text-sm text-gray-300">
                Administrateur
              </label>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                disabled={processing}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirmer la suppression"
        >
          <div className="space-y-4">
            <p className="text-gray-300">
              Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{selectedUser?.full_name}</strong> ?
            </p>
            <p className="text-sm text-gray-400">
              Cette action est irréversible.
            </p>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                disabled={processing}
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 py-2 px-4 bg-error-600 hover:bg-error-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Supprimer
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
