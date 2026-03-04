import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { ImageDescription } from '@/types';

interface ImageDescriptionCardProps {
  image: ImageDescription;
  onClick: (image: ImageDescription, rect: DOMRect) => void;
}

export function ImageDescriptionCard({ image, onClick }: ImageDescriptionCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      onClick(image, rect);
    }
  };

  return (
    <motion.div
      ref={imageRef}
      layoutId={`image-${image.id}`}
      layout
      onClick={handleClick}
      className="relative overflow-hidden rounded-lg cursor-pointer group max-h-80"
      style={{ willChange: 'transform' }}
    >
      <motion.img
        layout="position"
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}