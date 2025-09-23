// src/utils/index.ts
export * from './errorHandler';
export * from './animationConfig';
export * from './contactData';
export * from './drawerData';
export * from './experienceData';
export * from './heroData';
export * from './skillData';
export * from './touchUtils';

// Export specific items to avoid naming conflicts
export { PROFILE } from './aboutData';

// Export specific constants to avoid naming conflicts
export { API_ENDPOINTS, BASE_URLS, ANIMATION_VARIANTS, COMMON_STYLES } from './constants';

// Export social links with a different name to avoid conflict
export { SOCIAL_LINKS as SOCIAL_LINKS_ARRAY } from './socialLinks';