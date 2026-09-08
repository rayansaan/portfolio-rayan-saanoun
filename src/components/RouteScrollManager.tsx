import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '@/hooks/useLenis';

export function RouteScrollManager() {
  const location = useLocation();
  const { lenis } = useLenis();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const scrollToRoutePosition = () => {
      const targetId = decodeURIComponent(location.hash.slice(1));
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        if (lenis) lenis.scrollTo(target, { immediate: true });
        else target.scrollIntoView({ block: 'start' });
        return;
      }

      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    scrollToRoutePosition();
    const animationFrameId = window.requestAnimationFrame(scrollToRoutePosition);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [location.key, location.hash, lenis]);

  return null;
}
