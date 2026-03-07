import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { ImageDescription } from '@/types';

interface GSAPFlipLightboxProps {
  image: ImageDescription | null;
  originRect: DOMRect | null;
  isOpen: boolean;
  onClose: () => void;
  showDescription?: boolean;
}

export function GSAPFlipLightbox({
  image,
  originRect,
  isOpen,
  onClose,
  showDescription = false,
}: GSAPFlipLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false);
  const imageStartRectRef = useRef<DOMRect | null>(null);

  const animateOpen = useCallback(() => {
    if (!imageRef.current || !overlayRef.current || !originRect || !image) return;

    isAnimatingRef.current = true;

    const img = imageRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    // Store the original rect for closing animation
    imageStartRectRef.current = originRect;

    // Calculate target dimensions (90% of viewport with max constraints)
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const maxWidth = Math.min(viewportWidth * 0.9, 1200);
    const maxHeight = viewportHeight * 0.7;

    // Calculate aspect ratio to maintain
    const imgAspectRatio = originRect.width / originRect.height;
    let targetWidth = maxWidth;
    let targetHeight = targetWidth / imgAspectRatio;

    if (targetHeight > maxHeight) {
      targetHeight = maxHeight;
      targetWidth = targetHeight * imgAspectRatio;
    }

    // Calculate target position (centered)
    const targetLeft = (viewportWidth - targetWidth) / 2;
    const targetTop = (viewportHeight - targetHeight) / 2;

    // Set initial position (matching the clicked image)
    gsap.set(img, {
      position: 'fixed',
      top: originRect.top,
      left: originRect.left,
      width: originRect.width,
      height: originRect.height,
      zIndex: 100,
      objectFit: 'cover',
      borderRadius: 8,
    });

    // Set overlay initial state
    gsap.set(overlay, {
      opacity: 0,
      pointerEvents: 'none',
    });

    // Set content initial state
    if (content) {
      gsap.set(content, {
        opacity: 0,
        y: 30,
      });
    }

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    animationRef.current = tl;

    // Animate image to modal position
    tl.to(
      img,
      {
        top: targetTop,
        left: targetLeft,
        width: targetWidth,
        height: targetHeight,
        borderRadius: 12,
        duration: 0.6,
        ease: 'power3.out',
      },
      0
    );

    // Overlay fade in
    tl.to(
      overlay,
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        pointerEvents: 'auto',
      },
      0
    );

    // Content fade in (if description)
    if (content && showDescription) {
      tl.to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.2,
        },
        0
      );
    }
  }, [originRect, image, showDescription]);

  const animateClose = useCallback(() => {
    if (!imageRef.current || !overlayRef.current || !imageStartRectRef.current || isAnimatingRef.current) {
      onClose();
      return;
    }

    isAnimatingRef.current = true;

    const img = imageRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const startRect = imageStartRectRef.current;

    // Kill any ongoing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        onClose();
      },
    });

    // Animate image back to original position
    tl.to(
      img,
      {
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        borderRadius: 8,
        duration: 0.5,
        ease: 'power3.inOut',
      },
      0
    );

    // Overlay fade out
    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        pointerEvents: 'none',
      },
      0
    );

    // Content fade out
    if (content && showDescription) {
      tl.to(
        content,
        {
          opacity: 0,
          y: 20,
          duration: 0.2,
          ease: 'power2.in',
        },
        0
      );
    }
  }, [onClose, showDescription]);

  useEffect(() => {
    if (isOpen && image && originRect) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        animateOpen();
      });
    }
  }, [isOpen, image, originRect, animateOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isAnimatingRef.current) {
        animateClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, animateClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !image || !originRect) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => {
          if (!isAnimatingRef.current) {
            animateClose();
          }
        }}
      />

      {/* Close button */}
      <button
        onClick={() => {
          if (!isAnimatingRef.current) {
            animateClose();
          }
        }}
        className="absolute top-6 right-6 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Fermer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Animated image */}
      <img
        ref={imageRef}
        src={image.src}
        alt={image.alt}
        className="will-change-transform"
        style={{
          position: 'fixed',
          top: originRect.top,
          left: originRect.left,
          width: originRect.width,
          height: originRect.height,
          objectFit: 'cover',
          borderRadius: 8,
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />

      {/* Description content */}
      {showDescription && (
        <div
          ref={contentRef}
          className="fixed left-1/2 -translate-x-1/2 z-[99] w-full max-w-3xl px-6"
          style={{
            top: 'calc(50% + 40vh)',
            marginTop: '24px',
          }}
        >
          <div className="bg-white rounded-xl p-6 shadow-2xl">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{image.description}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
