import { createContext } from 'react';
import type Lenis from 'lenis';

export type LenisContextType = {
  lenis: Lenis | null;
};

export const LenisContext = createContext<LenisContextType>({ lenis: null });
