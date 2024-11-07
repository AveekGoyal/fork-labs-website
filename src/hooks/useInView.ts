import { useEffect, useState, RefObject } from 'react';

/**
 * Hook to detect when an element enters the viewport
 * @param ref Reference to the element to observe
 * @param threshold Optional threshold value between 0 and 1
 * @returns boolean indicating if the element is in view
 */
export const useInView = (ref: RefObject<HTMLElement>, threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return isVisible;
};