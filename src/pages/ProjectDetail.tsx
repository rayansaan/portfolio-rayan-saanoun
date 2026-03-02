import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { allProjects } from '@/data/projects';
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

// Composant pour afficher une section avec ses images
function SectionWithImages({ title, section }: { title: string; section: string | ProjectSection | undefined }) {
  const { content, images } = getSectionData(section);
  if (!content) return null;
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <FormattedText text={content} />
      
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <figure key={idx} className="overflow-hidden rounded-lg">
              <img 
                src={img} 
                alt={`${title} - Image ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  const project = allProjects.find(p => p.id === id);
  
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="w-full px-6 sm:px-10 py-6 sm:py-8">
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
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Project Info */}
      <section className="w-full px-6 sm:px-10 py-12 sm:py-16">
        <div className="max-w-4xl">
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
              <p className="text-base">{project.tools.join(', ')}</p>
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
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Contexte</h2>
            <FormattedText text={project.context} />
          </div>
        </section>
      )}

      {/* Use Cases */}
      {project.useCases && project.useCases.length > 0 && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
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
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
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
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Challenge</h2>
            <FormattedText text={project.challenge} />
          </div>
        </section>
      )}

      {/* Status Quo */}
      {project.statusQuo && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Status Quo</h2>
            <FormattedText text={project.statusQuo} />
          </div>
        </section>
      )}

      {/* Process */}
      {project.process && Object.values(project.process).some(v => v) && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Process</h2>
            
            <div className="space-y-12">
              {project.process.discovery && (
                <SectionWithImages title="Discovery" section={project.process.discovery} />
              )}
              
              {project.process.define && (
                <SectionWithImages title="Define" section={project.process.define} />
              )}
              
              {project.process.design && (
                <SectionWithImages title="Design" section={project.process.design} />
              )}
              
              {project.process.prototyping && (
                <SectionWithImages title="Prototyping" section={project.process.prototyping} />
              )}
              
              {project.process.testing && (
                <SectionWithImages title="Testing" section={project.process.testing} />
              )}
              
              {project.process.delivery && (
                <SectionWithImages title="Delivery" section={project.process.delivery} />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Solution */}
      {solutionData.content && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Solution</h2>
            <FormattedText text={solutionData.content} />
            
            {solutionData.images.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {solutionData.images.map((img, idx) => (
                  <figure key={idx} className="overflow-hidden rounded-lg">
                    <img 
                      src={img} 
                      alt={`Solution - Image ${idx + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Impact */}
      {project.impact && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Impact</h2>
            <FormattedText text={project.impact} />
          </div>
        </section>
      )}

      {/* Learnings */}
      {project.learnings && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Learnings</h2>
            <FormattedText text={project.learnings} />
          </div>
        </section>
      )}

      {/* Prototype CTA */}
      {project.prototypeUrl && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
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
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
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
      <footer className="w-full px-6 sm:px-10 py-8 border-t border-gray-300/30">
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
