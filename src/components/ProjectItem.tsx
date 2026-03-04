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
      className="block group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Card wrapper - visible uniquement sur mobile */}
      <div className="md:hidden bg-black/5 border border-black/5 rounded-lg overflow-hidden transition-all duration-300">
        {/* Image avec padding */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg p-4 mb-2">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-300 md:group-hover:scale-105"
          />
        </div>
        
        {/* Nom du projet avec padding */}
        <span 
          className="text-project-sm sm:text-project-md font-semibold transition-opacity duration-200 group-hover:opacity-70 block px-4 pb-4"
          style={{ 
            lineHeight: '1.05',
            letterSpacing: '-0.03em',
          }}
        >
          {project.name}
        </span>
      </div>
      
      {/* Desktop - Texte uniquement avec hover */}
      <span 
        className="hidden md:block text-project-sm sm:text-project-md lg:text-project-lg xl:text-project font-semibold transition-opacity duration-200 group-hover:opacity-70"
        style={{ 
          lineHeight: '1.05',
          letterSpacing: '-0.03em',
        }}
      >
        {project.name}
      </span>
    </Link>
  );
}
