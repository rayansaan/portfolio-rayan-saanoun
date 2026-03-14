import { ProjectItem } from './ProjectItem';
import type { Project } from '@/types';

interface ProjectSectionProps {
  title: string;
  projects: Project[];
  className?: string;
}

export function ProjectSection({ title, projects, className = '' }: ProjectSectionProps) {
  return (
    <section className={`w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-16 sm:py-24 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-12 sm:mb-16">
          {title}
        </h2>
        
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
