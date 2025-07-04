import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Calendar, Check, X, Code, Server, Database, Github, Box, Cloud, PenTool, Zap, FileJson, Layers, Cpu, Globe } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

// Images pour le carousel (utilisant des URLs d'images professionnelles)
const teamImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500&q=80',
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            À propos de nous
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="w-64 h-64 mx-auto lg:mx-0 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center"
              >
                <div className="w-56 h-56 bg-gray-800 rounded-full overflow-hidden">
                  <ImageCarousel 
                    images={teamImages} 
                    interval={4000} 
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="md:text-left text-center"
            >
              <h2 className="text-2xl font-semibold mb-4 text-primary-400">
                Équipe de développeurs passionnés
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Avec plus de 5 ans d'expérience collective dans le développement web, 
                nous nous spécialisons dans la création d'applications modernes et performantes. 
                Notre passion pour les technologies émergentes nous pousse constamment à 
                apprendre et à innover ensemble.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6 md:justify-start justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin size={16} />
                  <span>Cotonou, Bénin</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar size={16} />
                  <span>Disponibles pour projets</span>
                </div>
              </div>
              
              <div className="flex md:justify-start justify-center">
                <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
                  <Download size={20} />
                  Télécharger notre présentation
                </button>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-12"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">Nos compétences techniques</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-6">
                <h4 className="font-medium text-primary-400 text-center text-lg flex items-center justify-center gap-2">
                  <Code className="text-primary-300" size={24} />
                  <span>Frontend</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Zap size={32} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">React</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <FileJson size={32} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">TypeScript</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Layers size={32} className="text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Tailwind</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Globe size={32} className="text-white mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Next.js</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="font-medium text-secondary-400 text-center text-lg flex items-center justify-center gap-2">
                  <Server className="text-secondary-300" size={24} />
                  <span>Backend</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Server size={32} className="text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Node.js</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Cpu size={32} className="text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Python</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Database size={32} className="text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">MongoDB</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Database size={32} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">PostgreSQL</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="font-medium text-accent-400 text-center text-lg flex items-center justify-center gap-2">
                  <PenTool className="text-accent-300" size={24} />
                  <span>Outils</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Github size={32} className="text-white mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Git</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Box size={32} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Docker</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Cloud size={32} className="text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">AWS</span>
                  </div>
                  <div className="bg-gray-800/80 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-700/80 transition-colors group">
                    <Zap size={32} className="text-yellow-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Firebase</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section Tarification */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">Tarification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plan Populaire */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Populaire
                  </span>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    50€ <span className="text-lg font-normal text-gray-400">/heure</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300">Développement Web</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300">Service d'installation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300">Audit SEO</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300">Hébergement & Domaine</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X size={20} className="text-error-400" />
                    <span className="text-gray-500 line-through">Sécurité</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X size={20} className="text-error-400" />
                    <span className="text-gray-500 line-through">E-mail Professionnelle</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X size={20} className="text-error-400" />
                    <span className="text-gray-500 line-through">Maintenance Corrective</span>
                  </li>
                </ul>
                
                <button className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors">
                  Commandez maintenant
                </button>
              </div>

              {/* Plan Pro */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold text-white mb-2">Pro</h4>
                  <div className="text-3xl font-bold text-white mb-2">
                    75€ <span className="text-lg font-normal text-gray-400">/heure</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300">Développement Web</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300">Service d'installation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300">Audit SEO</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300">Hébergement & Domaine</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                     <span className="text-gray-300 flex items-center gap-2">
                      Sécurité
                      <span className="bg-accent-600 text-white px-2 py-0.5 rounded text-xs">new</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300 flex items-center gap-2">
                      E-mail Professionnelle
                      <span className="bg-accent-600 text-white px-2 py-0.5 rounded text-xs">new</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={20} className="text-success-400" />
                    <span className="text-gray-300 flex items-center gap-2">
                      Maintenance Corrective
                      <span className="bg-accent-600 text-white px-2 py-0.5 rounded text-xs">new</span>
                    </span>
                  </li>
                </ul>
                
                <button className="w-full py-3 px-6 bg-secondary-600 hover:bg-secondary-700 rounded-lg font-medium transition-colors">
                  Commandez maintenant
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;