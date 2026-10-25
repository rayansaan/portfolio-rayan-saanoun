import { ProjectItem } from './ProjectItem';
import type { ProjectCard } from '@/types';

interface ProjectSectionProps {
  title: string;
  projects: ProjectCard[];
  className?: string;
}

export function ProjectSection({
  title,
  projects,
  className = '',
}: ProjectSectionProps) {
  return (
    <section id={title === 'Explorations' ? 'explorations' : undefined} className={`landing-shell landing-projects ${className}`}>
      <div className="max-w-4xl mx-auto border-t border-black/20 pt-6">
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-normal text-muted-foreground mb-4">
              {title === 'UX/UI Design' ? '03 / Projets sélectionnés' : 'En parallèle / Regards personnels'}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">{title}</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            {title === 'UX/UI Design'
              ? 'Des problèmes, des choix de design et des résultats racontés à travers les projets.'
              : 'Photographie et autres recherches visuelles, en dehors des projets produit.'}
          </p>
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
