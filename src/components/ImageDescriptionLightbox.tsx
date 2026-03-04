import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import type { ImageDescription } from '@/types';

interface ImageDescriptionLightboxProps {
  image: ImageDescription | null;
  originRect: DOMRect | null;
  onClose: () => void;
}

export function ImageDescriptionLightbox({ 
  image, 
  originRect, 
  onClose 
}: ImageDescriptionLightboxProps) {
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
            <motion.div
              layoutId={`image-${image.id}`}
              layout
              transition={{
                layout: { duration: 0.35, ease: [0.4, 0, 0.2, 0.4] }
              }}
              className="rounded-lg overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-6 p-6 bg-white rounded-lg"
            >
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{image.description}</ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}