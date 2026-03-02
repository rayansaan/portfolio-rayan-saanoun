import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringDarkText, setIsHoveringDarkText] = useState(false);
  
  // Taille du curseur
  const CURSOR_SIZE = 24;
  const HALF_SIZE = CURSOR_SIZE / 2;

  useEffect(() => {
    // Détecter si on est sur mobile/touch
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Position directe sans fluidité
        cursorRef.current.style.transform = `translate(${e.clientX - HALF_SIZE}px, ${e.clientY - HALF_SIZE}px)`;
      }
    };

    // Détecter les éléments survolés
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Détecter les liens, boutons, éléments cliquables
      const isLink = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setIsHoveringLink(!!isLink);
      
      // Détecter le texte noir/texte sur fond clair
      const computedStyle = window.getComputedStyle(target);
      const color = computedStyle.color;
      const bgColor = computedStyle.backgroundColor;
      
      // Vérifier si c'est du texte noir ou foncé
      const isDarkText = color.includes('rgb(0, 0, 0)') || 
                         color.includes('rgb(55, 53, 47)') ||
                         color.includes('#000') ||
                         color.includes('#37352f') ||
                         parseInt(computedStyle.fontWeight) >= 600;
      
      // Vérifier si le fond est clair
      const isLightBg = bgColor.includes('255') || 
                        bgColor.includes('transparent') ||
                        bgColor === 'rgba(0, 0, 0, 0)';
      
      setIsHoveringDarkText(isDarkText && isLightBg && target.textContent !== null && target.textContent.trim() !== '');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
    };
  }, []);

  // Ne pas afficher sur mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Curseur simple et direct */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75 opacity-100 ${
          isHoveringLink ? 'scale-110' : 'scale-100'
        }`}
        style={{
          width: `${CURSOR_SIZE}px`,
          height: `${CURSOR_SIZE}px`,
          backgroundColor: isHoveringDarkText ? '#ffffff' : '#000000',
          border: isHoveringDarkText ? '1.5px solid #ffffff' : '1.5px solid #000000',
          willChange: 'transform',
        }}
      />
      
      {/* Styles globaux pour cacher le curseur par défaut */}
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
