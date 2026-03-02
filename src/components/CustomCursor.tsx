import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringDarkText, setIsHoveringDarkText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Position et vélocité pour l'effet flasque
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Détecter si on est sur mobile/touch
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Calculer la vélocité pour l'effet de déformation
      velocity.current = {
        x: e.clientX - lastMousePos.current.x,
        y: e.clientY - lastMousePos.current.y
      };
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

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

    // Animation fluide
    const animate = () => {
      if (cursorRef.current && cursorDotRef.current) {
        // Suivi exact de la souris sans délai
        cursorPos.current.x = mousePos.current.x;
        cursorPos.current.y = mousePos.current.y;
        
        // Calculer la déformation basée sur la vélocité
        const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
        const maxStretch = 0.3;
        const stretch = Math.min(speed * 0.02, maxStretch);
        
        // Calculer l'angle de déformation
        const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);
        
        // Appliquer les transformations
        cursorRef.current.style.transform = `translate(${cursorPos.current.x - 20}px, ${cursorPos.current.y - 20}px) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.5})`;
        cursorDotRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;
        
        // Réduire progressivement la vélocité
        velocity.current.x *= 0.9;
        velocity.current.y *= 0.9;
      }
      
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Ne pas afficher sur mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Curseur principal (cercle) */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHoveringLink ? 'scale-150' : 'scale-100'}`}
        style={{
          backgroundColor: isHoveringDarkText ? '#ffffff' : '#000000',
          border: isHoveringDarkText ? '2px solid #ffffff' : '2px solid #000000',
        }}
      />
      
      {/* Point central */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHoveringLink ? 'opacity-0' : ''}`}
        style={{
          backgroundColor: isHoveringDarkText ? '#000000' : '#ffffff',
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
