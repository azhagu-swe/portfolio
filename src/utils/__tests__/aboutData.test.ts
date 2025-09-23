import { PROFILE, SKILLS_DATA, CERTIFICATIONS_DATA, ACHIEVEMENTS_DATA, PARTICIPATIONS_DATA } from '../aboutData';

describe('AboutData', () => {
  it('should have correct PROFILE structure', () => {
    const profile = PROFILE('/test-base-path');
    expect(profile).toBeDefined();
    expect(profile.name).toBe('Alagappan P');
    expect(profile.role).toBe('Software Developer | Full Stack Engineer');
    expect(profile.intro).toBeDefined();
    expect(typeof profile.intro).toBe('string');
    expect(profile.avatar).toBe('/test-base-path/image/profile.jpg');
  });

  it('should have SKILLS_DATA array', () => {
    expect(SKILLS_DATA).toBeDefined();
    expect(Array.isArray(SKILLS_DATA)).toBe(true);
    expect(SKILLS_DATA.length).toBeGreaterThan(0);
    
    // Check first skill entry
    const firstSkill = SKILLS_DATA[0];
    expect(firstSkill).toBeDefined();
    expect(firstSkill.title).toBeDefined();
    expect(firstSkill.skills).toBeDefined();
  });

  it('should have CERTIFICATIONS_DATA function', () => {
    const certifications = CERTIFICATIONS_DATA('/test-base-path');
    expect(certifications).toBeDefined();
    expect(Array.isArray(certifications)).toBe(true);
    expect(certifications.length).toBeGreaterThan(0);
    
    // Check first certification entry
    const firstCert = certifications[0];
    expect(firstCert).toBeDefined();
    expect(firstCert.description).toBeDefined();
    expect(firstCert.img).toBe('/test-base-path/image/Java-Full-Stack-skillup.png');
  });

  it('should have ACHIEVEMENTS_DATA function', () => {
    const achievements = ACHIEVEMENTS_DATA('/test-base-path');
    expect(achievements).toBeDefined();
    expect(Array.isArray(achievements)).toBe(true);
    
    // Check first achievement entry
    const firstAchievement = achievements[0];
    expect(firstAchievement).toBeDefined();
    expect(firstAchievement.description).toBeDefined();
    expect(firstAchievement.img).toBe('/test-base-path/image/Debuggin-2nd-Prize.jpg');
  });

  it('should have PARTICIPATIONS_DATA function', () => {
    const participations = PARTICIPATIONS_DATA('/test-base-path');
    expect(participations).toBeDefined();
    expect(Array.isArray(participations)).toBe(true);
    expect(participations.length).toBeGreaterThan(0);
    
    // Check first participation entry
    const firstParticipation = participations[0];
    expect(firstParticipation).toBeDefined();
    expect(firstParticipation.description).toBeDefined();
    expect(firstParticipation.img).toBe('/test-base-path/image/AnnaUniversity-2.jpg');
  });
});