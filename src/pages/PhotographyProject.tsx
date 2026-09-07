import { useEffect, useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { photographyProjects } from '@/data/photography';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { useLenis } from '@/hooks/useLenis';
import type { Photograph, PhotographyProject } from '@/types';
import './photography.css';

// Les positions dépendent de l'identifiant, pas d'un tirage à chaque rendu.
function scatterStyle(id: string): CSSProperties {
  const seed = Array.from(id).reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7);
  return {
    '--photo-angle': `${(seed % 900) / 100 - 4.5}deg`,
    '--photo-width': `${78 + (seed % 19)}%`,
    '--photo-shift': `${(seed % 5) * 0.6}rem`,
    '--photo-align': seed % 2 === 0 ? 'start' : 'end',
  } as CSSProperties;
}

function PhotoTile({ photo, index, onOpen }: {
  photo: Photograph;
  index: number;
  onOpen: (origin: DOMRect) => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      className="photo-tile"
      style={scatterStyle(photo.id)}
      onClick={(event) => onOpen(event.currentTarget.getBoundingClientRect())}
      aria-label={`Agrandir : ${photo.alt}`}
      aria-haspopup="dialog"
    >
      <img
        src={photo.thumbnailSrc}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={index < 4 ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
      {failed && <span className="photo-tile-error">Aperçu indisponible · ouvrir la photo</span>}
    </button>
  );
}

function ProjectGallery({ project }: { project: PhotographyProject }) {
  const { lenis } = useLenis();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selection, setSelection] = useState<{ index: number; origin: DOMRect } | null>(null);
  const photos = categoryId === null
    ? project.photos
    : project.photos.filter((photo) => (photo.categoryId ?? '') === categoryId);
  const hasRootPhotos = project.photos.some((photo) => !photo.categoryId);
  const categories = project.categories.filter((category) => project.photos.some((photo) => photo.categoryId === category.id));

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [lenis]);

  return (
    <main className="photography-page">
      <header className="photography-header">
        <Link to="/" className="photography-back">
          <ArrowLeft size={18} aria-hidden="true" />
          Retour au portfolio
        </Link>
        <div className="photography-heading">
          <h1>{project.name}</h1>
          <p aria-live="polite">{photos.length} photographie{photos.length > 1 ? 's' : ''}</p>
        </div>
        {categories.length > 0 && (
          <nav className="photography-filters" aria-label="Catégories de photos">
            <button type="button" aria-pressed={categoryId === null} onClick={() => setCategoryId(null)}>Toutes</button>
            {hasRootPhotos && (
              <button type="button" aria-pressed={categoryId === ''} onClick={() => setCategoryId('')}>Sans sous-dossier</button>
            )}
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                aria-pressed={categoryId === category.id}
                onClick={() => setCategoryId(category.id)}
              >
                {category.path.join(' / ')}
              </button>
            ))}
          </nav>
        )}
      </header>

      <div className="photo-scatter" aria-label={`Photographies de ${project.name}`}>
        {photos.map((photo, index) => (
          <PhotoTile
            key={photo.id}
            photo={photo}
            index={index}
            onOpen={(origin) => setSelection({ index, origin })}
          />
        ))}
      </div>

      {selection && (
        <PhotoLightbox
          photos={photos}
          categories={project.categories}
          projectName={project.name}
          initialIndex={selection.index}
          origin={selection.origin}
          onClose={() => setSelection(null)}
        />
      )}
    </main>
  );
}

export function PhotographyProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = photographyProjects.find((item) => item.id === id && item.photos.length > 0);

  if (!project) {
    return (
      <main className="photography-missing">
        <h1>Projet photo introuvable</h1>
        <Link to="/" className="photography-back"><ArrowLeft size={18} aria-hidden="true" />Retour au portfolio</Link>
      </main>
    );
  }

  return <ProjectGallery key={project.id} project={project} />;
}
