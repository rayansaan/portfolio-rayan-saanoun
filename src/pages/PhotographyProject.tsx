import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';
import { photographyProjects } from '@/data/photography';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import type { Photograph, PhotographyProject } from '@/types';
import './photography.css';

const MIN_ZOOM_LEVEL = 0;
const MAX_ZOOM_LEVEL = 3;
const ZOOM_PERCENTAGES = [70, 80, 90, 100] as const;
const WHEEL_STEP_THRESHOLD = 45;
const PINCH_STEP_RATIO = 1.18;

type ZoomAnchor = {
  x: number;
  y: number;
  ratioX: number;
  ratioY: number;
};

// Les positions dépendent de l'identifiant, pas d'un tirage à chaque rendu.
function scatterStyle(id: string): CSSProperties {
  const seed = Array.from(id).reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7);
  return {
    '--photo-angle': `${(seed % 500) / 100 - 2.5}deg`,
    '--photo-width': `${92 + (seed % 9)}%`,
    '--photo-shift': `${((seed % 5) - 2) * 0.35}rem`,
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
        draggable={false}
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
  const zoomLevelRef = useRef(MAX_ZOOM_LEVEL);
  const zoomAnchorRef = useRef<ZoomAnchor | null>(null);
  const zoomAnimationFrameRef = useRef<number | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selection, setSelection] = useState<{ index: number; origin: DOMRect } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(MAX_ZOOM_LEVEL);
  const [showNavigationHint, setShowNavigationHint] = useState(true);
  const photos = categoryId === null
    ? project.photos
    : project.photos.filter((photo) => (photo.categoryId ?? '') === categoryId);
  const hasRootPhotos = project.photos.some((photo) => !photo.categoryId);
  const categories = project.categories.filter((category) => project.photos.some((photo) => photo.categoryId === category.id));
  const [overviewLayout, setOverviewLayout] = useState({ columns: 1, rows: Math.max(1, photos.length) });

  const updateZoom = useCallback((requestedLevel: number, anchorX?: number, anchorY?: number) => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const nextLevel = Math.min(MAX_ZOOM_LEVEL, Math.max(MIN_ZOOM_LEVEL, requestedLevel));
    if (nextLevel === zoomLevelRef.current) return;

    const x = anchorX ?? gallery.clientWidth / 2;
    const y = anchorY ?? gallery.clientHeight / 2;
    zoomAnchorRef.current = {
      x,
      y,
      ratioX: (gallery.scrollLeft + x) / Math.max(gallery.scrollWidth, 1),
      ratioY: (gallery.scrollTop + y) / Math.max(gallery.scrollHeight, 1),
    };
    zoomLevelRef.current = nextLevel;
    setZoomLevel(nextLevel);
  }, []);

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
        setShowNavigationHint(false);
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
    const gallery = galleryRef.current;
    const hideHint = () => setShowNavigationHint(false);
    const timeout = window.setTimeout(hideHint, 4500);

    gallery?.addEventListener('scroll', hideHint, { passive: true, once: true });
    return () => {
      window.clearTimeout(timeout);
      gallery?.removeEventListener('scroll', hideHint);
    };
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let accumulatedDelta = 0;
    let lastDirection = 0;

    const handleWheel = (event: WheelEvent) => {
      // Le geste horizontal reste disponible pour parcourir la galerie.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();

      const multiplier = event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? gallery.clientHeight
          : 1;
      const delta = event.deltaY * multiplier;
      const direction = Math.sign(delta);

      if (direction !== lastDirection) accumulatedDelta = 0;
      lastDirection = direction;
      accumulatedDelta += delta;

      if (Math.abs(accumulatedDelta) < WHEEL_STEP_THRESHOLD) return;

      // Molette vers l'avant (delta négatif) = zoom avant.
      const zoomDirection = accumulatedDelta < 0 ? 1 : -1;
      accumulatedDelta = 0;

      const currentLevel = zoomLevelRef.current;
      const nextLevel = currentLevel + zoomDirection;

      const bounds = gallery.getBoundingClientRect();
      const x = Math.min(bounds.width, Math.max(0, event.clientX - bounds.left));
      const y = Math.min(bounds.height, Math.max(0, event.clientY - bounds.top));
      updateZoom(nextLevel, x, y);
    };

    gallery.addEventListener('wheel', handleWheel, { passive: false });
    return () => gallery.removeEventListener('wheel', handleWheel);
  }, [updateZoom]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let pinchStartDistance = 0;
    let pinchStartLevel = zoomLevelRef.current;
    let isPinching = false;
    let resetPinchTimeout: number | null = null;

    const getDistance = (touches: TouchList) => {
      const deltaX = touches[1].clientX - touches[0].clientX;
      const deltaY = touches[1].clientY - touches[0].clientY;
      return Math.hypot(deltaX, deltaY);
    };

    const startPinch = (event: TouchEvent) => {
      if (event.touches.length < 2) return;

      event.preventDefault();
      if (resetPinchTimeout !== null) {
        window.clearTimeout(resetPinchTimeout);
        resetPinchTimeout = null;
      }

      pinchStartDistance = Math.max(getDistance(event.touches), 1);
      pinchStartLevel = zoomLevelRef.current;
      isPinching = true;
      setShowNavigationHint(false);
      gallery.classList.add('is-pinching');
    };

    const movePinch = (event: TouchEvent) => {
      if (!isPinching || event.touches.length < 2 || pinchStartDistance === 0) return;

      event.preventDefault();
      const distanceRatio = Math.max(getDistance(event.touches), 1) / pinchStartDistance;
      const levelOffset = Math.round(Math.log(distanceRatio) / Math.log(PINCH_STEP_RATIO));
      const bounds = gallery.getBoundingClientRect();
      const midpointX = (event.touches[0].clientX + event.touches[1].clientX) / 2 - bounds.left;
      const midpointY = (event.touches[0].clientY + event.touches[1].clientY) / 2 - bounds.top;

      updateZoom(pinchStartLevel + levelOffset, midpointX, midpointY);
    };

    const stopPinch = (event: TouchEvent) => {
      if (!isPinching) return;

      if (event.touches.length >= 2) {
        pinchStartDistance = Math.max(getDistance(event.touches), 1);
        pinchStartLevel = zoomLevelRef.current;
        return;
      }

      pinchStartDistance = 0;
      gallery.classList.remove('is-pinching');
      resetPinchTimeout = window.setTimeout(() => {
        isPinching = false;
        resetPinchTimeout = null;
      }, 0);
    };

    const preventClickAfterPinch = (event: MouseEvent) => {
      if (!isPinching) return;
      event.preventDefault();
      event.stopPropagation();
    };

    gallery.addEventListener('touchstart', startPinch, { passive: false });
    gallery.addEventListener('touchmove', movePinch, { passive: false });
    gallery.addEventListener('touchend', stopPinch);
    gallery.addEventListener('touchcancel', stopPinch);
    gallery.addEventListener('click', preventClickAfterPinch, true);

    return () => {
      if (resetPinchTimeout !== null) window.clearTimeout(resetPinchTimeout);
      gallery.classList.remove('is-pinching');
      gallery.removeEventListener('touchstart', startPinch);
      gallery.removeEventListener('touchmove', movePinch);
      gallery.removeEventListener('touchend', stopPinch);
      gallery.removeEventListener('touchcancel', stopPinch);
      gallery.removeEventListener('click', preventClickAfterPinch, true);
    };
  }, [updateZoom]);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let resizeFrame = 0;

    const calculateOverviewLayout = () => {
      const styles = window.getComputedStyle(gallery);
      const horizontalPadding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
      const verticalPadding = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);
      const gap = Number.parseFloat(styles.columnGap) || 0;
      const availableWidth = Math.max(1, gallery.clientWidth - horizontalPadding);
      const availableHeight = Math.max(1, gallery.clientHeight - verticalPadding);
      const photoCount = Math.max(1, photos.length);

      let bestColumns = photoCount <= 3 ? photoCount : 1;
      let bestRows = Math.ceil(photoCount / bestColumns);
      let bestCellSize = -1;

      if (photoCount > 3) {
        for (let columns = 1; columns <= photoCount; columns += 1) {
          const rows = Math.ceil(photoCount / columns);
          const cellWidth = (availableWidth - gap * (columns - 1)) / columns;
          const cellHeight = (availableHeight - gap * (rows - 1)) / rows;
          if (cellWidth <= 0 || cellHeight <= 0) continue;

          const emptyCells = columns * rows - photoCount;
          const cellSize = Math.min(cellWidth, cellHeight) - emptyCells * 0.2;
          if (cellSize > bestCellSize) {
            bestCellSize = cellSize;
            bestColumns = columns;
            bestRows = rows;
          }
        }
      }

      setOverviewLayout((current) => (
        current.columns === bestColumns && current.rows === bestRows
          ? current
          : { columns: bestColumns, rows: bestRows }
      ));
    };

    const scheduleCalculation = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(calculateOverviewLayout);
    };

    calculateOverviewLayout();
    const resizeObserver = new ResizeObserver(scheduleCalculation);
    resizeObserver.observe(gallery);

    return () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
    };
  }, [photos.length, zoomLevel]);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;
    const anchor = zoomAnchorRef.current;
    if (!gallery || !anchor) return;

    if (zoomAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(zoomAnimationFrameRef.current);
    }

    const startedAt = performance.now();
    const preserveAnchor = (now: number) => {
      const maxLeft = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      const maxTop = Math.max(0, gallery.scrollHeight - gallery.clientHeight);

      gallery.scrollLeft = Math.min(maxLeft, Math.max(0, anchor.ratioX * gallery.scrollWidth - anchor.x));
      gallery.scrollTop = Math.min(maxTop, Math.max(0, anchor.ratioY * gallery.scrollHeight - anchor.y));

      if (now - startedAt < 340) {
        zoomAnimationFrameRef.current = window.requestAnimationFrame(preserveAnchor);
      } else {
        zoomAnimationFrameRef.current = null;
        zoomAnchorRef.current = null;
      }
    };

    zoomAnimationFrameRef.current = window.requestAnimationFrame(preserveAnchor);
    return () => {
      if (zoomAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(zoomAnimationFrameRef.current);
        zoomAnimationFrameRef.current = null;
      }
    };
  }, [zoomLevel]);

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
        data-zoom={zoomLevel}
        data-layout={photos.length <= 3 ? 'horizontal' : 'spatial'}
        style={{
          '--overview-columns': overviewLayout.columns,
          '--overview-rows': overviewLayout.rows,
        } as CSSProperties}
        aria-label={`Photographies de ${project.name} — espace navigable horizontalement et verticalement. Molette ou pincement à deux doigts pour contrôler le zoom.`}
        tabIndex={0}
      >
        {photos.map((photo, index) => (
          <div className="photo-slot" key={photo.id}>
            <PhotoTile
              photo={photo}
              index={index}
              onOpen={(origin) => setSelection({ index, origin })}
            />
          </div>
        ))}
      </div>

      <div className="photo-zoom-control">
        <button
          type="button"
          onClick={() => updateZoom(zoomLevel - 1)}
          disabled={zoomLevel === MIN_ZOOM_LEVEL}
          aria-label="Dézoomer"
        >
          <ZoomOut size={16} aria-hidden="true" />
        </button>
        <div
          className="photo-zoom-track"
          style={{ '--zoom-progress': `${(zoomLevel / MAX_ZOOM_LEVEL) * 100}%` } as CSSProperties}
        >
          <span className="photo-zoom-track-fill" aria-hidden="true" />
          <input
            className="photo-zoom-slider"
            type="range"
            min={MIN_ZOOM_LEVEL}
            max={MAX_ZOOM_LEVEL}
            step="1"
            value={zoomLevel}
            onChange={(event) => updateZoom(Number(event.currentTarget.value))}
            aria-label="Niveau de zoom"
            aria-valuetext={`${ZOOM_PERCENTAGES[zoomLevel]} %`}
          />
        </div>
        <button
          type="button"
          onClick={() => updateZoom(zoomLevel + 1)}
          disabled={zoomLevel === MAX_ZOOM_LEVEL}
          aria-label="Zoomer"
        >
          <ZoomIn size={16} aria-hidden="true" />
        </button>
        <output className="sr-only" aria-live="polite" aria-atomic="true">
          Zoom {ZOOM_PERCENTAGES[zoomLevel]} %
        </output>
      </div>

      <div
        className={`photo-navigation-overlay${showNavigationHint ? ' is-visible' : ''}`}
        aria-hidden={!showNavigationHint}
      >
        <p className="photo-navigation-hint">
          <span className="photo-navigation-hint-desktop">Maintenez et glissez pour explorer</span>
          <span className="photo-navigation-hint-mobile">
            <svg className="photo-pinch-icon" viewBox="0 0 48 28" aria-hidden="true">
              <g className="photo-pinch-finger photo-pinch-finger-left">
                <rect x="9" y="6" width="7" height="17" rx="3.5" transform="rotate(-28 12.5 14.5)" />
              </g>
              <g className="photo-pinch-finger photo-pinch-finger-right">
                <rect x="32" y="6" width="7" height="17" rx="3.5" transform="rotate(28 35.5 14.5)" />
              </g>
            </svg>
            <span>Pincez pour zoomer ou dézoomer</span>
          </span>
        </p>
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
