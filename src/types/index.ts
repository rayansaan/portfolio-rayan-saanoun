export interface ImageDescription {
  id: string;
  src: string;
  alt: string;
  description: string;
}

export interface ImageWithDescription {
  src: string;
  alt?: string;
  description?: string;
}

export interface ProjectSection {
  content: string;
  images?: (string | ImageWithDescription)[];
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
  statusQuo?: string | ProjectSection;
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
  markdownContent?: string;
  images?: string[];
}

export type ProjectCard = Pick<Project, 'id' | 'name' | 'imageUrl' | 'href' | 'description' | 'tags'>;

export interface PhotographyCategory {
  id: string;
  /** Chemin des sous-dossiers, relatif au dossier du projet. */
  path: string[];
}

export interface Photograph {
  id: string;
  /** Copies optimisées hébergées avec le site, jamais des liens Drive temporaires. */
  src: string;
  thumbnailSrc: string;
  width: number;
  height: number;
  alt: string;
  categoryId?: string;
}

export interface PhotographyProject {
  id: string;
  /** Nom du dossier principal, conservé comme titre. */
  name: string;
  coverPhotoId: string;
  categories: PhotographyCategory[];
  photos: Photograph[];
}

export interface HoverImageState {
  currentImage: string | null;
  setCurrentImage: (image: string | null, type?: 'image' | 'icon') => void;
  imageType: 'image' | 'icon';
  mouseX: number;
  mouseY: number;
  setMousePosition: (x: number, y: number) => void;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
