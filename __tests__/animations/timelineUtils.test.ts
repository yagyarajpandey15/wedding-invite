/**
 * Tests for Timeline Utilities
 * 
 * Validates: Requirement 10.5 - GSAP timeline utilities
 */

import { gsap } from 'gsap';
import {
  createTimeline,
  getEasing,
  cleanupTimeline,
  isRefReady,
  validateRefs,
  applyHardwareAcceleration,
  removeHardwareAcceleration,
  type TimelineConfig,
  type AnimationRefs
} from '@/lib/animations/timelineUtils';
import { easingConfig } from '@/lib/animations/easingFunctions';

describe('Timeline Utilities', () => {
  describe('createTimeline', () => {
    it('should create a GSAP timeline', () => {
      const timeline = createTimeline();
      expect(timeline).toBeDefined();
      expect(typeof timeline.play).toBe('function');
      expect(typeof timeline.pause).toBe('function');
    });

    it('should create a paused timeline by default', () => {
      const timeline = createTimeline();
      expect(timeline.paused()).toBe(true);
    });

    it('should accept custom configuration', () => {
      const onComplete = jest.fn();
      const timeline = createTimeline({
        paused: false,
        delay: 1,
        repeat: 2,
        onComplete
      });
      
      expect(timeline).toBeDefined();
      // Timeline is created with config (can't directly verify all internal props)
    });

    it('should merge config with defaults', () => {
      const timeline = createTimeline({ delay: 0.5 });
      expect(timeline.paused()).toBe(true); // Default paused should still apply
    });
  });

  describe('getEasing', () => {
    it('should return correct easing string for valid name', () => {
      expect(getEasing('paperFold')).toBe(easingConfig.paperFold);
      expect(getEasing('sealBreak')).toBe(easingConfig.sealBreak);
      expect(getEasing('doorOpen')).toBe(easingConfig.doorOpen);
      expect(getEasing('pageReveal')).toBe(easingConfig.pageReveal);
    });

    it('should be type-safe with EasingName', () => {
      const easingName: keyof typeof easingConfig = 'doorOpen';
      const easing = getEasing(easingName);
      expect(easing).toBe('power2.inOut');
    });
  });

  describe('cleanupTimeline', () => {
    it('should kill timeline if provided', () => {
      const timeline = createTimeline();
      const killSpy = jest.spyOn(timeline, 'kill');
      
      cleanupTimeline(timeline);
      
      expect(killSpy).toHaveBeenCalled();
    });

    it('should handle null timeline gracefully', () => {
      expect(() => cleanupTimeline(null)).not.toThrow();
    });

    it('should handle undefined timeline gracefully', () => {
      expect(() => cleanupTimeline(undefined as any)).not.toThrow();
    });
  });

  describe('isRefReady', () => {
    it('should return true for valid ref with current element', () => {
      const ref = { current: document.createElement('div') };
      expect(isRefReady(ref)).toBe(true);
    });

    it('should return false for ref with null current', () => {
      const ref = { current: null };
      expect(isRefReady(ref)).toBe(false);
    });

    it('should return false for ref with undefined current', () => {
      const ref = { current: undefined };
      expect(isRefReady(ref)).toBe(false);
    });

    it('should return false for null ref', () => {
      expect(isRefReady(null as any)).toBe(false);
    });

    it('should return false for undefined ref', () => {
      expect(isRefReady(undefined as any)).toBe(false);
    });
  });

  describe('validateRefs', () => {
    it('should return true when all provided refs are valid', () => {
      const refs: AnimationRefs = {
        leftDoor: { current: document.createElement('div') },
        rightDoor: { current: document.createElement('div') }
      };
      
      expect(validateRefs(refs)).toBe(true);
    });

    it('should return false when any ref is invalid', () => {
      const refs: AnimationRefs = {
        leftDoor: { current: document.createElement('div') },
        rightDoor: { current: null }
      };
      
      expect(validateRefs(refs)).toBe(false);
    });

    it('should return false when all refs are invalid', () => {
      const refs: AnimationRefs = {
        leftDoor: { current: null },
        rightDoor: { current: null }
      };
      
      expect(validateRefs(refs)).toBe(false);
    });

    it('should handle empty refs object', () => {
      const refs: AnimationRefs = {};
      expect(validateRefs(refs)).toBe(false);
    });

    it('should ignore undefined refs in validation', () => {
      const refs: AnimationRefs = {
        leftDoor: { current: document.createElement('div') },
        rightDoor: undefined
      };
      
      expect(validateRefs(refs)).toBe(true);
    });
  });

  describe('applyHardwareAcceleration', () => {
    it('should set willChange property', () => {
      const element = document.createElement('div');
      applyHardwareAcceleration(element);
      
      expect(element.style.willChange).toBe('transform, opacity');
    });

    it('should set transform for GPU acceleration', () => {
      const element = document.createElement('div');
      applyHardwareAcceleration(element);
      
      expect(element.style.transform).toBe('translateZ(0)');
    });

    it('should set backfaceVisibility to hidden', () => {
      const element = document.createElement('div');
      applyHardwareAcceleration(element);
      
      expect(element.style.backfaceVisibility).toBe('hidden');
    });

    it('should apply all optimizations together', () => {
      const element = document.createElement('div');
      applyHardwareAcceleration(element);
      
      expect(element.style.willChange).toBe('transform, opacity');
      expect(element.style.transform).toBe('translateZ(0)');
      expect(element.style.backfaceVisibility).toBe('hidden');
    });
  });

  describe('removeHardwareAcceleration', () => {
    it('should reset willChange to auto', () => {
      const element = document.createElement('div');
      element.style.willChange = 'transform, opacity';
      
      removeHardwareAcceleration(element);
      
      expect(element.style.willChange).toBe('auto');
    });

    it('should work on element without prior acceleration', () => {
      const element = document.createElement('div');
      
      expect(() => removeHardwareAcceleration(element)).not.toThrow();
      expect(element.style.willChange).toBe('auto');
    });
  });

  describe('Type definitions', () => {
    it('should support TimelineConfig type', () => {
      const config: TimelineConfig = {
        paused: true,
        delay: 1,
        repeat: -1,
        yoyo: true,
        onComplete: () => {},
        onStart: () => {},
        onUpdate: () => {},
        onReverseComplete: () => {}
      };
      
      expect(config).toBeDefined();
    });

    it('should support AnimationRefs type', () => {
      const refs: AnimationRefs = {
        leftDoor: { current: null },
        rightDoor: { current: null },
        waxSeal: { current: null },
        innerPage: { current: null },
        revealButton: { current: null }
      };
      
      expect(refs).toBeDefined();
    });

    it('should allow partial AnimationRefs', () => {
      const refs: AnimationRefs = {
        leftDoor: { current: null }
      };
      
      expect(refs).toBeDefined();
      expect(refs.leftDoor).toBeDefined();
      expect(refs.rightDoor).toBeUndefined();
    });
  });
});
