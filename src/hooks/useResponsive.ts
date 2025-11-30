import { useMediaQuery } from './use-media-query';

/**
 * Hook to get responsive breakpoints
 * @returns Object with breakpoint boolean values
 */
export const useResponsive = () => {
  // Tailwind Breakpoints
  // sm: 640px
  // md: 768px
  // lg: 1024px
  // xl: 1280px

  const isXs = useMediaQuery('(max-width: 639px)');
  const isSm = useMediaQuery('(min-width: 640px) and (max-width: 767px)');
  const isMd = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isLg = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)');
  const isXl = useMediaQuery('(min-width: 1280px)');

  // Combined breakpoints
  const isMobile = useMediaQuery('(max-width: 767px)'); // sm and below (MUI 'sm' is 600, Tailwind 'md' is 768. Adjusting to match common mobile definition < 768)
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isLargeScreen = useMediaQuery('(min-width: 1280px)');

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen
  };
};