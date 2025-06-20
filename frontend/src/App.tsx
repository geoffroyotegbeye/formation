import React, { useState } from 'react';
import { Toast } from './components/Toast';
import { HeroSection, FeaturesSection, FormSection, Footer } from './components/sections';
import applicationService from './services/applicationService';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Convertir les données du formulaire au format attendu par l'API
      const applicationData = {
        full_name: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        age: formData.age,
        city: formData.city,
        has_code_experience: formData.hasCodeExperience === 'oui',
        has_computer: formData.hasComputer === 'oui',
        has_internet: formData.hasInternet === 'regulierement' || formData.hasInternet === 'parfois',
        motivation: formData.motivation,
        hours_per_week: formData.hoursPerWeek ? parseInt(formData.hoursPerWeek.replace('h', ''), 10) : 0,
        how_did_you_know: formData.howDidYouKnow
      };
      
      // Envoyer la candidature à l'API
      await applicationService.create(applicationData);
      
      // Afficher le toast de succès
      setShowToast(true);
      
      // Réinitialiser le formulaire
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
    } catch (error: any) {
      console.error('Erreur lors de la soumission de la candidature:', error);
      setErrorMessage(error.response?.data?.detail || 'Une erreur est survenue lors de la soumission de votre candidature. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-mono">
      <Toast 
        message="Merci pour ta candidature ! Tu seras contacté bientôt."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Form Section */}
      <FormSection 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;