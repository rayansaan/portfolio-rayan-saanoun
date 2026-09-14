import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const CURSOR_SIZE = 24;
const HALF_SIZE = CURSOR_SIZE / 2;
const DIRECTION_RESET_DELAY = 120;
const PROJECT_LABEL = 'VOIR';

type CursorDirection = 'up' | 'right' | 'down' | 'left' | 'idle';

export function CustomCursor() {
  const pointerX = useMotionValue(-CURSOR_SIZE);
  const pointerY = useMotionValue(-CURSOR_SIZE);
  const smoothX = useSpring(pointerX, { stiffness: 1050, damping: 62, mass: 0.18, restDelta: 0.01 });
  const smoothY = useSpring(pointerY, { stiffness: 1050, damping: 62, mass: 0.18, restDelta: 0.01 });
  const prefersReducedMotion = useReducedMotion();
  const previousPositionRef = useRef<{ x: number; y: number } | null>(null);
  const directionResetRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isOverPhotoGallery, setIsOverPhotoGallery] = useState(false);
  const [direction, setDirection] = useState<CursorDirection>('idle');

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const hideCursor = () => {
      setIsVisible(false);
      setIsPressed(false);
      setDirection('idle');
      previousPositionRef.current = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      pointerX.set(event.clientX - HALF_SIZE);
      pointerY.set(event.clientY - HALF_SIZE);
      setIsVisible(true);

      const target = event.target as HTMLElement;
      const isInteractive = Boolean(target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]'));
      const isProject = Boolean(target.closest('[data-cursor-project]'));
      const isPhotoGallery = Boolean(target.closest('.photo-scatter'));
      setIsHoveringInteractive(isInteractive);
      setIsHoveringProject(isProject);
      setIsOverPhotoGallery(isPhotoGallery);

      const previousPosition = previousPositionRef.current;
      previousPositionRef.current = { x: event.clientX, y: event.clientY };

      if (!isPhotoGallery || !previousPosition) {
        setDirection('idle');
        return;
      }

      const deltaX = event.clientX - previousPosition.x;
      const deltaY = event.clientY - previousPosition.y;
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

    const handleMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) hideCursor();
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('blur', hideCursor);

    return () => {
      if (directionResetRef.current !== null) window.clearTimeout(directionResetRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('blur', hideCursor);
    };
  }, [pointerX, pointerY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const coreScale = isHoveringProject
    ? isPressed ? 1.82 : 2
    : isPressed
      ? 0.82
      : isHoveringInteractive ? 1.14 : 1;

  return (
    <>
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[10000]"
        data-photo-gallery={isOverPhotoGallery}
        data-project={isHoveringProject}
        data-direction={direction}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.16 } }}
        style={{
          x: prefersReducedMotion ? pointerX : smoothX,
          y: prefersReducedMotion ? pointerY : smoothY,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          willChange: 'transform',
        }}
      >
        <motion.span
          className="custom-cursor-core"
          animate={{ scale: coreScale }}
          transition={{ type: 'spring', stiffness: 520, damping: 32, mass: 0.3 }}
        >
          <svg className="custom-cursor-grain" viewBox="0 0 64 64" aria-hidden="true">
            <filter id="custom-cursor-grain-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.82"
                numOctaves="3"
                seed="7"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#custom-cursor-grain-filter)" />
          </svg>
        </motion.span>

        <span className="custom-cursor-project-label-frame" aria-hidden="true">
          <svg className="custom-cursor-project-label" viewBox="0 0 80 80">
            <defs>
              <path
                id="custom-cursor-project-path"
                d="M 40 40 m -31 0 a 31 31 0 1 1 62 0 a 31 31 0 1 1 -62 0"
              />
            </defs>
            <text>
              <textPath href="#custom-cursor-project-path" startOffset="25%" textAnchor="middle">
                {Array.from(PROJECT_LABEL).map((letter, index) => (
                  <tspan
                    className="custom-cursor-project-letter"
                    key={`${letter}-${index}`}
                    style={{ animationDelay: `${70 + index * 65}ms` }}
                  >
                    {letter}
                  </tspan>
                ))}
              </textPath>
            </text>
          </svg>
        </span>

        <span className="custom-cursor-directions" aria-hidden="true">
          <ArrowUp className="custom-cursor-arrow custom-cursor-arrow-up" />
          <ArrowRight className="custom-cursor-arrow custom-cursor-arrow-right" />
          <ArrowDown className="custom-cursor-arrow custom-cursor-arrow-down" />
          <ArrowLeft className="custom-cursor-arrow custom-cursor-arrow-left" />
        </span>
      </motion.div>

      <style>{`
        .custom-cursor-core {
          position: absolute;
          inset: 0;
          display: block;
          border: 2px solid rgba(17, 15, 15, 0.7);
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.01);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
          -webkit-backdrop-filter: invert(1) grayscale(1) contrast(1.06) blur(0.45px);
          backdrop-filter: invert(1) grayscale(1) contrast(1.06) blur(0.45px);
        }

        .custom-cursor-grain {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          opacity: 0.14;
          mix-blend-mode: soft-light;
        }

        .custom-cursor-project-label-frame {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          opacity: 0;
          transform: translate(-50%, -50%) rotate(-16deg) scale(0.82);
          transition:
            opacity 180ms ease,
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .custom-cursor[data-project="true"] .custom-cursor-project-label-frame {
          opacity: 1;
          transform: translate(-50%, -50%) rotate(0deg) scale(1);
        }

        .custom-cursor-project-label {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
          fill: #110f0f;
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .custom-cursor-project-letter { opacity: 0; }

        .custom-cursor[data-project="true"] .custom-cursor-project-letter {
          animation: custom-cursor-letter-in 240ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes custom-cursor-letter-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .custom-cursor-directions {
          position: absolute;
          inset: 0;
          color: #110f0f;
          opacity: 0;
          transition: opacity 180ms ease;
        }

        .custom-cursor[data-photo-gallery="true"] .custom-cursor-directions { opacity: 0.86; }

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

        * { cursor: none !important; }

        @media (pointer: coarse) {
          * { cursor: auto !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .custom-cursor-project-label-frame,
          .custom-cursor-directions,
          .custom-cursor-arrow {
            transition: none;
          }

          .custom-cursor[data-project="true"] .custom-cursor-project-letter {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
