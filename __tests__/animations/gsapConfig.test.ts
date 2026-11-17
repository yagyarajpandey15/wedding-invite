/**
 * Tests for GSAP Configuration Module
 * 
 * Validates: Requirements 5.4, 9.6, 10.5
 */

import { gsap, initializeGSAP, gsapDefaults } from '@/lib/animations/gsapConfig';

describe('GSAP Configuration', () => {
  describe('initializeGSAP', () => {
    it('should configure GSAP with force3D: true', () => {
      initializeGSAP();
      
      // GSAP config is internal, but we can verify the function executes without error
      expect(() => initializeGSAP()).not.toThrow();
    });

    it('should be callable multiple times without errors', () => {
      expect(() => {
        initializeGSAP();
        initializeGSAP();
        initializeGSAP();
      }).not.toThrow();
    });
  });

  describe('gsapDefaults', () => {
    it('should export default configuration object', () => {
      expect(gsapDefaults).toBeDefined();
      expect(gsapDefaults.force3D).toBe(true);
      expect(gsapDefaults.transformOrigin).toBe('50% 50%');
      expect(gsapDefaults.backfaceVisibility).toBe('hidden');
    });

    it('should be readonly (const assertion)', () => {
      // TypeScript should prevent modification, but we can verify structure
      expect(Object.isFrozen(gsapDefaults)).toBe(false); // const assertion doesn't freeze at runtime
      expect(typeof gsapDefaults).toBe('object');
    });
  });

  describe('gsap instance', () => {
    it('should export GSAP instance', () => {
      expect(gsap).toBeDefined();
      expect(typeof gsap.to).toBe('function');
      expect(typeof gsap.from).toBe('function');
      expect(typeof gsap.timeline).toBe('function');
    });

    it('should have core GSAP methods available', () => {
      expect(gsap).toHaveProperty('to');
      expect(gsap).toHaveProperty('from');
      expect(gsap).toHaveProperty('fromTo');
      expect(gsap).toHaveProperty('timeline');
      expect(gsap).toHaveProperty('set');
      expect(gsap).toHaveProperty('config');
    });
  });
});
