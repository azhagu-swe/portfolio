/**
 * Utility functions for touch-friendly interactions
 */

/**
 * Get appropriate touch target size based on element type
 * @param elementType - Type of element (button, link, etc.)
 * @returns Minimum touch target size in pixels
 */
export const getTouchTargetSize = (elementType: string): number => {
  switch (elementType) {
    case 'button':
    case 'link':
      return 44; // WCAG 2.1 minimum
    case 'chip':
    case 'icon':
      return 32; // Minimum acceptable
    default:
      return 44;
  }
};

/**
 * Check if an element meets minimum touch target requirements
 * @param element - DOM element to check
 * @returns Boolean indicating if element meets touch target size
 */
export const isTouchTargetValid = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const minWidth = getTouchTargetSize(element.tagName.toLowerCase());
  return rect.width >= minWidth && rect.height >= minWidth;
};

/**
 * Add touch-friendly styles to elements
 * @param styles - Base styles object
 * @param isTouchDevice - Whether device is touch-enabled
 * @returns Enhanced styles with touch considerations
 */
export const withTouchStyles = (styles: any, isTouchDevice: boolean) => {
  if (!isTouchDevice) return styles;
  
  return {
    ...styles,
    // Add touch-specific enhancements
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.1)',
    touchAction: 'manipulation',
    // Remove hover effects on touch devices to prevent double-tap issues
    '@media (hover: hover)': {
      ...styles['@media (hover: hover)'],
    }
  };
};