import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  
  const CURSOR_SIZE = 24;
  const HALF_SIZE = CURSOR_SIZE / 2;

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - HALF_SIZE}px, ${e.clientY - HALF_SIZE}px)`;
      }
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setIsHoveringLink(!!isLink);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] opacity-100 ${
          isHoveringLink ? 'scale-110' : 'scale-100'
        }`}
        style={{
          width: `${CURSOR_SIZE}px`,
          height: `${CURSOR_SIZE}px`,
          backgroundColor: '#ffffff',
          mixBlendMode: 'difference',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
          willChange: 'transform',
        }}
      />
      
      <style>{`
        * {
          cursor: none !important;
        }
        
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
