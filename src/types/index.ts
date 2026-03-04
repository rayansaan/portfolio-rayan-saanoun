export interface ImageDescription {
  id: string;
  src: string;
  alt: string;
  description: string;
}

export interface ProjectSection {
  content: string;
  images?: string[];
}

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
  context?: string;
  website?: string;
  useCases?: string[];
  role?: string;
  team?: string[];
  challenge?: string;
  statusQuo?: string;
  process?: {
    discovery?: string | ProjectSection;
    define?: string | ProjectSection;
    design?: string | ProjectSection;
    prototyping?: string | ProjectSection;
    testing?: string | ProjectSection;
    delivery?: string | ProjectSection;
  };
  solution?: string | ProjectSection;
  impact?: string;
  learnings?: string;
  prototypeUrl?: string;
  imageDescriptions?: ImageDescription[];
}

export interface HoverImageState {
  currentImage: string | null;
  setCurrentImage: (image: string | null) => void;
  mouseX: number;
  mouseY: number;
  setMousePosition: (x: number, y: number) => void;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
