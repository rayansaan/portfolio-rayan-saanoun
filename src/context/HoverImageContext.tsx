import { useState, type ReactNode, useCallback } from 'react';
import { HoverImageContext } from '@/context/hover-image';

export function HoverImageProvider({ children }: { children: ReactNode }) {
  const [currentImage, setCurrentImageState] = useState<string | null>(null);
  const [imageType, setImageType] = useState<'image' | 'icon'>('image');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const setCurrentImage = useCallback((image: string | null, type: 'image' | 'icon' = 'image') => {
    setCurrentImageState(image);
    setImageType(type);
  }, []);

  const setMousePos = useCallback((x: number, y: number) => {
    setMousePosition({ x, y });
  }, []);

  return (
    <HoverImageContext.Provider value={{ 
      currentImage, 
      setCurrentImage, 
      imageType,
      mouseX: mousePosition.x, 
      mouseY: mousePosition.y, 
      setMousePosition: setMousePos 
    }}>
      {children}
    </HoverImageContext.Provider>
  );
}
