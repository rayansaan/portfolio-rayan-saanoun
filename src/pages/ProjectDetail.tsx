import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { allProjects } from '@/data/projects';
import { CircularReveal } from '@/components/CircularReveal';
import { ImageWithPreload } from '@/components/ImageWithPreload';
import type { ProjectSection } from '@/types';

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

// Composant pour afficher une section avec ses images cliquables
function SectionWithImages({ 
  title, 
  section, 
  onImageClick 
}: { 
  title: string; 
  section: string | ProjectSection | undefined;
  onImageClick: (image: string, originX: number, originY: number) => void;
}) {
  const { content, images } = getSectionData(section);
  if (!content) return null;
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <FormattedText text={content} />
      
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <ImageWithPreload
              key={idx}
              src={img}
              alt={`${title} - Image ${idx + 1}`}
              onClick={(_, originX, originY) => onImageClick(img, originX, originY)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  const project = allProjects.find(p => p.id === id);
  
  // State pour l'animation circulaire
  const [isCircularOpen, setIsCircularOpen] = useState(false);
  const [originPosition, setOriginPosition] = useState({ x: 0, y: 0 });
  const [currentImage, setCurrentImage] = useState('');
  const [allImages, setAllImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
  
  // Collecter toutes les images du projet
  const allProjectImages = useMemo(() => {
    const images: string[] = [];
    
    // Ajouter l'image principale
    images.push(project.imageUrl);
    
    // Ajouter les images du process
    if (project.process) {
      Object.values(project.process).forEach(section => {
        if (section) {
          const { images: sectionImages } = getSectionData(section);
          images.push(...sectionImages);
        }
      });
    }
    
    // Ajouter les images de la solution
    images.push(...solutionData.images);
    
    return images;
  }, [project, solutionData.images]);

  // Fonction pour ouvrir l'image avec animation circulaire
  const openImageWithAnimation = (image: string, originX: number, originY: number) => {
    const index = allProjectImages.indexOf(image);
    setCurrentImage(image);
    setAllImages(allProjectImages);
    setCurrentIndex(index >= 0 ? index : 0);
    setOriginPosition({ x: originX, y: originY });
    setIsCircularOpen(true);
  };
  
  // Navigation dans le lightbox
  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
    } else {
      setCurrentIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
    }
    setCurrentImage(allImages[currentIndex]);
  };

  return (
    <div className="min-h-screen">
      {/* Animation Circulaire */}
      <CircularReveal
        isOpen={isCircularOpen}
        originX={originPosition.x}
        originY={originPosition.y}
        onClose={() => setIsCircularOpen(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={allImages[currentIndex] || currentImage}
            alt="Image projet"
            className="max-w-full max-h-full object-contain"
          />
          
          {/* Navigation */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              
              {/* Compteur */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
                {currentIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>
      </CircularReveal>

      {/* Header */}
      <header className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-6 sm:py-8">
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

      {/* Hero Image */}
      <div className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh]">
        <ImageWithPreload
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full"
          onClick={(_, originX, originY) => openImageWithAnimation(project.imageUrl, originX, originY)}
        />
      </div>

      {/* Project Info */}
      <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Category & Year */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm">UX/UI Design</span>
            <span className="text-sm text-text-muted">{project.year}</span>
          </div>

          {/* Title */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-8"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            {project.name}
          </h1>

          {/* Description */}
          <div className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-12">
            <FormattedText text={project.description} />
          </div>

          {/* Website Link */}
          {project.website && (
            <div className="mb-12">
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

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 py-8 border-y border-gray-300/30">
            <div>
              <h3 className="text-sm text-text-muted mb-2">Durée</h3>
              <p className="text-base">{project.duration}</p>
            </div>
            <div>
              <h3 className="text-sm text-text-muted mb-2">Localisation</h3>
              <p className="text-base">{project.location}</p>
            </div>
            <div>
              <h3 className="text-sm text-text-muted mb-2">Outils</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => {
                  const iconName = tool === 'Papier & Crayon' ? 'Papier' : tool;
                  return (
                    <img
                      key={tool}
                      src={`/icons/${iconName}.svg`}
                      alt={tool}
                      className="h-8 w-auto"
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-sm text-text-muted mb-2">Tags</h3>
              <p className="text-base">{project.tags.slice(0, 3).join(', ')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Context */}
      {project.context && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm mb-8">Contexte</h2>
            <FormattedText text={project.context} />
          </div>
        </section>
      )}

      {/* Use Cases */}
      {project.useCases && project.useCases.length > 0 && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm mb-8">Use Cases</h2>
            <ul className="list-disc list-inside space-y-2">
              {project.useCases.map((useCase, index) => (
                <li key={index} className="text-base">{useCase}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Rôle, équipe, année, durée */}
      {(project.role || project.team) && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm mb-8">Rôle & Équipe</h2>
            
            {project.role && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Mon rôle</h3>
                <FormattedText text={project.role} />
              </div>
            )}
            
            {project.team && project.team.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Équipe</h3>
                <ul className="list-disc list-inside space-y-2">
                  {project.team.map((member, index) => (
                    <li key={index} className="text-base">{member}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Challenge */}
      {project.challenge && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm mb-8">Challenge</h2>
            <FormattedText text={project.challenge} />
          </div>
        </section>
      )}

      {/* Status Quo */}
      {project.statusQuo && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm mb-8">Status Quo</h2>
            <FormattedText text={project.statusQuo} />
          </div>
        </section>
      )}

      {/* Process */}
      {project.process && Object.values(project.process).some(v => v) && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm mb-8">Process</h2>
            
            <div className="space-y-12">
              {project.process.discovery && (
                <SectionWithImages 
                  title="Discovery" 
                  section={project.process.discovery}
                  onImageClick={openImageWithAnimation} 
                />
              )}
              
              {project.process.define && (
                <SectionWithImages 
                  title="Define" 
                  section={project.process.define}
                  onImageClick={openImageWithAnimation} 
                />
              )}
              
              {project.process.design && (
                <SectionWithImages 
                  title="Design" 
                  section={project.process.design}
                  onImageClick={openImageWithAnimation} 
                />
              )}
              
              {project.process.prototyping && (
                <SectionWithImages 
                  title="Prototyping" 
                  section={project.process.prototyping}
                  onImageClick={openImageWithAnimation} 
                />
              )}
              
              {project.process.testing && (
                <SectionWithImages 
                  title="Testing" 
                  section={project.process.testing}
                  onImageClick={openImageWithAnimation} 
                />
              )}
              
              {project.process.delivery && (
                <SectionWithImages 
                  title="Delivery" 
                  section={project.process.delivery}
                  onImageClick={openImageWithAnimation} 
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Solution */}
      {solutionData.content && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm mb-8">Solution</h2>
            <FormattedText text={solutionData.content} />
            
            {solutionData.images.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {solutionData.images.map((img, idx) => (
                  <ImageWithPreload
                    key={idx}
                    src={img}
                    alt={`Solution - Image ${idx + 1}`}
                    onClick={(_, originX, originY) => openImageWithAnimation(img, originX, originY)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Impact */}
      {project.impact && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm mb-8">Impact</h2>
            <FormattedText text={project.impact} />
          </div>
        </section>
      )}

      {/* Learnings */}
      {project.learnings && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm mb-8">Learnings</h2>
            <FormattedText text={project.learnings} />
          </div>
        </section>
      )}

      {/* Prototype CTA */}
      {project.prototypeUrl && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-2xl mx-auto">
            <a 
              href={project.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg hover:opacity-70 transition-opacity"
            >
              Voir le prototype
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </section>
      )}

      {/* More Projects */}
      {otherProjects.length > 0 && (
        <section className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-12 sm:py-16 border-t border-gray-300/30">
          <h2 className="text-sm mb-8">Autres projets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <Link
                key={p.id}
                to={`/project/${p.id}`}
                className="group"
              >
                <div className="aspect-[16/10] overflow-hidden mb-4">
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
      <footer className="w-full px-16 sm:px-20 lg:px-32 xl:px-48 py-8 border-t border-gray-300/30">
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
