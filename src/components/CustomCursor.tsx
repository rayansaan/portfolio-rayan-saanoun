import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const CURSOR_SIZE = 24;
const HALF_SIZE = CURSOR_SIZE / 2;
const DIRECTION_RESET_DELAY = 120;

type CursorDirection = 'up' | 'right' | 'down' | 'left' | 'idle';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const previousPositionRef = useRef<{ x: number; y: number } | null>(null);
  const directionResetRef = useRef<number | null>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isOverPhotoGallery, setIsOverPhotoGallery] = useState(false);
  const [direction, setDirection] = useState<CursorDirection>('idle');
  
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - HALF_SIZE}px, ${e.clientY - HALF_SIZE}px, 0)`;
      }

      const target = e.target as HTMLElement;
      const isLink = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      const isPhotoGallery = Boolean(target.closest('.photo-scatter'));
      setIsHoveringLink(!!isLink);
      setIsOverPhotoGallery(isPhotoGallery);

      const previousPosition = previousPositionRef.current;
      previousPositionRef.current = { x: e.clientX, y: e.clientY };

      if (!isPhotoGallery || !previousPosition) {
        setDirection('idle');
        return;
      }

      const deltaX = e.clientX - previousPosition.x;
      const deltaY = e.clientY - previousPosition.y;
      if (Math.hypot(deltaX, deltaY) < 1.5) return;

      const nextDirection: CursorDirection = Math.abs(deltaX) >= Math.abs(deltaY)
        ? deltaX >= 0 ? 'right' : 'left'
        : deltaY >= 0 ? 'down' : 'up';

      setDirection(nextDirection);
      if (directionResetRef.current !== null) window.clearTimeout(directionResetRef.current);
      directionResetRef.current = window.setTimeout(() => {
        setDirection('idle');
        directionResetRef.current = null;
      }, DIRECTION_RESET_DELAY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (directionResetRef.current !== null) window.clearTimeout(directionResetRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[10000] opacity-100"
        data-photo-gallery={isOverPhotoGallery}
        data-direction={direction}
        style={{
          width: `${CURSOR_SIZE}px`,
          height: `${CURSOR_SIZE}px`,
          willChange: 'transform',
        }}
      >
        <span className={`custom-cursor-core${isHoveringLink ? ' is-hovering' : ''}`} />
        <span className="custom-cursor-directions" aria-hidden="true">
          <ArrowUp className="custom-cursor-arrow custom-cursor-arrow-up" />
          <ArrowRight className="custom-cursor-arrow custom-cursor-arrow-right" />
          <ArrowDown className="custom-cursor-arrow custom-cursor-arrow-down" />
          <ArrowLeft className="custom-cursor-arrow custom-cursor-arrow-left" />
        </span>
      </div>
      
      <style>{`
        .custom-cursor-core {
          position: absolute;
          inset: 0;
          display: block;
          border: 2px solid rgba(255, 255, 255, 0.6);
          border-radius: 999px;
          background: #ffffff;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
          mix-blend-mode: difference;
          transition: transform 180ms ease;
        }

        .custom-cursor-core.is-hovering {
          transform: scale(1.1);
        }

        .custom-cursor-directions {
          position: absolute;
          inset: 0;
          color: #ffffff;
          opacity: 0;
          mix-blend-mode: difference;
          transition: opacity 180ms ease;
        }

        .custom-cursor[data-photo-gallery="true"] .custom-cursor-directions {
          opacity: 0.86;
        }

        .custom-cursor-arrow {
          position: absolute;
          width: 15px;
          height: 15px;
          stroke-width: 1.8;
          transition: transform 120ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .custom-cursor-arrow-up {
          top: -21px;
          left: 50%;
          transform: translateX(-50%) scale(1);
        }

        .custom-cursor-arrow-right {
          top: 50%;
          right: -21px;
          transform: translateY(-50%) scale(1);
        }

        .custom-cursor-arrow-down {
          bottom: -21px;
          left: 50%;
          transform: translateX(-50%) scale(1);
        }

        .custom-cursor-arrow-left {
          top: 50%;
          left: -21px;
          transform: translateY(-50%) scale(1);
        }

        .custom-cursor[data-direction="up"] .custom-cursor-arrow-up {
          transform: translateX(-50%) translateY(-2px) scale(1.24);
        }

        .custom-cursor[data-direction="right"] .custom-cursor-arrow-right {
          transform: translateY(-50%) translateX(2px) scale(1.24);
        }

        .custom-cursor[data-direction="down"] .custom-cursor-arrow-down {
          transform: translateX(-50%) translateY(2px) scale(1.24);
        }

        .custom-cursor[data-direction="left"] .custom-cursor-arrow-left {
          transform: translateY(-50%) translateX(-2px) scale(1.24);
        }

        * {
          cursor: none !important;
        }
        
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .custom-cursor-core,
          .custom-cursor-directions,
          .custom-cursor-arrow {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
