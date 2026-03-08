import { useState, useEffect, useRef, type RefObject } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { allProjects } from '@/data/projects';
import { useLenis } from '@/context/LenisContext';
import { BorderedImage } from '@/components/BorderedImage';
import { ToolIcon } from '@/components/ToolIcon';
import { ImageDescriptionGrid } from '@/components/ImageDescriptionGrid';
import { GSAPFlipLightbox } from '@/components/GSAPFlipLightbox';
import { generateStandardImageId } from '@/utils/generateId';
import type { ProjectSection, ImageDescription } from '@/types';

// Composant pour afficher du texte avec des sauts de ligne
function FormattedText({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="whitespace-pre-wrap text-base leading-relaxed">
      {text}
    </div>
  );
}

// Helper pour extraire le contenu et les images d'une section
function getSectionData(section: string | ProjectSection | undefined): { content: string; images: string[] } {
  if (!section) return { content: '', images: [] };
  if (typeof section === 'string') {
    return { content: section, images: [] };
  }
  return { content: section.content, images: section.images || [] };
}

// Hook pour tracker la progression du scroll sur un élément cible
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
      
      // Calculate how much of the target element has been scrolled
      // Progress starts when target comes into view and ends when target bottom reaches viewport bottom
      const scrollStart = targetTop;
      const scrollEnd = targetTop + targetHeight - windowHeight;
      const scrollRange = scrollEnd - scrollStart;
      
      if (scrollRange <= 0) {
        // Target is smaller than viewport, show full progress
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

// Composant pour afficher une section avec ses images cliquables
function SectionWithImages({ 
  title, 
  section, 
  projectId,
  sectionIndex,
  onImageClick 
}: { 
  title: string; 
  section: string | ProjectSection | undefined;
  projectId: string;
  sectionIndex: number;
  onImageClick: (src: string, alt: string, layoutId: string, rect: DOMRect) => void;
}) {
  const { content, images } = getSectionData(section);
  if (!content) return null;
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <FormattedText text={content} />
      
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, idx) => {
            const layoutId = generateStandardImageId(projectId, sectionIndex * 100 + idx + 200);
            return (
              <BorderedImage
                key={idx}
                src={img}
                alt={`${title} - Image ${idx + 1}`}
                onClick={(rect) => onImageClick(img, `${title} - Image ${idx + 1}`, layoutId, rect)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { lenis } = useLenis();
  
  // Remonter en haut de la page quand on change de projet
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [id, lenis]);
  
  const project = allProjects.find(p => p.id === id);
  
  // State pour ImageDescription
  const [selectedImageDescription, setSelectedImageDescription] = useState<ImageDescription | null>(null);
  const [imageDescriptionRect, setImageDescriptionRect] = useState<DOMRect | null>(null);
  
  // State pour StandardImage
  const [selectedStandardImage, setSelectedStandardImage] = useState<ImageDescription | null>(null);
  const [standardImageRect, setStandardImageRect] = useState<DOMRect | null>(null);
  
  // Ref pour la colonne de droite (contenu du projet)
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Progression du scroll basée sur le contenu du projet
  const scrollProgress = useScrollProgress(contentRef);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Projet non trouvé</h1>
          <Link to="/" className="text-sm hover:opacity-70 transition-opacity">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const otherProjects = allProjects
    .filter(p => p.id !== id)
    .slice(0, 3);

  // Récupérer les données de la solution
  const solutionData = getSectionData(project.solution);

  // Handler pour ImageDescription
  const handleImageDescriptionClick = (image: ImageDescription, rect: DOMRect) => {
    setSelectedImageDescription(image);
    setImageDescriptionRect(rect);
  };

  const handleCloseImageDescription = () => {
    setSelectedImageDescription(null);
    setImageDescriptionRect(null);
  };

  // Handler pour StandardImage
  const handleStandardImageClick = (src: string, alt: string, layoutId: string, rect: DOMRect) => {
    setSelectedStandardImage({ id: layoutId, src, alt, description: '' });
    setStandardImageRect(rect);
  };

  const handleCloseStandardImage = () => {
    setSelectedStandardImage(null);
    setStandardImageRect(null);
  };

  return (
    <div className="min-h-screen">
      {/* ImageDescription Lightbox */}
      <GSAPFlipLightbox
        image={selectedImageDescription}
        originRect={imageDescriptionRect}
        isOpen={!!selectedImageDescription}
        onClose={handleCloseImageDescription}
        showDescription={true}
      />

      {/* StandardImage Lightbox */}
      <GSAPFlipLightbox
        image={selectedStandardImage}
        originRect={standardImageRect}
        isOpen={!!selectedStandardImage}
        onClose={handleCloseStandardImage}
        showDescription={false}
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

      {/* Main Content - Two Column Layout */}
      <section className="w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - Sticky (33%) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Hero Image - 300px height */}
              <div className="w-full h-[300px]">
                <BorderedImage
                  src={project.imageUrl}
                  alt={project.name}
                  onClick={(rect) => handleStandardImageClick(project.imageUrl, project.name, generateStandardImageId(project.id, 0), rect)}
                />
              </div>
              
              {/* Barre de progression - Desktop */}
              <div className="hidden lg:block w-full h-1 bg-[#110F0F]/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#110F0F]" 
                  style={{ width: `${scrollProgress}%` }} 
                />
              </div>
              
              {/* Project Info */}
              <div className="space-y-6">
                {/* Category & Year */}
                <div className="flex items-center gap-4">
                  <span className="text-sm">UX/UI Design</span>
                  <span className="text-sm text-text-muted">{project.year}</span>
                </div>

                {/* Title */}
                <h1 
                  className="text-3xl font-semibold"
                  style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
                >
                  {project.name}
                </h1>

                {/* Description */}
                <div className="text-base leading-relaxed">
                  <FormattedText text={project.description} />
                </div>

                {/* Website Link */}
                {project.website && (
                  <div>
                    <a 
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base hover:opacity-70 transition-opacity"
                    >
                      Voir le site
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Metadata */}
                <div className="space-y-4 py-6 border-y border-gray-300/30">
                  <div>
                    <h3 className="text-sm text-text-muted mb-1">Durée</h3>
                    <p className="text-base">{project.duration}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-text-muted mb-1">Localisation</h3>
                    <p className="text-base">{project.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-text-muted mb-1">Outils</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map(tool => (
                        <ToolIcon key={tool} name={tool} className="h-8 w-auto" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm text-text-muted mb-1">Tags</h3>
                    <p className="text-base">{project.tags.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT COLUMN - Scrollable (67%) */}
          <div ref={contentRef} className="lg:col-span-2 space-y-0">
            
            {/* Context */}
            {project.context && (
              <section className="py-8 border-t border-gray-300/30 first:border-t-0 first:pt-0">
                <h2 className="text-sm mb-6">Contexte</h2>
                <FormattedText text={project.context} />
              </section>
            )}

            {/* Use Cases */}
            {project.useCases && project.useCases.length > 0 && (
              <section className="py-8 border-t border-gray-300/30">
                <h2 className="text-sm mb-6">Use Cases</h2>
                <ul className="list-disc list-inside space-y-2">
                  {project.useCases.map((useCase, index) => (
                    <li key={index} className="text-base">{useCase}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Rôle, équipe */}
            {(project.role || project.team) && (
              <section className="py-8 border-t border-gray-300/30">
                <h2 className="text-sm mb-6">Rôle & Équipe</h2>
                
                {project.role && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Mon rôle</h3>
                    <FormattedText text={project.role} />
                  </div>
                )}
                
                {project.team && project.team.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Équipe</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {project.team.map((member, index) => (
                        <li key={index} className="text-base">{member}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Challenge */}
            {project.challenge && (
              <section className="py-8 border-t border-gray-300/30">
                <h2 className="text-sm mb-6">Challenge</h2>
                <FormattedText text={project.challenge} />
              </section>
            )}

            {/* Status Quo */}
            {project.statusQuo && (
              <section className="py-8 border-t border-gray-300/30">
                <h2 className="text-sm mb-6">Status Quo</h2>
                <FormattedText text={project.statusQuo} />
              </section>
            )}

            {/* Process */}
            {project.process && Object.values(project.process).some(v => v) && (
              <section className="py-8 border-t border-gray-300/30">
                <h2 className="text-sm mb-6">Process</h2>
                
                <div className="space-y-8">
                  {project.process.discovery && (
                    <SectionWithImages 
                      title="Discovery" 
                      section={project.process.discovery}
                      projectId={project.id}
                      sectionIndex={0}
                      onImageClick={handleStandardImageClick} 
                    />
                  )}
                  
                  {project.process.define && (
                    <SectionWithImages 
                      title="Define" 
                      section={project.process.define}
                      projectId={project.id}
                      sectionIndex={1}
                      onImageClick={handleStandardImageClick} 
                    />
                  )}
                  
                  {project.process.design && (
                    <SectionWithImages 
                      title="Design" 
                      section={project.process.design}
                      projectId={project.id}
                      sectionIndex={2}
                      onImageClick={handleStandardImageClick} 
                    />
                  )}
                  
                  {project.process.prototyping && (
                    <SectionWithImages 
                      title="Prototyping" 
                      section={project.process.prototyping}
                      projectId={project.id}
                      sectionIndex={3}
                      onImageClick={handleStandardImageClick} 
                    />
                  )}
                  
                  {project.process.testing && (
                    <SectionWithImages 
                      title="Testing" 
                      section={project.process.testing}
                      projectId={project.id}
                      sectionIndex={4}
                      onImageClick={handleStandardImageClick} 
                    />
                  )}
                  
                  {project.process.delivery && (
                    <SectionWithImages 
                      title="Delivery" 
                      section={project.process.delivery}
                      projectId={project.id}
                      sectionIndex={5}
                      onImageClick={handleStandardImageClick} 
                    />
                  )}
                </div>
              </section>
            )}

            {/* Solution */}
            {solutionData.content && (
              <section className="py-8 border-t border-gray-300/30">
                <h2 className="text-sm mb-6">Solution</h2>
                <FormattedText text={solutionData.content} />
                
                {solutionData.images.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {solutionData.images.map((img, idx) => (
                      <BorderedImage
                        key={idx}
                        src={img}
                        alt={`Solution - Image ${idx + 1}`}
                        onClick={(rect) => handleStandardImageClick(img, `Solution - Image ${idx + 1}`, generateStandardImageId(project.id, idx + 100), rect)}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Impact */}
            {project.impact && (
              <section className="py-8 border-t border-gray-300/30">
                <h2 className="text-sm mb-6">Impact</h2>
                <FormattedText text={project.impact} />
              </section>
            )}

            {/* Learnings */}
            {project.learnings && (
              <section className="py-8 border-t border-gray-300/30">
                <h2 className="text-sm mb-6">Learnings</h2>
                <FormattedText text={project.learnings} />
              </section>
            )}

            {/* Prototype CTA */}
            {project.prototypeUrl && (
              <section className="py-8 border-t border-gray-300/30">
                <a 
                  href={project.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg hover:opacity-70 transition-opacity"
                >
                  Voir le prototype
                  <ExternalLink className="w-5 h-5" />
                </a>
              </section>
            )}

            {/* ImageDescription Gallery - Flexible placement */}
            {project.imageDescriptions && project.imageDescriptions.length > 0 && (
              <section className="py-8 border-t border-gray-300/30">
                <h2 className="text-sm mb-6">Galerie</h2>
                <ImageDescriptionGrid 
                  images={project.imageDescriptions}
                  onImageClick={handleImageDescriptionClick}
                />
              </section>
            )}
          </div>
        </div>
      </section>

      {/* More Projects */}
      {otherProjects.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <h2 className="text-sm mb-8">Autres projets</h2>
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
                <h3 className="text-lg font-medium group-hover:opacity-70 transition-opacity">
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
          className="text-sm hover:opacity-70 transition-opacity"
        >
          ← Retour aux projets
        </Link>
      </footer>
    </div>
  );
}
