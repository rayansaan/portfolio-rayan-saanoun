import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useHoverImage } from '@/context/HoverImageContext';

export function CursorFollowImage() {
  const { currentImage, mouseX, mouseY } = useHoverImage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values pour la position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring pour lisser le suivi du curseur
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  // Calcul de la vélocité (vitesse) du mouvement
  const xVelocity = useVelocity(xSpring);
  const yVelocity = useVelocity(ySpring);
  
  // Transformation de la vélocité en skew (-15° à 15°)
  // Plus on bouge vite, plus l'image se penche
  const skewX = useTransform(yVelocity, [-500, 500], [15, -15]);
  const skewY = useTransform(xVelocity, [-500, 500], [-15, 15]);
  
  // Mise à jour de la position avec offset pour ne pas cacher le texte
  useEffect(() => {
    const offsetX = 20;
    const offsetY = 20;
    
    x.set(mouseX + offsetX);
    y.set(mouseY + offsetY);
  }, [mouseX, mouseY, x, y]);
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      style={{ willChange: 'opacity' }}
    >
      <AnimatePresence>
        {currentImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute pointer-events-none"
            style={{
              x: xSpring,
              y: ySpring,
              width: 350,
              height: 250,
              marginLeft: -175, // Centrer horizontalement
              marginTop: -125,  // Centrer verticalement
              willChange: 'transform',
            }}
          >
            <motion.div
              className="w-full h-full rounded-lg overflow-hidden shadow-2xl"
              style={{
                skewX,
                skewY,
                willChange: 'transform',
              }}
            >
              <img
                src={currentImage}
                alt=""
                className="w-full h-full object-cover"
                style={{ willChange: 'transform' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}