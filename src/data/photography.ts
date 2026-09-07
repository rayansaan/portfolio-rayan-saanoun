import type { PhotographyProject, ProjectCard } from '@/types';
import importedProjects from './photography.generated.json';

// Un dossier principal = un projet ; les sous-dossiers conservent leur chemin
// dans categories[].path. Les photos à la racine n'ont pas de categoryId.
export const photographyProjects: PhotographyProject[] = importedProjects;

export const photographyProjectCards: ProjectCard[] = photographyProjects.flatMap((project) => {
  const cover = project.photos.find((photo) => photo.id === project.coverPhotoId) ?? project.photos[0];
  if (!cover) return [];

  return [{
    id: `photography-${project.id}`,
    name: project.name,
    href: `/photography/${encodeURIComponent(project.id)}`,
    imageUrl: cover.thumbnailSrc,
    description: `${project.photos.length} photographie${project.photos.length > 1 ? 's' : ''}`,
    tags: ['Photographie'],
  }];
});
