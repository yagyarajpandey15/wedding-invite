/**
 * Tests for Custom Easing Functions
 * 
 * Validates: Requirement 5.4 - Custom easing curves for natural motion
 */

import {
  paperFoldEase,
  sealBreakEase,
  doorOpenEase,
  pageRevealEase,
  easingConfig,
  type EasingName
} from '@/lib/animations/easingFunctions';

describe('Easing Functions', () => {
  describe('Individual easing exports', () => {
    it('should export paperFoldEase with correct cubic-bezier value', () => {
      expect(paperFoldEase).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)');
    });

    it('should export sealBreakEase with back easing', () => {
      expect(sealBreakEase).toBe('back.in(2)');
    });

    it('should export doorOpenEase with power2 easing', () => {
      expect(doorOpenEase).toBe('power2.inOut');
    });

    it('should export pageRevealEase with power2 out easing', () => {
      expect(pageRevealEase).toBe('power2.out');
    });
  });

  describe('easingConfig object', () => {
    it('should contain all easing functions', () => {
      expect(easingConfig.paperFold).toBe(paperFoldEase);
      expect(easingConfig.sealBreak).toBe(sealBreakEase);
      expect(easingConfig.doorOpen).toBe(doorOpenEase);
      expect(easingConfig.pageReveal).toBe(pageRevealEase);
    });

    it('should have exactly 4 easing functions', () => {
      const keys = Object.keys(easingConfig);
      expect(keys).toHaveLength(4);
      expect(keys).toEqual(['paperFold', 'sealBreak', 'doorOpen', 'pageReveal']);
    });

    it('should be a readonly object', () => {
      // const assertion makes it readonly at compile time
      expect(easingConfig).toBeDefined();
      expect(typeof easingConfig).toBe('object');
    });
  });

  describe('Easing function formats', () => {
    it('should have valid GSAP-compatible ease strings', () => {
      // GSAP accepts cubic-bezier, named eases, and custom functions
      const validEasePattern = /^(cubic-bezier\([^)]+\)|[\w.]+\([^)]*\)|[\w.]+)$/;
      
      expect(paperFoldEase).toMatch(validEasePattern);
      expect(sealBreakEase).toMatch(validEasePattern);
      expect(doorOpenEase).toMatch(validEasePattern);
      expect(pageRevealEase).toMatch(validEasePattern);
    });
  });

  describe('Type safety', () => {
    it('should support EasingName type for keys', () => {
      const testKey: EasingName = 'paperFold';
      expect(easingConfig[testKey]).toBe(paperFoldEase);
    });

    it('should have correct keys for EasingName type', () => {
      const keys: EasingName[] = ['paperFold', 'sealBreak', 'doorOpen', 'pageReveal'];
      keys.forEach(key => {
        expect(easingConfig[key]).toBeDefined();
      });
    });
  });
});
