import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Server, 
  Palette, 
  Shield, 
  Wrench, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import QuoteModal from '../components/QuoteModal';
import ServiceDetailModal from '../components/ServiceDetailModal';

const services = [
  {
    icon: Code2,
    title: 'Développement Frontend',
    description: 'Applications React modernes, interfaces utilisateur intuitives et responsive design.',
    features: ['React & TypeScript', 'Tailwind CSS', 'Animations fluides', 'SEO optimisé'],
    color: 'primary'
  },
  {
    icon: Server,
    title: 'Développement Backend',
    description: 'APIs robustes, bases de données optimisées et architecture scalable.',
    features: ['Node.js & Python', 'MongoDB & PostgreSQL', 'APIs RESTful', 'Microservices'],
    color: 'secondary'
  },
  {
    icon: Palette,
    title: 'Systèmes CMS',
    description: 'Solutions de gestion de contenu personnalisées et faciles à utiliser.',
    features: ['Strapi & Sanity', 'Interface admin', 'Gestion multimédia', 'Workflow'],
    color: 'accent'
  },
  {
    icon: Shield,
    title: 'Sécurité',
    description: 'Protection des données, authentification et conformité RGPD.',
    features: ['JWT & OAuth', 'Chiffrement', 'Audit sécurité', 'RGPD compliant'],
    color: 'success'
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    description: 'Maintenance préventive, mises à jour et support technique continu.',
    features: ['Monitoring 24/7', 'Mises à jour', 'Backup automatique', 'Support rapide'],
    color: 'warning'
  },
  {
    icon: GraduationCap,
    title: 'Formation',
    description: 'Bootcamp complet pour apprendre le développement web moderne.',
    features: ['Cours en ligne', 'Projets pratiques', 'Certification', 'Mentorat'],
    color: 'error'
  }
];

const colorMap = {
  primary: 'from-primary-500 to-primary-600',
  secondary: 'from-secondary-500 to-secondary-600',
  accent: 'from-accent-500 to-accent-600',
  success: 'from-success-500 to-success-600',
  warning: 'from-warning-500 to-warning-600',
  error: 'from-error-500 to-error-600',
};

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const openServiceDetail = (service: typeof services[0]) => {
    // Si le service est "Formation", rediriger vers la page Bootcamp
    if (service.title === 'Formation') {
      navigate('/bootcamp');
      return;
    }
    
    // Pour les autres services, ouvrir le modal de détail
    setSelectedService(service);
    setShowServiceModal(true);
  };

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
            Nos Services
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Solutions complètes pour vos projets web, du concept à la maintenance
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${colorMap[service.color as keyof typeof colorMap]} flex items-center justify-center mb-6`}>
                <service.icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <ArrowRight size={14} className="text-primary-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => openServiceDetail(service)}
                className="w-full py-2 px-4 bg-gray-700 hover:bg-primary-600 rounded-lg transition-colors group-hover:bg-primary-600"
              >
                En savoir plus
              </button>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Prêts à démarrer votre projet ?
            </h2>
            <p className="text-gray-200 mb-6">
              Discutons de vos besoins et créons quelque chose d'exceptionnel ensemble.
            </p>
            <button 
              onClick={() => setShowQuoteModal(true)}
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Demander un devis
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modales */}
      <QuoteModal 
        isOpen={showQuoteModal} 
        onClose={() => setShowQuoteModal(false)} 
      />
      
      <ServiceDetailModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        onRequestQuote={() => setShowQuoteModal(true)}
        service={selectedService}
      />
    </div>
  );
};

export default Services;