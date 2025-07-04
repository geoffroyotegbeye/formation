import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant qui réinitialise la position de défilement à chaque changement de route
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Défilement vers le haut de la page à chaque changement de route
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ce composant ne rend rien visuellement
};

export default ScrollToTop;
