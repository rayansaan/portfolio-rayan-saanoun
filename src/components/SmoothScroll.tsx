import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Attendre que le DOM soit complètement chargé
    const initLenis = () => {
      // Vérifier si on est sur mobile/touch
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }

      // Initialize Lenis avec des paramètres plus visibles
      lenisRef.current = new Lenis({
        duration: 1.8, // Plus long pour un effet plus visible
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.2, // Légèrement plus rapide
        touchMultiplier: isTouchDevice ? 1.8 : 1.2,
        infinite: false,
      });

      // Connecter Lenis au RAF avec une fonction nommée
      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Log pour debug (à retirer en production)
      console.log('Lenis initialized');
    };

    // Initialiser immédiatement ou après le chargement
    if (document.readyState === 'complete') {
      initLenis();
    } else {
      window.addEventListener('load', initLenis);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', initLenis);
      lenisRef.current?.destroy();
    };
  }, []);

  return null;
}
