import { useState, useEffect, useRef, type RefObject } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { allProjects } from '@/data/projects';
import { useLenis } from '@/context/LenisContext';
import { BorderedImage } from '@/components/BorderedImage';
import { GSAPFlipLightbox } from '@/components/GSAPFlipLightbox';
import { generateStandardImageId } from '@/utils/generateId';
import type { ImageDescription } from '@/types';

// Composant Table des matières
function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>('');
  
  // Extraire les titres H2 du markdown
  const headings = content.split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => {
      const title = line.replace('## ', '').trim();
      const id = title.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return { title, id };
    });

  // Observer les sections pour la mise en évidence
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
        Index
      </h3>
      <ul className="space-y-1.5">
        {headings.map(({ title, id }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className={`text-left text-sm transition-colors duration-200 hover:text-foreground w-full ${
                activeId === id 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground'
              }`}
            >
              <span className="truncate block">{title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Hook pour tracker la progression du scroll
function useScrollProgress(targetRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;
      
      const target = targetRef.current;
      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top + window.scrollY;
      const targetHeight = targetRect.height;
      const windowHeight = window.innerHeight;
      
      const scrollStart = targetTop;
      const scrollEnd = targetTop + targetHeight - windowHeight;
      const scrollRange = scrollEnd - scrollStart;
      
      if (scrollRange <= 0) {
        setProgress(100);
        return;
      }
      
      const currentScroll = window.scrollY;
      const relativeScroll = currentScroll - scrollStart;
      const scrollProgress = (relativeScroll / scrollRange) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);
  
  return progress;
}

// Fonction pour extraire le sous-titre du H1
function extractSubtitle(content: string): string | null {
  const h1Match = content.match(/^# (.+)$/m);
  if (h1Match) {
    const fullTitle = h1Match[1];
    // Extraire le texte après le ":"
    const parts = fullTitle.split(':');
    if (parts.length > 1) {
      return parts.slice(1).join(':').trim();
    }
  }
  return null;
}

// Fonction pour nettoyer le markdown (retirer tout avant le premier H2)
function cleanMarkdown(content: string): string {
  // Trouver la première occurrence de "## " (titre H2)
  const firstH2Index = content.indexOf('## ');
  if (firstH2Index !== -1) {
    return content.slice(firstH2Index);
  }
  return content;
}

// Composant pour parser le markdown avec IDs
function MarkdownContent({ content }: { content: string }) {
  const cleanContent = cleanMarkdown(content);
  
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => {
          const text = String(children);
          const id = text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
          return <h2 id={id} className="text-2xl font-semibold mt-12 mb-6 scroll-mt-24">{children}</h2>;
        },
        h3: ({ children }) => (
          <h3 className="text-xl font-medium mt-8 mb-4">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="text-muted-foreground">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#110F0F] pl-4 italic my-6 text-muted-foreground">
            {children}
          </blockquote>
        ),
      }}
    >
      {cleanContent}
    </ReactMarkdown>
  );
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { lenis } = useLenis();
  
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [id, lenis]);
  
  const project = allProjects.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState<ImageDescription | null>(null);
  const [imageRect, setImageRect] = useState<DOMRect | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(contentRef);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Projet non trouvé</h1>
          <Link to="/" className="text-base hover:opacity-70 transition-opacity">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const otherProjects = allProjects
    .filter(p => p.id !== id)
    .slice(0, 3);

  const handleImageClick = (src: string, alt: string, layoutId: string, rect: DOMRect, description?: string) => {
    setSelectedImage({ id: layoutId, src, alt, description: description || '' });
    setImageRect(rect);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setImageRect(null);
  };

  // Utiliser le markdownContent s'il existe, sinon utiliser l'ancienne structure
  const hasMarkdown = !!project.markdownContent;

  return (
    <div className="min-h-screen">
      {/* Lightbox pour les images */}
      <GSAPFlipLightbox
        image={selectedImage}
        originRect={imageRect}
        isOpen={!!selectedImage}
        onClose={handleCloseImage}
        showDescription={!!selectedImage?.description}
      />

      {/* Gradient fixe blanc en haut */}
      <div 
        className="fixed top-0 left-0 right-0 h-32 z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)'
        }}
      />

      {/* Barre de progression - Mobile (fixe en bas) */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-[#110F0F]/5 z-50 lg:hidden">
        <div 
          className="h-full bg-[#110F0F]" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>

      {/* Header */}
      <header className="w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
          <div className="text-sm font-medium">Rayan Saanoun</div>
        </div>
      </header>

      {/* Main Content - Two Column Layout avec Info+Index côte à côte */}
      <section className="w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - Sticky (espace restant) */}
          <div className="lg:flex-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Hero Image */}
              <div className="w-full h-[300px]">
                <BorderedImage
                  src={project.imageUrl}
                  alt={project.name}
                  onClick={(rect) => handleImageClick(project.imageUrl, project.name, generateStandardImageId(project.id, 0), rect)}
                />
              </div>
              
              {/* Barre de progression - Desktop */}
              <div className="hidden lg:block w-full h-1 bg-[#110F0F]/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#110F0F]" 
                  style={{ width: `${scrollProgress}%` }} 
                />
              </div>

              {/* GRID Info + Index côte à côte */}
              <div className="grid grid-cols-2 gap-6">
                {/* Infos projet */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-semibold mb-1">{project.name}</h1>
                    {hasMarkdown && project.markdownContent && (
                      <p className="text-sm text-muted-foreground italic">
                        {extractSubtitle(project.markdownContent)}
                      </p>
                    )}
                  </div>

                  {project.website && (
                    <a 
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm hover:opacity-70 transition-opacity"
                    >
                      Voir le site
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <div className="space-y-2 pt-4 border-t border-gray-300/30">
                    <div>
                      <span className="text-xs text-muted-foreground">Durée</span>
                      <p className="text-sm">{project.duration}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Localisation</span>
                      <p className="text-sm">{project.location}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Année</span>
                      <p className="text-sm">{project.year}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-300/30">
                    <span className="text-xs text-muted-foreground block mb-2">Tools & Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => {
                        const colors: Record<string, string> = {
                          'Figjam': 'bg-[#FFE4E1] text-[#8B4513]',
                          'Figma': 'bg-[#E6E6FA] text-[#4B0082]',
                          'Miro': 'bg-[#F0F8FF] text-[#191970]',
                          'Notion': 'bg-[#F5F5F5] text-[#36454F]',
                          'Bubble.io': 'bg-[#FFF8DC] text-[#8B7355]',
                        };
                        const colorClass = colors[tool] || 'bg-gray-100 text-gray-700';
                        return (
                          <span
                            key={tool}
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${colorClass}`}
                          >
                            {tool}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Table des matières - caché sur tablette et mobile */}
                <div className="border-l border-gray-300/30 pl-6 hidden lg:block">
                  {hasMarkdown && project.markdownContent && (
                    <TableOfContents content={project.markdownContent} />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT COLUMN - Content (largeur fixe 550px) */}
          <div ref={contentRef} className="w-full lg:w-[550px] lg:flex-shrink-0">
            {hasMarkdown && project.markdownContent ? (
              <div className="prose prose-lg max-w-none">
                <MarkdownContent content={project.markdownContent} />
              </div>
            ) : (
              // Fallback pour les projets sans markdownContent (ancienne structure)
              <div className="space-y-8">
                {/* Ancien contenu ici */}
                <p className="text-muted-foreground">Contenu en cours de migration...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* More Projects */}
      {otherProjects.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-12 sm:mb-16">Autres projets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <Link
                key={p.id}
                to={`/project/${p.id}`}
                className="group"
              >
                <div className="aspect-[16/10] rounded-lg border border-[#110F0F]/5 overflow-hidden mb-4">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-medium group-hover:opacity-70 transition-opacity">
                  {p.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-8 border-t border-gray-300/30">
        <Link 
          to="/"
          className="text-base hover:opacity-70 transition-opacity"
        >
          ← Retour aux projets
        </Link>
      </footer>
    </div>
  );
}
