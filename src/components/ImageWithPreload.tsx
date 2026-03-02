import { useState, useRef, useCallback } from 'react';

interface ImageWithPreloadProps {
  src: string;
  alt: string;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLImageElement>, originX: number, originY: number) => void;
}

export function ImageWithPreload({ src, alt, className = '', onClick }: ImageWithPreloadProps) {
  const [isPreloading, setIsPreloading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const preloadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = useCallback(() => {
    // Démarrer le préchargement après 200ms de hover
    preloadTimeoutRef.current = setTimeout(() => {
      setIsPreloading(true);
      
      // Créer une image en mémoire pour précharger
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
      };
      img.src = src;
    }, 200);
  }, [src]);

  const handleMouseLeave = useCallback(() => {
    // Annuler le préchargement si la souris quitte avant 200ms
    if (preloadTimeoutRef.current) {
      clearTimeout(preloadTimeoutRef.current);
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = e.clientX;
    const originY = e.clientY;
    
    onClick(e, originX, originY);
  }, [onClick]);

  return (
    <figure 
      className={`overflow-hidden rounded-lg cursor-pointer relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img 
        ref={imgRef}
        src={src} 
        alt={alt}
        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
      />
      
      {/* Indicateur de préchargement (optionnel, très discret) */}
      {(isPreloading || isLoaded) && (
        <div 
          className={`absolute bottom-2 right-2 w-2 h-2 rounded-full transition-all duration-300 ${
            isLoaded ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
          }`}
          title={isLoaded ? 'Image chargée' : 'Chargement...'}
        />
      )}
    </figure>
  );
}
