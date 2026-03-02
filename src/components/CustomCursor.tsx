import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringDarkText, setIsHoveringDarkText] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Position et vélocité pour l'effet flasque
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | undefined>(undefined);
  
  // Pour l'effet de trail/smear
  const prevPositions = useRef<Array<{ x: number; y: number }>>([]);

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
      
      // Stocker les positions précédentes pour l'effet de trail
      prevPositions.current.push({ x: e.clientX, y: e.clientY });
      if (prevPositions.current.length > 5) {
        prevPositions.current.shift();
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

    // Animation fluide
    const animate = () => {
      if (cursorRef.current) {
        // Suivi exact de la souris sans délai
        cursorPos.current.x = mousePos.current.x;
        cursorPos.current.y = mousePos.current.y;
        
        // Calculer la vitesse pour l'effet de déformation
        const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
        
        // Effet flasque plus prononcé
        const maxStretch = 0.8;
        const stretch = Math.min(speed * 0.03, maxStretch);
        
        // Calculer l'angle de déformation
        const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);
        
        // Appliquer les transformations au curseur
        // Scale X augmente dans la direction du mouvement, Scale Y diminue (effet flasque)
        const scaleX = 1 + stretch;
        const scaleY = 1 - stretch * 0.6;
        
        // Ajouter une légère rotation pour accentuer l'effet de mouvement
        const rotation = angle;
        
        cursorRef.current.style.transform = `translate(${cursorPos.current.x - 20}px, ${cursorPos.current.y - 20}px) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
        
        // Réduire progressivement la vélocité
        velocity.current.x *= 0.85;
        velocity.current.y *= 0.85;
      }
      
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });
    
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Ne pas afficher sur mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Curseur unique avec effet flasque intégré */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 opacity-100 ${
          isHoveringLink ? 'scale-150' : 'scale-100'
        }`}
        style={{
          backgroundColor: isHoveringDarkText ? '#ffffff' : '#000000',
          border: isHoveringDarkText ? '2px solid #ffffff' : '2px solid #000000',
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
