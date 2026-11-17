/**
 * Timeline Utilities for GSAP Animations
 * 
 * Reusable helper functions for creating and managing GSAP timelines
 * in the wedding invitation application.
 */

import { gsap } from './gsapConfig';
import { easingConfig } from './easingFunctions';

/**
 * Timeline configuration options
 */
export interface TimelineConfig {
  paused?: boolean;
  delay?: number;
  repeat?: number;
  yoyo?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: () => void;
  onReverseComplete?: () => void;
}

/**
 * Create a GSAP timeline with default configuration
 * 
 * @param config - Timeline configuration options
 * @returns Configured GSAP timeline instance
 */
export const createTimeline = (config: TimelineConfig = {}): gsap.core.Timeline => {
  return gsap.timeline({
    paused: true, // Default to paused, allowing manual control
    ...config,
  });
};

/**
 * Animation reference objects interface
 * Used to pass DOM element refs to timeline creation functions
 */
export interface AnimationRefs {
  leftDoor?: React.RefObject<HTMLDivElement>;
  rightDoor?: React.RefObject<HTMLDivElement>;
  waxSeal?: React.RefObject<HTMLDivElement>;
  innerPage?: React.RefObject<HTMLDivElement>;
  revealButton?: React.RefObject<HTMLButtonElement>;
}

/**
 * Get easing function by name with type safety
 * 
 * @param easingName - Name of the easing function
 * @returns Easing function string compatible with GSAP
 */
export const getEasing = (easingName: keyof typeof easingConfig): string => {
  return easingConfig[easingName];
};

/**
 * Cleanup timeline and kill all active animations
 * Should be called in React cleanup effects (useEffect return function)
 * 
 * @param timeline - GSAP timeline to cleanup
 */
export const cleanupTimeline = (timeline: gsap.core.Timeline | null): void => {
  if (timeline) {
    timeline.kill();
  }
};

/**
 * Check if an element ref is valid and ready for animation
 * 
 * @param ref - React ref object
 * @returns true if ref contains a valid DOM element
 */
export const isRefReady = (ref: React.RefObject<any>): boolean => {
  return ref?.current !== null && ref?.current !== undefined;
};

/**
 * Validate all required refs are ready for animation
 * 
 * @param refs - Object containing animation refs
 * @returns true if all provided refs are valid
 */
export const validateRefs = (refs: AnimationRefs): boolean => {
  const refArray = Object.values(refs).filter(Boolean);
  return refArray.length > 0 && refArray.every(isRefReady);
};

/**
 * Apply hardware acceleration styles to an element
 * Forces GPU compositing for smooth animations
 * 
 * @param element - DOM element to optimize
 */
export const applyHardwareAcceleration = (element: HTMLElement): void => {
  element.style.willChange = 'transform, opacity';
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
};

/**
 * Remove hardware acceleration hints after animation completes
 * Reduces memory usage by releasing GPU resources
 * 
 * @param element - DOM element to cleanup
 */
export const removeHardwareAcceleration = (element: HTMLElement): void => {
  element.style.willChange = 'auto';
};
