import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Clock, Users, Shield } from 'lucide-react';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: () => void; // Nouvelle fonction pour ouvrir le modal de devis
  service: {
    title: string;
    description: string;
    features: string[];
    color: string;
    icon: React.ComponentType<any>;
  } | null;
}

const serviceDetails = {
  'Développement Frontend': {
    longDescription: 'Nous créons des interfaces utilisateur modernes, intuitives et performantes. Notre expertise en React et TypeScript nous permet de développer des applications web robustes et maintenables.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    process: [
      'Analyse des besoins et maquettage',
      'Développement des composants',
      'Intégration des APIs',
      'Tests et optimisation',
      'Déploiement et mise en ligne'
    ],
    deliverables: [
      'Code source complet',
      'Documentation technique',
      'Guide d\'utilisation',
      'Formation équipe'
    ],
    timeline: '2-8 semaines selon complexité',
    price: 'À partir de 50€/heure'
  },
  'Développement Backend': {
    longDescription: 'Nous développons des APIs robustes et des architectures scalables pour supporter vos applications. Notre expertise couvre Node.js, Python et les bases de données modernes.',
    technologies: ['Node.js', 'Python', 'Express', 'Django', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker'],
    process: [
      'Architecture et conception',
      'Développement des APIs',
      'Intégration base de données',
      'Tests unitaires et d\'intégration',
      'Déploiement et monitoring'
    ],
    deliverables: [
      'APIs documentées',
      'Base de données optimisée',
      'Tests automatisés',
      'Documentation d\'architecture'
    ],
    timeline: '3-12 semaines selon complexité',
    price: 'À partir de 60€/heure'
  },
  'Systèmes CMS': {
    longDescription: 'Nous mettons en place des systèmes de gestion de contenu personnalisés et faciles à utiliser. Solutions headless ou traditionnelles selon vos besoins.',
    technologies: ['Strapi', 'Sanity', 'WordPress', 'Contentful', 'Ghost', 'Directus'],
    process: [
      'Analyse des besoins éditoriaux',
      'Configuration du CMS',
      'Personnalisation interface',
      'Formation des utilisateurs',
      'Maintenance et support'
    ],
    deliverables: [
      'CMS configuré',
      'Interface d\'administration',
      'Formation utilisateurs',
      'Documentation'
    ],
    timeline: '1-4 semaines selon besoins',
    price: 'À partir de 45€/heure'
  },
  'Sécurité': {
    longDescription: 'Nous sécurisons vos applications avec les meilleures pratiques du secteur. Audit, protection des données et conformité RGPD.',
    technologies: ['JWT', 'OAuth', 'SSL/TLS', 'Helmet.js', 'bcrypt', 'Rate limiting'],
    process: [
      'Audit de sécurité',
      'Identification des vulnérabilités',
      'Mise en place des protections',
      'Tests de pénétration',
      'Monitoring continu'
    ],
    deliverables: [
      'Rapport d\'audit',
      'Correctifs de sécurité',
      'Politique de sécurité',
      'Formation équipe'
    ],
    timeline: '1-3 semaines selon audit',
    price: 'À partir de 70€/heure'
  },
  'Maintenance': {
    longDescription: 'Nous assurons la maintenance préventive et corrective de vos applications. Monitoring 24/7, mises à jour et support technique.',
    technologies: ['Monitoring', 'CI/CD', 'Backup', 'Performance', 'Analytics'],
    process: [
      'Mise en place monitoring',
      'Planification des mises à jour',
      'Surveillance performance',
      'Intervention rapide',
      'Rapports réguliers'
    ],
    deliverables: [
      'Dashboard de monitoring',
      'Rapports mensuels',
      'Sauvegardes automatiques',
      'Support prioritaire'
    ],
    timeline: 'Service continu',
    price: 'À partir de 200€/mois'
  },
  'Formation': {
    longDescription: 'Notre bootcamp complet pour apprendre le développement web moderne. Formation pratique avec projets réels et mentorat personnalisé.',
    technologies: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Git'],
    process: [
      'Évaluation niveau initial',
      'Formation théorique',
      'Projets pratiques',
      'Mentorat individuel',
      'Certification finale'
    ],
    deliverables: [
      'Accès plateforme e-learning',
      'Projets portfolio',
      'Certification',
      'Accompagnement emploi'
    ],
    timeline: '9 mois (2+4+3)',
    price: '46 €/mois (4 mois payants)'
  }
};

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ isOpen, onClose, onRequestQuote, service }) => {
  if (!isOpen || !service) return null;

  const details = serviceDetails[service.title as keyof typeof serviceDetails];
  if (!details) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop grisé */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl border border-gray-700 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center`}>
              <service.icon size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{service.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Description détaillée</h3>
            <p className="text-gray-300 leading-relaxed">{details.longDescription}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-2">
              {details.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary-600/20 border border-primary-600/30 rounded-full text-primary-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Processus */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <CheckCircle size={20} className="text-success-400" />
                Notre processus
              </h3>
              <ul className="space-y-2">
                {details.process.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-xs font-medium text-white mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Livrables */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Shield size={20} className="text-secondary-400" />
                Livrables
              </h3>
              <ul className="space-y-2">
                {details.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle size={16} className="text-success-400" />
                    <span className="text-sm">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Infos pratiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-700/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-accent-400" />
              <div>
                <h4 className="font-medium text-white">Délai</h4>
                <p className="text-sm text-gray-400">{details.timeline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users size={20} className="text-warning-400" />
              <div>
                <h4 className="font-medium text-white">Tarif</h4>
                <p className="text-sm text-gray-400">{details.price}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestQuote(); // Ouvre le modal de devis après avoir fermé celui-ci
              }}
              className="flex-1 py-3 px-6 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              Demander un devis
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceDetailModal;