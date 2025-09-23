import { HERO_ANIMATION_CONFIG } from '../animationConfig';

describe('Animation Config', () => {
  it('should have correct text container animation config', () => {
    expect(HERO_ANIMATION_CONFIG.textContainer).toBeDefined();
    expect(HERO_ANIMATION_CONFIG.textContainer.hidden).toEqual({ opacity: 0 });
    expect(HERO_ANIMATION_CONFIG.textContainer.show).toBeDefined();
    expect(HERO_ANIMATION_CONFIG.textContainer.show.opacity).toBe(1);
    expect(HERO_ANIMATION_CONFIG.textContainer.show.transition).toBeDefined();
  });

  it('should have correct item animation config', () => {
    expect(HERO_ANIMATION_CONFIG.item).toBeDefined();
    expect(HERO_ANIMATION_CONFIG.item.hidden).toEqual({ opacity: 0, y: 20 });
    expect(HERO_ANIMATION_CONFIG.item.show).toBeDefined();
    expect(HERO_ANIMATION_CONFIG.item.show.opacity).toBe(1);
    expect(HERO_ANIMATION_CONFIG.item.show.y).toBe(0);
    expect(HERO_ANIMATION_CONFIG.item.show.transition).toBeDefined();
    expect(HERO_ANIMATION_CONFIG.item.show.transition.duration).toBe(0.5);
  });

  it('should have correct image animation config', () => {
    expect(HERO_ANIMATION_CONFIG.image).toBeDefined();
    expect(HERO_ANIMATION_CONFIG.image.hidden).toEqual({ opacity: 0, scale: 0.8 });
    expect(HERO_ANIMATION_CONFIG.image.show).toBeDefined();
    expect(HERO_ANIMATION_CONFIG.image.show.opacity).toBe(1);
    expect(HERO_ANIMATION_CONFIG.image.show.scale).toBe(1);
    expect(HERO_ANIMATION_CONFIG.image.show.transition).toBeDefined();
    expect(HERO_ANIMATION_CONFIG.image.show.transition.duration).toBe(0.5);
    expect(HERO_ANIMATION_CONFIG.image.show.transition.ease).toBe('easeOut');
  });
});