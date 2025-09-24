import { useState, useEffect, RefObject } from 'react';

interface UseOnScreenOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Custom hook that tracks when an element comes into view
 * @param ref - Reference to the element to observe
 * @param options - Intersection Observer options
 * @returns Boolean indicating if the element is visible
 */
export const useOnScreen = (
  ref: RefObject<Element>,
  options: UseOnScreenOptions = {}
): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    // Default options for Intersection Observer
    const defaultOptions: UseOnScreenOptions = {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.1, // Trigger when 10% of element is visible
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, defaultOptions);

    // Start observing the element
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};