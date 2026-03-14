import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useHoverImage } from '@/context/HoverImageContext';
import type { Project } from '@/types';

interface ProjectItemProps {
  project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
  const { setCurrentImage, setMousePosition } = useHoverImage();

  // Détecter si l'appareil est tactile (mobile/tablette)
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setCurrentImage(project.imageUrl);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setCurrentImage(null);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isTouchDevice) {
      setMousePosition(e.clientX, e.clientY);
    }
  };

  return (
    <Link
      to={project.href || '#'}
      className="block group cursor-pointer transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Frame principale avec padding 24px et radius 24px */}
      <div className="rounded-[24px] p-6 bg-white border border-black/5 overflow-hidden transition-all duration-300 hover:border-black/20">
        {/* Image avec radius 8px et margin bottom 16px */}
        <div className="aspect-[4/3] md:aspect-[3/2] rounded-[8px] overflow-hidden mb-4">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Content */}
        <div>
          {/* Nom du projet */}
          <h3 
            className="text-xl font-semibold mb-1 transition-opacity duration-200 group-hover:opacity-70"
            style={{ 
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
            }}
          >
            {project.name}
          </h3>
          
          {/* Description courte - 1 ligne max */}
          <p className="text-base text-muted-foreground truncate mb-3">
            {project.description}
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
      </div>
    </Link>
  );
}
