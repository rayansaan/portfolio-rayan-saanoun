export interface Project {
  id: string;
  name: string;
  imageUrl: string;
  href?: string;
  category: 'ux-ui' | 'other';
  year: string;
  duration: string;
  location: string;
  tags: string[];
  tools: string[];
  description: string;
  role?: string;
  team?: string[];
  challenge?: string;
  statusQuo?: string;
  process?: {
    discovery?: string;
    define?: string;
    design?: string;
    prototyping?: string;
    testing?: string;
    delivery?: string;
  };
  solution?: string;
  impact?: string;
  learnings?: string;
  prototypeUrl?: string;
}

export interface HoverImageState {
  currentImage: string | null;
  setCurrentImage: (image: string | null) => void;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
