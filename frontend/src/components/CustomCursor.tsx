import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Éléments interactifs qui déclenchent l'agrandissement
    const interactiveElements = 'button, a, input, textarea, select, [role="button"], .cursor-pointer';

    document.addEventListener('mousemove', updateMousePosition);

    // Ajouter les événements sur tous les éléments interactifs
    const addHoverEvents = () => {
      const elements = document.querySelectorAll(interactiveElements);
      elements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Observer pour les nouveaux éléments ajoutés dynamiquement
    const observer = new MutationObserver(() => {
      addHoverEvents();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    addHoverEvents();

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      const elements = document.querySelectorAll(interactiveElements);
      elements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Curseur principal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="w-5 h-5 bg-white rounded-full" />
      </motion.div>

      {/* Cercle extérieur */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] border border-white/30 rounded-full mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.3
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
      >
        <div className="w-10 h-10" />
      </motion.div>
    </>
  );
};

export default CustomCursor;