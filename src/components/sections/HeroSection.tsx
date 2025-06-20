import React from 'react';
import { Zap, Code2, Globe, Database, Users, Award, Hash, Terminal, Brackets, Server, Braces, Laptop, CircuitBoard, Cpu } from 'lucide-react';
import { CountdownTimer } from '../CountdownTimer';

export const HeroSection: React.FC = () => {
  return (
    <>
    <section className="relative overflow-hidden">
        {/* Fond avec dégradé comme FormSection */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
        
        {/* Icônes de langages disposées aléatoirement */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <Code2 className="absolute w-16 h-16 text-orange-400" style={{ top: '10%', left: '15%' }} />
          <Hash className="absolute w-14 h-14 text-blue-400" style={{ top: '25%', left: '80%' }} />
          <Terminal className="absolute w-20 h-20 text-green-400" style={{ top: '65%', left: '10%' }} />
          <Brackets className="absolute w-12 h-12 text-yellow-400" style={{ top: '15%', left: '60%' }} />
          <Server className="absolute w-16 h-16 text-purple-400" style={{ top: '70%', left: '75%' }} />
          <Braces className="absolute w-18 h-18 text-pink-400" style={{ top: '40%', left: '5%' }} />
          <Laptop className="absolute w-14 h-14 text-teal-400" style={{ top: '30%', left: '30%' }} />
          <CircuitBoard className="absolute w-16 h-16 text-indigo-400" style={{ top: '55%', left: '50%' }} />
          <Cpu className="absolute w-12 h-12 text-red-400" style={{ top: '80%', left: '25%' }} />
          <Globe className="absolute w-20 h-20 text-cyan-400" style={{ top: '5%', left: '40%' }} />
          <Database className="absolute w-14 h-14 text-amber-400" style={{ top: '45%', left: '85%' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              Seulement 5 places disponibles
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Apprends à{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                coder
              </span>{' '}
              avec moi
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Je prends{' '}
              <span className="text-orange-400 font-semibold">5 personnes sérieuses</span>{' '}
              pour un bootcamp{' '}
              <span className="text-white font-semibold">100% pratique</span>{' '}
              pour apprendre le développement web.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                <Code2 className="w-5 h-5 text-orange-400" />
                <span>Frontend & Backend</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                <Users className="w-5 h-5 text-orange-400" />
                <span>Suivi personnalisé</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                <Award className="w-5 h-5 text-orange-400" />
                <span>Certifications internationales</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
