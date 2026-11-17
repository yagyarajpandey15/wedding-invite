/**
 * GSAP Configuration for Wedding Invitation
 * 
 * Global GSAP settings optimized for 60 FPS performance on mobile devices.
 * This module should be imported once at the application entry point.
 */

import { gsap } from 'gsap';

/**
 * Initialize GSAP with performance-optimized settings
 * 
 * Configuration:
 * - force3D: true - Forces GPU acceleration for all transforms
 * - nullTargetWarn: false - Suppresses warnings for conditional targets
 */
export const initializeGSAP = (): void => {
  gsap.config({
    force3D: true,           // Force GPU acceleration for transform animations
    nullTargetWarn: false,   // Suppress conditional target warnings
  });
};

/**
 * GSAP defaults for all animations
 * 
 * These defaults ensure consistent performance across all animations:
 * - Hardware acceleration enabled
 * - Backface visibility hidden to prevent flickering
 * - Transform origin centered for 3D rotations
 */
export const gsapDefaults = {
  force3D: true,
  transformOrigin: '50% 50%',
  backfaceVisibility: 'hidden',
} as const;

/**
 * Export configured GSAP instance
 */
export { gsap };
