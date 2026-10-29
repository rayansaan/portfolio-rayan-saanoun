import { Link } from 'react-router-dom';
import type { ProjectCard } from '@/types';

const projectSummaries: Record<string, string> = {
  moove: 'Clarifier la recherche et la comparaison des trajets dans l’aviation d’affaires.',
  nash: 'Rendre les outils des énergies renouvelables plus clairs et accessibles.',
  veeton: 'Créer une expérience digitale à la rencontre de la mode et de l’IA.',
  rakoono: 'Concevoir une expérience d’analyse sportive autour de la gamification et de l’engagement.',
};

interface ProjectItemProps {
  project: ProjectCard;
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Link
      to={project.href || '#'}
      className="block group cursor-pointer transition-all duration-300"
      data-cursor-project
    >
      <div className="aspect-[16/10] rounded-[8px] overflow-hidden mb-5 border border-black/5 bg-black/5">
        <img
          src={project.imageUrl}
          alt={project.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="mx-1 border-t border-black/15 pt-4">
        <div className="flex items-baseline justify-between gap-3 mb-2">
        <h3
          className="text-2xl font-medium transition-opacity duration-200 group-hover:opacity-70"
          style={{ 
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
          }}
        >
          {project.name}
        </h3>
        <span className="text-xs tracking-normal text-muted-foreground shrink-0">Voir le projet ↗</span>
        </div>
        
        <p className="text-base text-muted-foreground leading-relaxed min-h-[3rem] mb-4">
          {projectSummaries[project.id] || project.description}
        </p>
        
        {/* Tags - max 3 */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-sm bg-[#110F0F]/5 text-[#110F0F]/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
