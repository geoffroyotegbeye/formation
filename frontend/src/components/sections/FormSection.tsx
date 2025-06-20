import React from 'react';
import { Monitor, Wifi, MapPin, MessageSquare, Send } from 'lucide-react';
import { FormField } from '../FormField';
import { RadioGroup } from '../RadioGroup';
import { CountdownTimer } from '../CountdownTimer';

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

interface FormSectionProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  errorMessage?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ formData, handleInputChange, handleSubmit, isSubmitting = false, errorMessage = '' }) => {
  return (
    <>
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
                      placeholder="john.doe@gmail.com"
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
                      placeholder="+229 XX XX XX XX XX"
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
                      { value: 'oui', label: 'Oui' },
                      { value: 'non', label: 'Non' }
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
                      { value: 'oui', label: 'Oui' },
                      { value: 'non-mais-possible', label: 'Non, mais je peux en avoir un' }
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
                      { value: 'regulierement', label: 'Oui régulièrement' },
                      { value: 'parfois', label: 'De temps en temps' },
                      { value: 'non', label: 'Non' }
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

                {errorMessage && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {errorMessage}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform shadow-lg flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-600 hover:to-orange-700 hover:scale-[1.02] hover:shadow-xl'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Je postule maintenant
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </> 
  );
};
