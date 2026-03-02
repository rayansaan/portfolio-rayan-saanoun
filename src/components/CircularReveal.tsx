import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CircularRevealProps {
  isOpen: boolean;
  originX: number;
  originY: number;
  onAnimationComplete?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
}

export function CircularReveal({ 
  isOpen, 
  originX, 
  originY, 
  onAnimationComplete, 
  onClose,
  children 
}: CircularRevealProps) {
  const [showContent, setShowContent] = useState(false);

  // Calculer le rayon maximal pour couvrir tout l'écran
  const calculateMaxRadius = () => {
    const maxX = Math.max(originX, window.innerWidth - originX);
    const maxY = Math.max(originY, window.innerHeight - originY);
    return Math.sqrt(maxX ** 2 + maxY ** 2) * 1.2;
  };

  useEffect(() => {
    if (isOpen) {
      // Afficher le contenu après le début de l'animation
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay avec flou progressif */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9998] bg-black/60 pointer-events-none"
          />
          
          {/* Cercle d'expansion */}
          <motion.div
            initial={{ 
              clipPath: `circle(0% at ${originX}px ${originY}px)`,
            }}
            animate={{ 
              clipPath: `circle(${calculateMaxRadius()}px at ${originX}px ${originY}px)`,
            }}
            exit={{ 
              clipPath: `circle(0% at ${originX}px ${originY}px)`,
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1]
            }}
            onAnimationComplete={onAnimationComplete}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Contenu (image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: showContent ? 1 : 0, 
                scale: showContent ? 1 : 0.8 
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex items-center justify-center p-8"
            >
              {children}
            </motion.div>
            
            {/* Bouton fermeture */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors z-[10000]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
