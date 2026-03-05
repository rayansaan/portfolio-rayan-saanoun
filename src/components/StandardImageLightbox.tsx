import { motion, AnimatePresence } from 'framer-motion';
import type { ImageDescription } from '@/types';

interface StandardImageLightboxProps {
  image: ImageDescription | null;
  originRect: DOMRect | null;
  onClose: () => void;
}

export function StandardImageLightbox({ 
  image, 
  originRect, 
  onClose 
}: StandardImageLightboxProps) {
  if (!image || !originRect) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md bg-black/70"
            onClick={handleOverlayClick}
          />

          {/* Content Container */}
          <div 
            className="relative z-10 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image with animation */}
            <div className="rounded-lg overflow-hidden max-h-[70vh]">
              <motion.img
                layoutId={image.id}
                layout
                transition={{
                  layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
                }}
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={{ willChange: 'transform' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}