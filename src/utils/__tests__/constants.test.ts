import * as constants from '../constants';

describe('Constants', () => {
  it('should have correct API endpoints', () => {
    expect(constants.API_ENDPOINTS).toBeDefined();
    expect(constants.API_ENDPOINTS.VISITORS).toBe('https://portfolio-util-ntv3.vercel.app/api/visitors');
  });

  it('should have correct base URLs', () => {
    expect(constants.BASE_URLS).toBeDefined();
    expect(constants.BASE_URLS.PORTFOLIO).toBe('https://azhagu-swe.github.io/portfolio');
    expect(constants.BASE_URLS.PROFILE_IMAGE).toBe('/image/profile.jpg');
    expect(constants.BASE_URLS.RESUME).toBe('/pdf/azhagu-resume.pdf');
  });

  it('should have correct social links', () => {
    expect(constants.SOCIAL_LINKS).toBeDefined();
    expect(constants.SOCIAL_LINKS.LINKEDIN).toBe('https://www.linkedin.com/in/azhagu-swe/');
    expect(constants.SOCIAL_LINKS.GITHUB).toBe('https://github.com/azhagu-swe');
    expect(constants.SOCIAL_LINKS.TWITTER).toBe('https://twitter.com/azhagu_swe');
    expect(constants.SOCIAL_LINKS.INSTAGRAM).toBe('https://instagram.com/azhagu.swe');
    expect(constants.SOCIAL_LINKS.YOUTUBE).toBe('https://www.youtube.com/channel/UCuA9qjEfLAk6hmiNPYvZEvQ');
  });

  it('should have correct animation variants', () => {
    expect(constants.ANIMATION_VARIANTS).toBeDefined();
    expect(constants.ANIMATION_VARIANTS.ITEM).toBeDefined();
    expect(constants.ANIMATION_VARIANTS.ITEM.hidden).toEqual({ opacity: 0, y: 20 });
    expect(constants.ANIMATION_VARIANTS.ITEM.visible).toBeDefined();
    
    expect(constants.ANIMATION_VARIANTS.CONTAINER).toBeDefined();
    expect(constants.ANIMATION_VARIANTS.CONTAINER.hidden).toEqual({ opacity: 0 });
    expect(constants.ANIMATION_VARIANTS.CONTAINER.show).toBeDefined();
  });

  it('should have correct common styles', () => {
    expect(constants.COMMON_STYLES).toBeDefined();
    expect(constants.COMMON_STYLES.BORDER_RADIUS).toBeDefined();
    expect(constants.COMMON_STYLES.BORDER_RADIUS.CARD).toBe('16px');
    expect(constants.COMMON_STYLES.BORDER_RADIUS.BUTTON).toBe('8px');
    expect(constants.COMMON_STYLES.BORDER_RADIUS.CIRCLE).toBe('50%');
    
    expect(constants.COMMON_STYLES.SHADOW).toBeDefined();
    expect(constants.COMMON_STYLES.SHADOW.SMALL).toBe('0 4px 10px rgba(0, 0, 0, 0.15)');
    expect(constants.COMMON_STYLES.SHADOW.MEDIUM).toBe('0 12px 20px rgba(0, 0, 0, 0.3)');
    
    expect(constants.COMMON_STYLES.TRANSITION).toBeDefined();
    expect(constants.COMMON_STYLES.TRANSITION.DURATION).toBe(0.3);
    expect(constants.COMMON_STYLES.TRANSITION.EASING).toBe('ease');
  });
});