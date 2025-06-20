import React, { useState } from 'react';
import { Code2, Globe, Database, Award, Users, Clock, Zap, CheckCircle2, Send, Monitor, Wifi, MapPin, MessageSquare } from 'lucide-react';
import { Toast } from './components/Toast';
import { FormField } from './components/FormField';
import { RadioGroup } from './components/RadioGroup';
import { CountdownTimer } from './components/CountdownTimer';

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  age: string;
  city: string;
  hasCodeExperience: string;
  hasComputer: string;
  hasInternet: string;
  motivation: string;
  hoursPerWeek: string;
  howDidYouKnow: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    age: '',
    city: '',
    hasCodeExperience: '',
    hasComputer: '',
    hasInternet: '',
    motivation: '',
    hoursPerWeek: '',
    howDidYouKnow: ''
  });

  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Candidature soumise:', formData);
    setShowToast(true);
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      whatsapp: '',
      age: '',
      city: '',
      hasCodeExperience: '',
      hasComputer: '',
      hasInternet: '',
      motivation: '',
      hoursPerWeek: '',
      howDidYouKnow: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Toast 
        message="Merci pour ta candidature ! Tu seras contacté bientôt."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 opacity-95"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
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

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Une opportunité unique de transformer ta vie
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Dans un monde de plus en plus numérique, savoir coder n'est plus un privilège, 
                c'est une nécessité. Je t'offre l'opportunité d'acquérir les compétences les plus 
                demandées du marché technologique avec un accompagnement personnalisé et une 
                méthode 100% pratique.
              </p>
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

      {/* Application Form Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Send className="w-4 h-4" />
                Candidature
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Postule maintenant
              </h3>
              
              {/* Timer d'urgence */}
              <div className="mb-8">
                <CountdownTimer />
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed">
                Chaque candidat sera contacté personnellement par WhatsApp ou e-mail pour 
                remplir un formulaire de motivation. La date de début sera ensuite communiquée 
                aux sélectionnés.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField label="Nom complet" required>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                      placeholder="Ton nom et prénom"
                    />
                  </FormField>

                  <FormField label="Adresse email" required>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                      placeholder="ton.email@exemple.com"
                    />
                  </FormField>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField label="Numéro WhatsApp" required>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </FormField>

                  <FormField label="Âge" required>
                    <input
                      type="number"
                      min="15"
                      max="99"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                      placeholder="25"
                    />
                  </FormField>
                </div>

                <FormField label="Ville / Pays de résidence" required>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                      placeholder="Abidjan, Côte d'Ivoire"
                    />
                  </div>
                </FormField>

                <FormField label="As-tu déjà touché au code ?" required>
                  <RadioGroup
                    name="hasCodeExperience"
                    options={[
                      { value: 'oui', label: '✅ Oui' },
                      { value: 'non', label: '❌ Non' }
                    ]}
                    value={formData.hasCodeExperience}
                    onChange={(value) => handleInputChange('hasCodeExperience', value)}
                    required
                  />
                </FormField>

                <FormField label="As-tu un ordinateur personnel ?" required>
                  <RadioGroup
                    name="hasComputer"
                    options={[
                      { value: 'oui', label: '✅ Oui' },
                      { value: 'non-mais-possible', label: '❌ Non, mais je peux en avoir un' }
                    ]}
                    value={formData.hasComputer}
                    onChange={(value) => handleInputChange('hasComputer', value)}
                    required
                  />
                </FormField>

                <FormField label="As-tu accès à une connexion internet ?" required>
                  <RadioGroup
                    name="hasInternet"
                    options={[
                      { value: 'regulierement', label: '✅ Oui régulièrement' },
                      { value: 'parfois', label: '❌ De temps en temps' },
                      { value: 'non', label: '❌ Non' }
                    ]}
                    value={formData.hasInternet}
                    onChange={(value) => handleInputChange('hasInternet', value)}
                    required
                  />
                </FormField>

                <FormField label="Pourquoi veux-tu apprendre à coder ?" required>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                    <textarea
                      value={formData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      required
                      rows={4}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors resize-vertical"
                      placeholder="Raconte-moi tes motivations, tes objectifs, ce qui t'attire dans la programmation..."
                    />
                  </div>
                </FormField>

                <div className="border-t border-slate-200 pt-8">
                  <h4 className="text-lg font-semibold text-slate-900 mb-6">Informations optionnelles</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Heures par semaine disponibles">
                      <select
                        value={formData.hoursPerWeek}
                        onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                      >
                        <option value="">Sélectionne une option</option>
                        <option value="5h">5h par semaine</option>
                        <option value="10h">10h par semaine</option>
                        <option value="15h">15h par semaine</option>
                        <option value="20h+">20h ou plus par semaine</option>
                      </select>
                    </FormField>

                    <FormField label="Comment as-tu connu ce bootcamp ?">
                      <select
                        value={formData.howDidYouKnow}
                        onChange={(e) => handleInputChange('howDidYouKnow', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors"
                      >
                        <option value="">Sélectionne une option</option>
                        <option value="reseaux-sociaux">Réseaux sociaux</option>
                        <option value="recommandation">Recommandation</option>
                        <option value="groupe-whatsapp">Groupe WhatsApp</option>
                        <option value="autre">Autre</option>
                      </select>
                    </FormField>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Je postule maintenant
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Code2 className="w-8 h-8 text-orange-500" />
            <span className="text-white font-bold text-xl">Bootcamp Dev Web</span>
          </div>
          <p className="text-slate-400">
            Transforme ta passion en carrière • Développe ton avenir
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;