import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';
import type { HoverImageState } from '@/types';

const HoverImageContext = createContext<HoverImageState | undefined>(undefined);

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

export function useHoverImage(): HoverImageState {
  const context = useContext(HoverImageContext);
  if (context === undefined) {
    throw new Error('useHoverImage must be used within a HoverImageProvider');
  }
  return context;
}
