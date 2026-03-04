import { useRef } from 'react';
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
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}