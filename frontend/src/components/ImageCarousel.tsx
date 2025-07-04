import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  interval?: number; // Intervalle en millisecondes entre les transitions
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  interval = 3000, // Par défaut, 3 secondes entre chaque image
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Si aucune image n'est fournie, ne pas démarrer le carousel
    if (images.length === 0) return;
    
    // Configurer un intervalle pour changer automatiquement l'image
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    
    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(timer);
  }, [images, interval]);
  
  // Si aucune image n'est fournie, afficher un placeholder
  if (images.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="text-6xl">👥</span>
      </div>
    );
  }
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <img 
            src={images[currentIndex]} 
            alt={`Slide ${currentIndex}`} 
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ImageCarousel;
