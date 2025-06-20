import React from 'react';
import { Award, Users, Clock, Zap, CheckCircle2, Globe, Monitor, Wifi } from 'lucide-react';
import profileImage from '../../assets/images/me-rem.png';

export const FeaturesSection: React.FC = () => {
  return (
    <>
      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Une opportunité unique de transformer ta vie
              </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
              <div className="md:w-1/3">
                <img 
                  src={profileImage} 
                  alt="Akanni Johannes" 
                  className="rounded-full w-full max-w-xs mx-auto"
                />
              </div>
              <div className="md:w-2/3">
                <div className="text-slate-700  leading-relaxed">
                  Je m'appelle Akanni Johannes, développeur web depuis 3 ans après une reconversion 
                  professionnelle. Issu du secteur bancaire, j'ai plongé dans le code par passion et 
                  pour construire une carrière épanouissante. Aujourd'hui, je coordonne des projets 
                  dans une entreprise française en Afrique tout en formant de nouveaux développeurs. 
                  Guidé par la détermination et le partage, je crois fermement que chacun peut bâtir 
                  une carrière solide dans le numérique avec le bon accompagnement. 
                </div>
                <p className="text-orange-500 font-semibold my-4 text-lg">Ma mission : vous aider à prendre votre avenir en main.</p>
                <p className="text-slate-600 leading-relaxed">
                  Dans un monde de plus en plus numérique, savoir coder n'est plus un privilège, 
                  c'est une nécessité. Je t'offre l'opportunité d'acquérir les compétences les plus 
                  demandées du marché technologique avec un accompagnement personnalisé et une 
                  méthode 100% pratique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

   {/* Offer Section */}
   <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
     <div className="container mx-auto px-4">
       <div className="max-w-4xl mx-auto">
         <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-200 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
           <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold mb-6">
               <Globe className="w-5 h-5" />
               Programme Complet
             </div>
             <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
               Voici ce que tu vas apprendre
             </h3>
           </div>

           <div className="grid md:grid-cols-2 gap-8 mb-12">
             <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                   <span className="text-white font-bold text-lg">1</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">Phase 1 - Gratuite</h4>
                   <p className="text-green-700 font-semibold">2 mois - 0 FCFA</p>
                 </div>
               </div>
               <ul className="space-y-2 text-slate-700">
                 <li className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-green-500" />
                   <span>HTML & CSS avancés</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-green-500" />
                   <span>JavaScript moderne</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-green-500" />
                   <span>Projets pratiques</span>
                 </li>
               </ul>
             </div>

             <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                   <span className="text-white font-bold text-lg">2</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">Phase 2 - Avancée</h4>
                   <p className="text-orange-700 font-semibold">4 mois - 30 000 FCFA/mois</p>
                 </div>
               </div>
               <ul className="space-y-2 text-slate-700">
                 <li className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-orange-500" />
                   <span>React.js & écosystème</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-orange-500" />
                   <span>Python (FastAPI)</span>
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-orange-500" />
                   <span>Bases de données (MySQL, PostgreSQL, MongoDB)</span>
                 </li>
               </ul>
             </div>
           </div>

           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
             <div className="flex items-center gap-3 mb-4">
               <Award className="w-8 h-8 text-blue-500" />
               <h4 className="font-bold text-slate-900 text-lg">Bonus : Certifications Internationales</h4>
             </div>
             <p className="text-slate-700">
               À la fin du programme, tu auras la possibilité de passer des certifications 
               reconnues mondialement chez <strong>FreeCodeCamp</strong> et <strong>Coursera</strong> 
               (Frontend, Backend, Fullstack).
             </p>
           </div>
         </div>
       </div>
     </div>
   </section>

   {/* Prerequisites Section */}
   <section className="py-20 bg-white">
     <div className="container mx-auto px-4">
       <div className="max-w-4xl mx-auto">
         <div className="text-center mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
           <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
             Pré-requis simples
           </h3>
           <p className="text-lg text-slate-600">
             Pas besoin d'être un génie ou d'avoir un diplôme spécial
           </p>
         </div>

         <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-6">
             <h4 className="text-xl font-bold text-slate-900 mb-4">❌ Ce dont tu N'AS PAS besoin :</h4>
             <div className="space-y-4">
               <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                 <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                   <span className="text-red-600 text-xs font-bold">✗</span>
                 </div>
                 <span className="text-slate-700">Un diplôme universitaire</span>
               </div>
               <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                 <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                   <span className="text-red-600 text-xs font-bold">✗</span>
                 </div>
                 <span className="text-slate-700">Être expert en maths ou physique-chimie</span>
               </div>
               <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                 <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                   <span className="text-red-600 text-xs font-bold">✗</span>
                 </div>
                 <span className="text-slate-700">Un âge spécifique (juste avoir au moins 15 ans)</span>
               </div>
             </div>
           </div>

           <div className="space-y-6">
             <h4 className="text-xl font-bold text-slate-900 mb-4">✅ Ce qu'il te faut :</h4>
             <div className="space-y-4">
               <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                 <Monitor className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                 <span className="text-slate-700">Un ordinateur personnel</span>
               </div>
               <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                 <Wifi className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                 <span className="text-slate-700">Une connexion internet stable</span>
               </div>
               <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                 <Zap className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                 <span className="text-slate-700">De la motivation et de la détermination</span>
               </div>
               <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                 <Clock className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                 <span className="text-slate-700">Du temps pour apprendre sérieusement</span>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
    </>
  );
};
