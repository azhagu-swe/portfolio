import { useState, useEffect, RefObject } from 'react';

interface UseParallaxOptions {
  speed?: number;
  throttleMs?: number;
}

/**
 * Custom hook that calculates parallax effect based on scroll position
 * @param ref - Reference to the element to apply parallax to
 * @param options - Parallax options
 * @returns Scroll position value for the parallax effect
 */
export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
): number => {
  const [scrollY, setScrollY] = useState(0);
  const { speed = 0.5, throttleMs = 16 } = options; // Default to ~60fps

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use throttling to improve performance
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  // Calculate parallax value based on scroll and speed
  return -(scrollY * speed);
};