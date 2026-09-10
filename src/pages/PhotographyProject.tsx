import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { photographyProjects } from '@/data/photography';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import type { Photograph, PhotographyProject } from '@/types';
import './photography.css';

// Les positions dépendent de l'identifiant, pas d'un tirage à chaque rendu.
function scatterStyle(id: string): CSSProperties {
  const seed = Array.from(id).reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7);
  return {
    '--photo-angle': `${(seed % 900) / 100 - 4.5}deg`,
    '--photo-width': `${90 + (seed % 11)}%`,
    '--photo-shift': `${((seed % 7) - 3) * 0.7}rem`,
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
      onClick={(event) => {
        const image = event.currentTarget.querySelector('img');
        onOpen((image ?? event.currentTarget).getBoundingClientRect());
      }}
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selection, setSelection] = useState<{ index: number; origin: DOMRect } | null>(null);
  const photos = categoryId === null
    ? project.photos
    : project.photos.filter((photo) => (photo.categoryId ?? '') === categoryId);
  const hasRootPhotos = project.photos.some((photo) => !photo.categoryId);
  const categories = project.categories.filter((category) => project.photos.some((photo) => photo.categoryId === category.id));

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let activePointerId: number | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;
    let hasDragged = false;
    let resetDragTimeout: number | null = null;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;

      activePointerId = event.pointerId;
      pointerX = event.clientX;
      pointerY = event.clientY;
      scrollLeft = gallery.scrollLeft;
      scrollTop = gallery.scrollTop;
      hasDragged = false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;

      const deltaX = event.clientX - pointerX;
      const deltaY = event.clientY - pointerY;
      if (!hasDragged && Math.hypot(deltaX, deltaY) < 6) return;

      if (!hasDragged) {
        hasDragged = true;
        gallery.setPointerCapture(event.pointerId);
        gallery.classList.add('is-dragging');
      }

      event.preventDefault();
      gallery.scrollLeft = scrollLeft - deltaX;
      gallery.scrollTop = scrollTop - deltaY;
    };

    const stopDragging = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      activePointerId = null;
      gallery.classList.remove('is-dragging');
      if (gallery.hasPointerCapture(event.pointerId)) gallery.releasePointerCapture(event.pointerId);

      if (resetDragTimeout !== null) window.clearTimeout(resetDragTimeout);
      resetDragTimeout = window.setTimeout(() => {
        hasDragged = false;
        resetDragTimeout = null;
      }, 0);
    };

    const preventClickAfterDrag = (event: MouseEvent) => {
      if (!hasDragged) return;
      event.preventDefault();
      event.stopPropagation();
    };

    gallery.addEventListener('pointerdown', handlePointerDown);
    gallery.addEventListener('pointermove', handlePointerMove);
    gallery.addEventListener('pointerup', stopDragging);
    gallery.addEventListener('pointercancel', stopDragging);
    gallery.addEventListener('click', preventClickAfterDrag, true);

    return () => {
      if (resetDragTimeout !== null) window.clearTimeout(resetDragTimeout);
      gallery.removeEventListener('pointerdown', handlePointerDown);
      gallery.removeEventListener('pointermove', handlePointerMove);
      gallery.removeEventListener('pointerup', stopDragging);
      gallery.removeEventListener('pointercancel', stopDragging);
      gallery.removeEventListener('click', preventClickAfterDrag, true);
    };
  }, []);

  useEffect(() => {
    galleryRef.current?.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [categoryId]);

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

      <div
        ref={galleryRef}
        className="photo-scatter"
        aria-label={`Photographies de ${project.name} — espace navigable horizontalement et verticalement`}
        tabIndex={0}
      >
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
