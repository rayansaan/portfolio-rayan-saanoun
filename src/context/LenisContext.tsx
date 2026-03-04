import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

type LenisContextType = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({ lenis: null });

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const initLenis = () => {
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }

      lenisRef.current = new Lenis({
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: isTouchDevice ? 1.8 : 1.2,
        infinite: false,
      });

      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      console.log('Lenis initialized');
    };

    if (document.readyState === 'complete') {
      initLenis();
    } else {
      window.addEventListener('load', initLenis);
    }

    return () => {
      window.removeEventListener('load', initLenis);
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
