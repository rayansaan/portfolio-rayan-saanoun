import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import gsap from 'gsap';
import { useLenis } from '@/hooks/useLenis';
import type { Photograph, PhotographyCategory } from '@/types';

interface PhotoLightboxProps {
  photos: Photograph[];
  categories: PhotographyCategory[];
  projectName: string;
  initialIndex: number;
  origin: DOMRect;
  onClose: () => void;
}

function LightboxImage({ photo, imageRef }: { photo: Photograph; imageRef: RefObject<HTMLImageElement | null> }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <>
      {status !== 'loaded' && (
        <p className="photo-lightbox-status" role="status">
          {status === 'error' ? 'Cette photo ne peut pas être chargée.' : 'Chargement de la photo…'}
        </p>
      )}
      <img
        ref={imageRef}
        className="photo-lightbox-image"
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        style={{
          visibility: status === 'error' ? 'hidden' : 'visible',
          backgroundImage: status === 'loading' ? `url("${photo.thumbnailSrc}")` : undefined,
        }}
      />
    </>
  );
}

export function PhotoLightbox({ photos, categories, projectName, initialIndex, origin, onClose }: PhotoLightboxProps) {
  const { lenis } = useLenis();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hasAnimated = useRef(false);
  const isClosing = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const photo = photos[index];
  const category = categories.find((item) => item.id === photo.categoryId);

  // Le dialogue natif place le contenu au-dessus du site et gère le focus.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    return () => {
      if (dialog) gsap.killTweensOf(dialog);
      dialog?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    const resumeLenis = lenis && !lenis.isStopped;
    if (resumeLenis) lenis.stop();
    return () => { if (resumeLenis) lenis.start(); };
  }, [lenis]);

  useLayoutEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    const target = image.getBoundingClientRect();
    const firstOpen = !hasAnimated.current;
    hasAnimated.current = true;
    if (reduceMotion || !target.width || !target.height) return;
    const initialScale = Math.min(origin.width / target.width, origin.height / target.height);

    const animation = gsap.fromTo(image, firstOpen ? {
      x: origin.left + origin.width / 2 - target.left - target.width / 2,
      y: origin.top + origin.height / 2 - target.top - target.height / 2,
      scaleX: initialScale,
      scaleY: initialScale,
      opacity: 1,
    } : { x: 0, y: 0, scaleX: 0.97, scaleY: 0.97, opacity: 0 }, {
      x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1,
      duration: firstOpen ? 0.5 : 0.25,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    });
    return () => { animation.kill(); };
  }, [photo.id, origin, reduceMotion]);

  const close = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;
    const dialog = dialogRef.current;
    if (reduceMotion || !dialog) { onClose(); return; }
    dialog.dataset.closing = 'true';
    gsap.to(dialog, { opacity: 0, duration: 0.2, onComplete: onClose });
  }, [onClose, reduceMotion]);

  const navigate = (direction: number) => {
    if (!isClosing.current) setIndex((current) => (current + direction + photos.length) % photos.length);
  };

  return (
    <dialog
      ref={dialogRef}
      className="photo-lightbox"
      aria-labelledby="photo-lightbox-title"
      aria-describedby="photo-lightbox-caption"
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          navigate(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      <h2 id="photo-lightbox-title" className="sr-only">Photographies de {projectName}</h2>
      <button type="button" className="photo-lightbox-close" autoFocus aria-label="Fermer la photo" onClick={close}>
        <X aria-hidden="true" size={24} />
      </button>
      <div
        className="photo-lightbox-stage"
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        onTouchStart={(event) => {
          touchStart.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          const end = event.changedTouches[0];
          if (!start || !end) return;
          const dx = end.clientX - start.x;
          const dy = end.clientY - start.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2) navigate(dx > 0 ? -1 : 1);
        }}
      >
        <LightboxImage key={photo.id} photo={photo} imageRef={imageRef} />
      </div>
      <footer className="photo-lightbox-footer">
        <p id="photo-lightbox-caption">{category?.path.join(' / ') || projectName}</p>
        <div className="photo-lightbox-navigation">
          {photos.length > 1 && (
            <button type="button" aria-label="Photo précédente" onClick={() => navigate(-1)}><ArrowLeft size={20} aria-hidden="true" /></button>
          )}
          <span aria-live="polite" aria-atomic="true">{index + 1} / {photos.length}</span>
          {photos.length > 1 && (
            <button type="button" aria-label="Photo suivante" onClick={() => navigate(1)}><ArrowRight size={20} aria-hidden="true" /></button>
          )}
        </div>
      </footer>
    </dialog>
  );
}
