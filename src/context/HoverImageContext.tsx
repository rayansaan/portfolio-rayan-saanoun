import { createContext, useContext, useState, type ReactNode } from 'react';
import type { HoverImageState } from '@/types';

const HoverImageContext = createContext<HoverImageState | undefined>(undefined);

export function HoverImageProvider({ children }: { children: ReactNode }) {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  return (
    <HoverImageContext.Provider value={{ currentImage, setCurrentImage }}>
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
