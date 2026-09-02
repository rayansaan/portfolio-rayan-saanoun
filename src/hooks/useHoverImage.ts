import { useContext } from 'react';
import { HoverImageContext } from '@/context/hover-image';
import type { HoverImageState } from '@/types';

export function useHoverImage(): HoverImageState {
  const context = useContext(HoverImageContext);

  if (context === undefined) {
    throw new Error('useHoverImage must be used within a HoverImageProvider');
  }

  return context;
}
