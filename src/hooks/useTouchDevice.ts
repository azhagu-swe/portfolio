import { useState, useEffect } from 'react';

/**
 * Hook to detect if the device is a touch device
 * @returns boolean indicating if the device is a touch device
 */
export const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Check for touch events support
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Additional check for touch capability
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      
      setIsTouchDevice(hasTouch || hasCoarsePointer);
    }
  }, []);

  return isTouchDevice;
};