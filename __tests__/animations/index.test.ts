/**
 * Tests for Animation Module Index
 * 
 * Validates that all exports are available from the main index file
 */

import * as animations from '@/lib/animations';

describe('Animation Module Exports', () => {
  describe('GSAP exports', () => {
    it('should export gsap instance', () => {
      expect(animations.gsap).toBeDefined();
      expect(typeof animations.gsap.to).toBe('function');
    });

    it('should export initializeGSAP function', () => {
      expect(animations.initializeGSAP).toBeDefined();
      expect(typeof animations.initializeGSAP).toBe('function');
    });

    it('should export gsapDefaults', () => {
      expect(animations.gsapDefaults).toBeDefined();
      expect(animations.gsapDefaults.force3D).toBe(true);
    });
  });

  describe('Easing function exports', () => {
    it('should export individual easing constants', () => {
      expect(animations.paperFoldEase).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)');
      expect(animations.sealBreakEase).toBe('back.in(2)');
      expect(animations.doorOpenEase).toBe('power2.inOut');
      expect(animations.pageRevealEase).toBe('power2.out');
    });

    it('should export easingConfig object', () => {
      expect(animations.easingConfig).toBeDefined();
      expect(animations.easingConfig.paperFold).toBe(animations.paperFoldEase);
      expect(animations.easingConfig.sealBreak).toBe(animations.sealBreakEase);
      expect(animations.easingConfig.doorOpen).toBe(animations.doorOpenEase);
      expect(animations.easingConfig.pageReveal).toBe(animations.pageRevealEase);
    });
  });

  describe('Timeline utility exports', () => {
    it('should export createTimeline function', () => {
      expect(animations.createTimeline).toBeDefined();
      expect(typeof animations.createTimeline).toBe('function');
    });

    it('should export getEasing function', () => {
      expect(animations.getEasing).toBeDefined();
      expect(typeof animations.getEasing).toBe('function');
    });

    it('should export cleanupTimeline function', () => {
      expect(animations.cleanupTimeline).toBeDefined();
      expect(typeof animations.cleanupTimeline).toBe('function');
    });

    it('should export isRefReady function', () => {
      expect(animations.isRefReady).toBeDefined();
      expect(typeof animations.isRefReady).toBe('function');
    });

    it('should export validateRefs function', () => {
      expect(animations.validateRefs).toBeDefined();
      expect(typeof animations.validateRefs).toBe('function');
    });

    it('should export applyHardwareAcceleration function', () => {
      expect(animations.applyHardwareAcceleration).toBeDefined();
      expect(typeof animations.applyHardwareAcceleration).toBe('function');
    });

    it('should export removeHardwareAcceleration function', () => {
      expect(animations.removeHardwareAcceleration).toBeDefined();
      expect(typeof animations.removeHardwareAcceleration).toBe('function');
    });
  });

  describe('Module completeness', () => {
    it('should have all expected exports', () => {
      const expectedExports = [
        'gsap',
        'initializeGSAP',
        'gsapDefaults',
        'paperFoldEase',
        'sealBreakEase',
        'doorOpenEase',
        'pageRevealEase',
        'easingConfig',
        'createTimeline',
        'getEasing',
        'cleanupTimeline',
        'isRefReady',
        'validateRefs',
        'applyHardwareAcceleration',
        'removeHardwareAcceleration'
      ];

      expectedExports.forEach(exportName => {
        expect(animations).toHaveProperty(exportName);
      });
    });
  });

  describe('Usage example validation', () => {
    it('should support common usage patterns', () => {
      // Initialize GSAP
      expect(() => animations.initializeGSAP()).not.toThrow();

      // Create timeline
      const timeline = animations.createTimeline({ paused: true });
      expect(timeline).toBeDefined();

      // Get easing
      const easing = animations.getEasing('doorOpen');
      expect(easing).toBe('power2.inOut');

      // Cleanup
      expect(() => animations.cleanupTimeline(timeline)).not.toThrow();
    });

    it('should allow importing specific items', () => {
      // This test validates the module structure supports tree-shaking
      const { gsap, createTimeline, doorOpenEase } = animations;
      
      expect(gsap).toBeDefined();
      expect(createTimeline).toBeDefined();
      expect(doorOpenEase).toBeDefined();
    });
  });
});
