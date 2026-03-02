import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { allProjects } from '@/data/projects';

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
          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-12">
            {project.description}
          </p>

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

      {/* 1. Rôle, équipe, année, durée */}
      {(project.role || project.team) && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Rôle & Équipe</h2>
            
            {project.role && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Mon rôle</h3>
                <p className="text-base leading-relaxed">{project.role}</p>
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

      {/* 2. Challenge */}
      {project.challenge && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Challenge</h2>
            <p className="text-lg leading-relaxed">{project.challenge}</p>
          </div>
        </section>
      )}

      {/* 3. Status Quo */}
      {project.statusQuo && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Status Quo</h2>
            <p className="text-lg leading-relaxed">{project.statusQuo}</p>
          </div>
        </section>
      )}

      {/* 4. Process */}
      {project.process && Object.values(project.process).some(v => v) && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Process</h2>
            
            <div className="space-y-8">
              {project.process.discovery && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Discovery</h3>
                  <p className="text-base leading-relaxed">{project.process.discovery}</p>
                </div>
              )}
              
              {project.process.define && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Define</h3>
                  <p className="text-base leading-relaxed">{project.process.define}</p>
                </div>
              )}
              
              {project.process.design && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Design</h3>
                  <p className="text-base leading-relaxed">{project.process.design}</p>
                </div>
              )}
              
              {project.process.prototyping && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Prototyping</h3>
                  <p className="text-base leading-relaxed">{project.process.prototyping}</p>
                </div>
              )}
              
              {project.process.testing && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Testing</h3>
                  <p className="text-base leading-relaxed">{project.process.testing}</p>
                </div>
              )}
              
              {project.process.delivery && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Delivery</h3>
                  <p className="text-base leading-relaxed">{project.process.delivery}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. Solution */}
      {project.solution && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Solution</h2>
            <p className="text-lg leading-relaxed">{project.solution}</p>
          </div>
        </section>
      )}

      {/* 6. Impact */}
      {project.impact && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Impact</h2>
            <p className="text-lg leading-relaxed">{project.impact}</p>
          </div>
        </section>
      )}

      {/* 7. Learnings */}
      {project.learnings && (
        <section className="w-full px-6 sm:px-10 py-12 sm:py-16 border-t border-gray-300/30">
          <div className="max-w-4xl">
            <h2 className="text-sm mb-8">Learnings</h2>
            <p className="text-lg leading-relaxed">{project.learnings}</p>
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
