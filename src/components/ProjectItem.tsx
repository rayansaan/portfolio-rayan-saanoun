import { Link } from 'react-router-dom';
import { useHoverImage } from '@/context/HoverImageContext';
import type { Project } from '@/types';

interface ProjectItemProps {
  project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
  const { setCurrentImage } = useHoverImage();

  const handleMouseEnter = () => {
    setCurrentImage(project.imageUrl);
  };

  const handleMouseLeave = () => {
    setCurrentImage(null);
  };

  return (
    <Link
      to={project.href || '#'}
      className="block group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span 
        className="text-project-sm sm:text-project-md lg:text-project-lg xl:text-project font-semibold transition-opacity duration-200 group-hover:opacity-70 block"
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
