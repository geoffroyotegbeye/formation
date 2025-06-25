import React from 'react';
import { Award, Users, Clock, Zap, CheckCircle2, Globe, Monitor, Wifi } from 'lucide-react';
import profileImage from '../../assets/images/me-rem.png';

export const FeaturesSection: React.FC = () => {
  return (
    <>
      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                De débutant à développeur professionnel en 6 mois
              </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-16 ">
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
               Programme Intensif 2025
             </div>
             <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
               🎯 À la fin de ce programme, tu pourras :
             </h3>
             <div className="grid md:grid-cols-2 gap-4 mb-8">
               <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                 <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                 <span>Créer des sites et applications web professionnels</span>
               </div>
               <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                 <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                 <span>Développer des API performantes et sécurisées</span>
               </div>
               <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                 <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                 <span>Décrocher des missions en freelance ou en entreprise</span>
               </div>
               <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                 <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                 <span>Obtenir des certifications internationales reconnues</span>
               </div>
             </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8 mb-12">
             <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                   <span className="text-white font-bold text-lg">1</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">🔰 Phase 1 – Décollage</h4>
                   <p className="text-green-700 font-semibold">2 mois - 100% GRATUIT</p>
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
                 <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                   <span className="text-white font-bold text-lg">2</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">🚀 Phase 2 – Propulsion</h4>
                   <div className="flex flex-col sm:flex-row gap-2">
                     <span className="text-orange-700 font-semibold">4 mois - 30 000 FCFA/mois</span>
                     <span className="text-sm bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">ou 100 000 FCFA les 4 mois (-17%)</span>
                   </div>
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
               <h4 className="font-bold text-slate-900 text-lg">🎓 Préparation aux Certifications Internationales</h4>
             </div>
             <p className="text-slate-700 mb-4">
               Nous te préparerons activement à passer des certifications reconnues mondialement :
             </p>
             <ul className="space-y-2 text-slate-700">
               <li className="flex items-start gap-2">
                 <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                 <span><strong>FreeCodeCamp</strong> - Certification Développeur Frontend</span>
               </li>
               <li className="flex items-start gap-2">
                 <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                 <span><strong>Coursera</strong> - Spécialisation en Développement Web</span>
               </li>
               <li className="flex items-start gap-2">
                 <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                 <span>Accompagnement personnalisé pour les projets de certification</span>
               </li>
             </ul>
             <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100">
               <p className="text-sm text-slate-600">
                 💡 <strong>Garantie satisfaction</strong> : Si tu n'es pas satisfait des 7 premiers jours en Phase 2, 
                 nous te remboursons intégralement ton paiement.
               </p>
             </div>
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
