import { useEffect, useState, type RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const { threshold = 0.3, rootMargin = '0px', triggerOnce = false } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        setIsIntersecting(intersecting);
        
        if (triggerOnce && intersecting) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [elementRef, threshold, rootMargin, triggerOnce]);

  return isIntersecting;
}
