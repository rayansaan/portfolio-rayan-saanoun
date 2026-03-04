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
    <div
      ref={imageRef}
      onClick={handleClick}
      className="relative overflow-hidden rounded-lg cursor-pointer group max-h-80"
    >
      <motion.img
        layoutId={`image-${image.id}`}
        layout
        transition={{ layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }}
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}