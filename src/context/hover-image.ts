import { createContext } from 'react';
import type { HoverImageState } from '@/types';

export const HoverImageContext = createContext<HoverImageState | undefined>(undefined);
