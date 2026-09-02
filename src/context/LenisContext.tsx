import { useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { LenisContext } from '@/context/lenis';

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let animationFrameId = 0;

    const initLenis = () => {
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }

      const lenisInstance = new Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: isTouchDevice ? 1.8 : 1.2,
        infinite: false,
      });

      lenisRef.current = lenisInstance;
      setLenis(lenisInstance);

      function raf(time: number) {
        lenisRef.current?.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      }

      animationFrameId = requestAnimationFrame(raf);
    };

    if (document.readyState === 'complete') {
      initLenis();
    } else {
      window.addEventListener('load', initLenis);
    }

    return () => {
      window.removeEventListener('load', initLenis);
      cancelAnimationFrame(animationFrameId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
