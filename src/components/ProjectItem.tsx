import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useHoverImage } from '@/context/HoverImageContext';
import type { Project } from '@/types';

interface ProjectItemProps {
  project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
  const { setCurrentImage, setMousePosition } = useHoverImage();

  const handleMouseEnter = () => {
    setCurrentImage(project.imageUrl);
  };

  const handleMouseLeave = () => {
    setCurrentImage(null);
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    setMousePosition(e.clientX, e.clientY);
  };

  return (
    <Link
      to={project.href || '#'}
      className="block group cursor-pointer border border-black/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-black/20 bg-[#E3E3E3]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Image container with padding */}
      <div className="p-4">
        <div className="aspect-[4/3] overflow-hidden rounded-lg">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Nom du projet */}
        <h3 
          className="text-lg font-semibold mb-1 transition-opacity duration-200 group-hover:opacity-70"
          style={{ 
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
          }}
        >
          {project.name}
        </h3>
        
        {/* Description courte - 1 ligne max */}
        <p className="text-sm text-muted-foreground truncate">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
