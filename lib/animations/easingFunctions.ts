/**
 * Custom Easing Functions for Wedding Invitation Animations
 * 
 * These easing curves create natural, paper-like motion for the gate opening sequence.
 * All easing functions are compatible with GSAP's ease parameter.
 */

/**
 * paperFoldEase - Realistic paper folding motion
 * Cubic bezier curve simulating the physics of folding thick paper stock
 */
export const paperFoldEase = 'cubic-bezier(0.4, 0.0, 0.2, 1)';

/**
 * sealBreakEase - Dramatic wax seal breaking
 * Back easing creates a slight anticipation before the seal snaps away
 */
export const sealBreakEase = 'back.in(2)';

/**
 * doorOpenEase - Smooth gate/door opening motion
 * Power2 easing provides smooth acceleration and deceleration
 */
export const doorOpenEase = 'power2.inOut';

/**
 * pageRevealEase - Gentle inner page reveal
 * Power2 out creates a soft, decelerating entrance
 */
export const pageRevealEase = 'power2.out';

/**
 * Easing configuration object for type-safe access
 */
export const easingConfig = {
  paperFold: paperFoldEase,
  sealBreak: sealBreakEase,
  doorOpen: doorOpenEase,
  pageReveal: pageRevealEase,
} as const;

/**
 * Type helper for easing function names
 */
export type EasingName = keyof typeof easingConfig;
