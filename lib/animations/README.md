# Animation Utilities

This directory contains GSAP configuration, custom easing functions, and timeline utilities for the wedding invitation animations.

## Files

### `gsapConfig.ts`
Global GSAP configuration with performance optimizations:
- **force3D: true** - Enables GPU acceleration for all transforms
- **nullTargetWarn: false** - Suppresses conditional target warnings

Usage:
```typescript
import { initializeGSAP, gsap } from '@/lib/animations';

// Initialize once at app entry point
initializeGSAP();
```

### `easingFunctions.ts`
Custom easing curves for realistic paper-fold animations:

- **paperFoldEase** - `cubic-bezier(0.4, 0.0, 0.2, 1)` - Realistic paper folding motion
- **sealBreakEase** - `back.in(2)` - Dramatic wax seal breaking
- **doorOpenEase** - `power2.inOut` - Smooth gate/door opening
- **pageRevealEase** - `power2.out` - Gentle inner page reveal

Usage:
```typescript
import { doorOpenEase, sealBreakEase } from '@/lib/animations';

gsap.to(element, {
  rotateY: 120,
  duration: 2,
  ease: doorOpenEase
});
```

### `timelineUtils.ts`
Helper functions for creating and managing GSAP timelines:

**Key Functions:**
- `createTimeline(config)` - Create configured timeline instance
- `cleanupTimeline(timeline)` - Cleanup timeline on unmount
- `validateRefs(refs)` - Check if animation refs are ready
- `applyHardwareAcceleration(element)` - Force GPU compositing
- `removeHardwareAcceleration(element)` - Release GPU resources

Usage:
```typescript
import { createTimeline, cleanupTimeline, validateRefs } from '@/lib/animations';

const timeline = createTimeline({
  paused: true,
  onComplete: () => console.log('Animation complete')
});

// In React cleanup
useEffect(() => {
  return () => cleanupTimeline(timeline);
}, []);
```

### `index.ts`
Central export point for all animation utilities.

## Example: Complete Animation Setup

```typescript
'use client';

import { useEffect, useRef } from 'react';
import {
  gsap,
  initializeGSAP,
  createTimeline,
  doorOpenEase,
  sealBreakEase,
  pageRevealEase,
  cleanupTimeline,
  validateRefs
} from '@/lib/animations';

export default function AnimatedComponent() {
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const waxSealRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Initialize GSAP once
    initializeGSAP();

    // Validate refs are ready
    if (!validateRefs({ leftDoor: leftDoorRef, rightDoor: rightDoorRef, waxSeal: waxSealRef })) {
      return;
    }

    // Create master timeline
    const timeline = createTimeline({
      paused: true,
      onComplete: () => console.log('Animation complete')
    });

    // Add animations to timeline
    timeline
      .to(waxSealRef.current, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1,
        ease: sealBreakEase
      }, 0)
      .to(leftDoorRef.current, {
        rotateY: -120,
        duration: 2,
        ease: doorOpenEase
      }, 0.5)
      .to(rightDoorRef.current, {
        rotateY: 120,
        duration: 2,
        ease: doorOpenEase
      }, 0.5);

    timelineRef.current = timeline;

    // Cleanup on unmount
    return () => cleanupTimeline(timeline);
  }, []);

  const handleClick = () => {
    timelineRef.current?.play();
  };

  return (
    <div>
      <div ref={leftDoorRef}>Left Door</div>
      <div ref={rightDoorRef}>Right Door</div>
      <div ref={waxSealRef}>Wax Seal</div>
      <button onClick={handleClick}>Open Gates</button>
    </div>
  );
}
```

## Performance Considerations

1. **GPU Acceleration**: All animations use `force3D: true` to ensure GPU acceleration
2. **Hardware Acceleration**: Use `applyHardwareAcceleration()` for animated elements
3. **Cleanup**: Always cleanup timelines in React cleanup effects to prevent memory leaks
4. **Ref Validation**: Check refs are ready before creating timelines

## Requirements Mapping

This module satisfies the following requirements:
- **Requirement 5.4**: Custom easing functions for natural motion
- **Requirement 9.6**: Hardware acceleration configuration (force3D: true)
- **Requirement 10.5**: GSAP integration for professional animations
