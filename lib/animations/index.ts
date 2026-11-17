/**
 * Animation Module - Central Export
 * 
 * Exports all animation utilities, configurations, and helpers
 * for the wedding invitation application.
 * 
 * Usage:
 * ```typescript
 * import { gsap, initializeGSAP, createTimeline, paperFoldEase } from '@/lib/animations';
 * ```
 */

// GSAP configuration and instance
export { gsap, initializeGSAP, gsapDefaults } from './gsapConfig';

// Easing functions
export {
  paperFoldEase,
  sealBreakEase,
  doorOpenEase,
  pageRevealEase,
  easingConfig,
  type EasingName,
} from './easingFunctions';

// Timeline utilities
export {
  createTimeline,
  getEasing,
  cleanupTimeline,
  isRefReady,
  validateRefs,
  applyHardwareAcceleration,
  removeHardwareAcceleration,
  type TimelineConfig,
  type AnimationRefs,
} from './timelineUtils';
