import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Search, Filter, Calendar } from 'lucide-react';
import Modal from '../components/Modal';

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Plateforme de vente en ligne complète avec gestion des commandes et paiements.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    longDescription: 'Une plateforme e-commerce complète développée avec React et Node.js. Inclut la gestion des produits, commandes, paiements Stripe, et un tableau de bord admin complet.',
    features: ['Gestion produits', 'Panier dynamique', 'Paiement Stripe', 'Dashboard admin', 'Responsive design'],
    year: 2024,
    category: 'E-commerce'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Application de gestion de tâches avec collaboration en temps réel.',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    longDescription: 'Application de gestion de tâches avec collaboration en temps réel, notifications push et synchronisation multi-appareils.',
    features: ['Collaboration temps réel', 'Notifications push', 'Drag & Drop', 'Calendrier intégré', 'Équipes multiples'],
    year: 2024,
    category: 'Productivité'
  },
  {
    id: 3,
    title: 'Portfolio Créatif',
    description: 'Site portfolio pour artiste avec galerie interactive et animations.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Next.js', 'Framer Motion', 'Sanity CMS', 'Vercel'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    longDescription: 'Portfolio créatif avec galerie interactive, animations sophistiquées et CMS pour la gestion de contenu.',
    features: ['Galerie interactive', 'Animations avancées', 'CMS intégré', 'SEO optimisé', 'Performance maximale'],
    year: 2023,
    category: 'Portfolio'
  },
  {
    id: 4,
    title: 'Learning Platform',
    description: 'Plateforme d\'apprentissage en ligne avec vidéos et quiz interactifs.',
    image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'Python', 'Django', 'AWS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    longDescription: 'Plateforme d\'apprentissage complète avec cours vidéo, quiz interactifs, suivi de progression et certification.',
    features: ['Cours vidéo', 'Quiz interactifs', 'Suivi progression', 'Certification', 'Forum communauté'],
    year: 2023,
    category: 'Éducation'
  },
  {
    id: 5,
    title: 'Real Estate App',
    description: 'Application immobilière avec recherche avancée et visite virtuelle.',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Google Maps'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    longDescription: 'Application immobilière mobile avec recherche géolocalisée, filtres avancés et visite virtuelle 360°.',
    features: ['Recherche géolocalisée', 'Filtres avancés', 'Visite virtuelle', 'Favoris', 'Notifications push'],
    year: 2022,
    category: 'Immobilier'
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    description: 'Tableau de bord analytique avec visualisations de données en temps réel.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'D3.js', 'Node.js', 'Redis'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    longDescription: 'Dashboard analytique avec visualisations de données interactives, métriques en temps réel et rapports automatisés.',
    features: ['Métriques temps réel', 'Graphiques interactifs', 'Rapports automatisés', 'Alertes personnalisées', 'Export données'],
    year: 2022,
    category: 'Analytics'
  },
  {
    id: 7,
    title: 'Restaurant Booking System',
    description: 'Système de réservation pour restaurants avec gestion des tables.',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    longDescription: 'Système complet de réservation pour restaurants avec gestion des tables, menu en ligne et paiements.',
    features: ['Réservation en ligne', 'Gestion tables', 'Menu digital', 'Paiements', 'Notifications SMS'],
    year: 2021,
    category: 'Restauration'
  },
  {
    id: 8,
    title: 'Fitness Tracker App',
    description: 'Application mobile de suivi fitness avec programmes personnalisés.',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Flutter', 'Firebase', 'Node.js', 'MongoDB'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    longDescription: 'Application mobile de fitness avec programmes personnalisés, suivi des performances et communauté.',
    features: ['Programmes personnalisés', 'Suivi performances', 'Communauté', 'Défis', 'Statistiques'],
    year: 2021,
    category: 'Santé'
  }
];

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedTechnology, setSelectedTechnology] = useState<string | 'all'>('all');

  // Extraire les années et technologies uniques
  const years = useMemo(() => {
    const uniqueYears = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
    return uniqueYears;
  }, []);

  const technologies = useMemo(() => {
    const allTechs = projects.flatMap(p => p.technologies);
    const uniqueTechs = [...new Set(allTechs)].sort();
    return uniqueTechs;
  }, []);

  // Filtrer les projets
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesYear = selectedYear === 'all' || project.year === selectedYear;
      
      const matchesTechnology = selectedTechnology === 'all' || 
                               project.technologies.includes(selectedTechnology);

      return matchesSearch && matchesYear && matchesTechnology;
    });
  }, [searchTerm, selectedYear, selectedTechnology]);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Projets Réalisés
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez nos réalisations récentes et les technologies que nous maîtrisons
          </p>
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 space-y-6"
        >
          {/* Barre de recherche */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom ou technologie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            />
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">Filtres :</span>
            </div>

            {/* Filtre par année */}
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Toutes les années</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Filtre par technologie */}
            <div className="flex items-center gap-2">
              <span className="text-primary-400">⚡</span>
              <select
                value={selectedTechnology}
                onChange={(e) => setSelectedTechnology(e.target.value)}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Toutes les technologies</option>
                {technologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            {/* Reset filters */}
            {(searchTerm || selectedYear !== 'all' || selectedTechnology !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedYear('all');
                  setSelectedTechnology('all');
                }}
                className="px-3 py-2 bg-error-600 hover:bg-error-700 rounded-lg text-white text-sm transition-colors"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Compteur de résultats */}
          <div className="text-center">
            <span className="text-sm text-gray-400">
              {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>
        
        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badge année */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-primary-600/90 backdrop-blur-sm text-white text-xs rounded-full font-medium">
                    {project.year}
                  </span>
                </div>

                {/* Badge catégorie */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-secondary-600/90 backdrop-blur-sm text-white text-xs rounded-full font-medium">
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 text-xs rounded-full text-gray-300 hover:bg-primary-600 hover:text-white transition-colors cursor-pointer"
                      onClick={() => setSelectedTechnology(tech)}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2 px-4 bg-gray-700 hover:bg-primary-600 rounded-lg transition-colors text-sm"
                >
                  Voir les détails
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message si aucun projet trouvé */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-400 mb-4">
              Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedYear('all');
                setSelectedTechnology('all');
              }}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              Voir tous les projets
            </button>
          </motion.div>
        )}
        
        {/* Modal de détails */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title || ''}
        >
          {selectedProject && (
            <div className="space-y-4">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="flex items-center gap-4 text-sm">
                <span className="px-3 py-1 bg-primary-600 rounded-full text-white">
                  {selectedProject.year}
                </span>
                <span className="px-3 py-1 bg-secondary-600 rounded-full text-white">
                  {selectedProject.category}
                </span>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {selectedProject.longDescription}
              </p>
              
              <div>
                <h4 className="font-medium mb-2 text-white">Fonctionnalités principales:</h4>
                <ul className="space-y-1">
                  {selectedProject.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3 pt-4">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors text-center text-sm"
                >
                  Voir le site
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-center text-sm"
                >
                  Code source
                </a>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Portfolio;