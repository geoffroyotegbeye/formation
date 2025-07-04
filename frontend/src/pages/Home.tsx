import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Rocket, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold my-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Propulsez Vos Idées
            <br />
            Vers le Succès Digital
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sites web, applications, plateformes... Nous transformons vos ambitions en réalités numériques.
            <span className="block mt-2 text-primary-200">
              Spécialistes React, Node.js & Python
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/services"
              className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-all duration-300 flex items-center gap-2 text-white font-medium"
            >
              Découvrez notre savoir-faire
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/bootcamp"
              className="px-8 py-4 border border-secondary-500 hover:bg-secondary-500/10 rounded-lg transition-all duration-300 text-secondary-400 hover:text-secondary-300 font-medium"
            >
              Devenez développeur en 3 mois
            </Link>
          </div>

          <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <Code className="w-12 h-12 text-primary-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Solutions 100% Personnalisées</h3>
              <p className="text-gray-400">
                Nous concevons des sites web rapides, modernes et sur-mesure pour répondre précisément à vos objectifs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <Rocket className="w-12 h-12 text-secondary-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Technologies de Pointe</h3>
              <p className="text-gray-400">
                Offrez à vos utilisateurs une expérience exceptionnelle grâce à des technologies performantes et évolutives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <Users className="w-12 h-12 text-accent-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Bootcamp Intensif</h3>
              <p className="text-gray-400">
                Apprenez à coder comme un pro en seulement 12 semaines avec notre programme axé sur la pratique.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
