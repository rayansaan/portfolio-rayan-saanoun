import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHoverImage } from '@/hooks/useHoverImage';

export function RouteHoverReset() {
  const location = useLocation();
  const { setCurrentImage } = useHoverImage();

  useLayoutEffect(() => {
    setCurrentImage(null);
  }, [location.key, setCurrentImage]);

  useEffect(() => {
    const clearHoverImage = () => setCurrentImage(null);
    const handleVisibilityChange = () => {
      if (document.hidden) clearHoverImage();
    };

    window.addEventListener('blur', clearHoverImage);
    window.addEventListener('pagehide', clearHoverImage);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.documentElement.addEventListener('mouseleave', clearHoverImage);

    return () => {
      window.removeEventListener('blur', clearHoverImage);
      window.removeEventListener('pagehide', clearHoverImage);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.documentElement.removeEventListener('mouseleave', clearHoverImage);
    };
  }, [setCurrentImage]);

  return null;
}
