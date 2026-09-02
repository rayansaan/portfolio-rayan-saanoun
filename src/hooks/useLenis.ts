import { useContext } from 'react';
import { LenisContext } from '@/context/lenis';

export function useLenis() {
  return useContext(LenisContext);
}
