import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from 'framer-motion';
import { useHoverImage } from '@/context/HoverImageContext';

export function CursorFollowImage() {
  const { currentImage, imageType, mouseX, mouseY } = useHoverImage();
  
  // Ne pas rendre sur les appareils tactiles
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return null;
  
  // Dimensions selon le type d'image
  const isIcon = imageType === 'icon';
  const width = isIcon ? 40 : 280;
  const height = isIcon ? 40 : 200;
  const offset = isIcon ? 10 : 20;
  
  // Motion values pour la position avec offset (bas à droite du curseur)
  const x = useMotionValue(mouseX + offset);
  const y = useMotionValue(mouseY + offset);
  
  // Mise à jour directe des motion values (pas de useEffect)
  x.set(mouseX + offset);
  y.set(mouseY + offset);
  
  // Spring optimisé pour plus de fluidité
  const springConfig = { 
    stiffness: 100, 
    damping: 20, 
    mass: 0.5,
    restDelta: 0.001 
  };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  // Calcul de la vélocité avec smoothing
  const xVelocity = useVelocity(xSpring);
  const yVelocity = useVelocity(ySpring);
  
  // Smooth velocity pour éviter les à-coups
  const smoothXVelocity = useSpring(xVelocity, { stiffness: 50, damping: 30 });
  const smoothYVelocity = useSpring(yVelocity, { stiffness: 50, damping: 30 });
  
  // Transformation de la vélocité en skew (-15° à 15°)
  const skewX = useTransform(smoothYVelocity, [-500, 500], [15, -15]);
  const skewY = useTransform(smoothXVelocity, [-500, 500], [-15, 15]);
  
  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
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
              width,
              height,
            }}
          >
            <motion.div
              className={`w-full h-full overflow-hidden ${isIcon ? '' : 'rounded-lg shadow-2xl'}`}
              style={{
                skewX,
                skewY,
              }}
            >
              <img
                src={currentImage}
                alt=""
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}