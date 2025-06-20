import React, { useState } from 'react';
import { Toast } from './components/Toast';
import { HeroSection, FeaturesSection, FormSection, Footer } from './components/sections';

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
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Form Section */}
      <FormSection 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;