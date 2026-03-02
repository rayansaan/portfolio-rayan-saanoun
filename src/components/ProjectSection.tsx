import { ProjectItem } from './ProjectItem';
import type { Project } from '@/types';

interface ProjectSectionProps {
  title: string;
  projects: Project[];
  className?: string;
}

export function ProjectSection({ title, projects, className = '' }: ProjectSectionProps) {
  return (
    <section className={`w-full px-8 sm:px-12 lg:px-16 py-16 sm:py-24 ${className}`}>
      <div className="max-w-none mx-auto">
        {/* Section Label */}
        <h2 className="text-sm sm:text-base mb-8 sm:mb-12">
          {title}
        </h2>
        
        {/* Project List */}
        <div className="flex flex-col">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
