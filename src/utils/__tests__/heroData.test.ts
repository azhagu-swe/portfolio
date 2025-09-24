import { HERO_DATA, ANIMATION_CONFIG } from '../heroData';

describe('Hero Data', () => {
  it('should have correct hero data structure', () => {
    expect(HERO_DATA).toBeDefined();
    expect(HERO_DATA.name).toBe('Alagappan P');
    expect(HERO_DATA.title).toBe('Software Developer | Full Stack Engineer');
    expect(HERO_DATA.roles).toBeDefined();
    expect(Array.isArray(HERO_DATA.roles)).toBe(true);
    expect(HERO_DATA.roles.length).toBeGreaterThan(0);
    expect(HERO_DATA.description).toBeDefined();
    expect(typeof HERO_DATA.description).toBe('string');
    expect(HERO_DATA.buttons).toBeDefined();
    expect(HERO_DATA.buttons.hire).toBe("Let's Connect");
    expect(HERO_DATA.buttons.resume).toBe('Get My Resume');
    expect(HERO_DATA.images).toBeDefined();
    expect(HERO_DATA.images.profile).toBe('/image/profile.png');
    expect(HERO_DATA.images.resume).toBe('/pdf/azhagu-resume.pdf');
  });

  it('should have correct animation config', () => {
    expect(ANIMATION_CONFIG).toBeDefined();
    expect(ANIMATION_CONFIG.text).toBeDefined();
    expect(ANIMATION_CONFIG.text.initial).toEqual({ opacity: 0, y: 20 });
    expect(ANIMATION_CONFIG.text.animate).toEqual({ opacity: 1, y: 0 });
    expect(ANIMATION_CONFIG.text.transition).toEqual({ duration: 0.8 });
    
    expect(ANIMATION_CONFIG.image).toBeDefined();
    expect(ANIMATION_CONFIG.image.initial).toEqual({ scale: 0.9, opacity: 0 });
    expect(ANIMATION_CONFIG.image.animate).toEqual({ scale: 1, opacity: 1 });
    expect(ANIMATION_CONFIG.image.transition).toEqual({ duration: 0.8 });
    
    expect(ANIMATION_CONFIG.button).toBeDefined();
    expect(ANIMATION_CONFIG.button.whileHover).toEqual({ scale: 1.05 });
    expect(ANIMATION_CONFIG.button.whileTap).toEqual({ scale: 0.95 });
  });
});