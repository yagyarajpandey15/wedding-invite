# Implementation Plan: Luxury Wedding Invitation

## Overview

This implementation plan breaks down the luxury wedding invitation feature into discrete coding tasks following a phased approach. The implementation uses Next.js 15 with TypeScript, GSAP for animations, Framer Motion for interactions, and Tailwind CSS for styling. Each phase builds incrementally, ensuring the application remains functional and testable at every step.

## Tasks

### Phase 1: Core Structure and Static Layout

- [x] 1. Set up Next.js 15 project with TypeScript and dependencies
  - Initialize Next.js 15 project with TypeScript
  - Install core dependencies: tailwindcss, gsap, framer-motion, lottie-react
  - Install dev dependencies: @testing-library/react, @playwright/test, jest, jest-environment-jsdom
  - Configure package.json scripts for dev, build, test, and e2e
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 2. Configure Tailwind CSS with custom theme
  - Create tailwind.config.ts with sage green and gold color palettes
  - Define custom color variables (sage: #A8B5A2, gold: #D4AF37)
  - Configure responsive breakpoints (xs: 320px, sm: 640px, md: 768px, lg: 1024px)
  - Configure custom perspective utilities (1000px, 1500px, 2000px)
  - Set up font families for Playfair Display (serif) and Montserrat (sans)
  - Create app/globals.css with Tailwind imports
  - _Requirements: 1.1, 8.8, 10.4_

- [x] 3. Create root layout with font configuration
  - Create app/layout.tsx with Next.js metadata
  - Configure Playfair Display font with weights 400, 700 and fallback to Georgia
  - Configure Montserrat font with weights 300, 400, 600 and fallback to Arial
  - Enable font preloading and adjustFontFallback to minimize layout shift
  - Apply global font CSS variables
  - Add semantic HTML structure
  - _Requirements: 10.1, 10.2, 9.8, 12.7_

- [x] 4. Create main page component structure
  - Create app/page.tsx as Server Component
  - Pass static data (couple names "Sakshi and Jayum", occasion "Engagement Ceremony")
  - Set up basic layout structure
  - _Requirements: 10.1, 10.2, 6.1, 6.2_

- [ ] 5. Implement GateContainer component with 3D perspective
  - Create components/OpeningGate/GateContainer.tsx
  - Apply perspective styling (2000px on desktop, 1500px on mobile)
  - Set up perspectiveOrigin at 50% 50% for centered vanishing point
  - Add sage green background color (#A8B5A2)
  - Implement full viewport height and width
  - Add overflow hidden to contain 3D elements
  - _Requirements: 1.1, 2.7, 8.1, 8.2, 8.3, 11.7_

- [ ] 6. Implement LeftDoor and RightDoor components
  - [ ] 6.1 Create components/OpeningGate/LeftDoor.tsx with forwarded ref
    - Position absolutely with transform origin at left center edge
    - Set dimensions: width 50vw (40vw on lg), height 90vh (85vh on md)
    - Apply sage green background with subtle gradient
    - Add rounded borders and shadow for depth
    - Apply transformStyle preserve-3d for 3D transforms
    - Include data-testid attribute for testing
    - _Requirements: 2.1, 2.5, 2.7, 8.4_
  
  - [ ] 6.2 Create components/OpeningGate/RightDoor.tsx with forwarded ref
    - Mirror LeftDoor structure with transform origin at right center edge
    - Apply same styling and dimensions as LeftDoor
    - Position to meet at center vertical line when closed
    - Include data-testid attribute for testing
    - _Requirements: 2.1, 2.5, 2.6, 8.4_

- [ ] 7. Create FloralLayer SVG component
  - Create components/OpeningGate/FloralLayer.tsx accepting position prop (left/right)
  - Define SVG viewBox (0 0 400 800) for consistent scaling
  - Create defs section for filters and gradients
  - Add embossed filter with feGaussianBlur, feOffset, feSpecularLighting
  - Create gold foil linear gradient (#C9A860, #F9E79F, #D4AF37)
  - Draw botanical elements: lilies, roses, eucalyptus leaves, vines using path and circle
  - Apply gold foil gradient and emboss filter to floral elements
  - Position layer absolutely with translateZ(20px) for depth
  - Add drop-shadow filter for enhanced 3D effect
  - _Requirements: 1.2, 1.3, 2.2, 2.3, 2.4, 11.1, 11.2, 11.3, 11.4_

- [ ] 8. Implement WaxSeal component
  - Create components/OpeningGate/WaxSeal.tsx with forwarded ref
  - Accept initials prop ("S J")
  - Position absolutely at center (top: 50%, left: 50%, translate -50% -50%)
  - Create circular element with responsive sizing (100px mobile to 140px desktop)
  - Apply sage green color (#8A9A82) with darker shade
  - Add embossed texture using box-shadow (inset for highlight, outer for depth)
  - Render initials text in center with elegant typography
  - Set z-index: 10 to appear above door panels
  - Include data-testid attribute for testing
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 8.5_

- [ ] 9. Create InnerPage component with content
  - [ ] 9.1 Create components/InvitationPage/InnerPage.tsx with forwarded ref
    - Position absolutely at center with transform translate(-50%, -50%)
    - Set dimensions: width 85vw (max 600px), height 85vh (max 800px)
    - Apply white background with rounded corners (12px)
    - Add padding responsive to viewport (2rem mobile to 3rem desktop)
    - Apply box-shadow for elevated paper effect
    - Set initial opacity: 0 and scale: 0.9 for reveal animation
    - Set z-index: 5 (behind doors, above background)
    - Include data-testid attribute for testing
    - _Requirements: 1.4, 6.3, 8.1, 8.2, 8.3_
  
  - [ ] 9.2 Create components/InvitationPage/CoupleNames.tsx
    - Accept names prop (string)
    - Render h1 element with Playfair Display font
    - Apply responsive text sizing (3xl mobile to 6xl desktop)
    - Use sage-800 color with center alignment
    - Add tracking-wide for elegant letter spacing
    - _Requirements: 6.1, 6.4, 6.5, 12.4_

  - [ ] 9.3 Create components/InvitationPage/EventDetails.tsx
    - Accept occasion prop (string)
    - Render paragraph element with Montserrat font
    - Apply responsive text sizing (xl mobile to 2xl desktop)
    - Use sage-600 color with center alignment
    - Add tracking-wider and uppercase styling
    - _Requirements: 6.2, 6.4, 6.5, 6.7_

- [ ] 10. Checkpoint - Verify static layout across viewports
  - Test on mobile viewport (375x667)
  - Test on tablet viewport (768x1024)
  - Test on desktop viewport (1920x1080)
  - Verify all components render with correct positioning
  - Verify text is readable and properly sized
  - Verify gate panels meet at center line
  - Ensure all tests pass, ask the user if questions arise.

### Phase 2: Animation Foundation

- [x] 11. Set up GSAP configuration and timeline utilities
  - Configure GSAP with force3D: true for GPU acceleration
  - Set nullTargetWarn: false to suppress conditional target warnings
  - Create lib/animations/easingFunctions.ts with custom easing curves
  - Define paperFoldEase, sealBreakEase, doorOpenEase, pageRevealEase
  - Export easing constants for reuse across components
  - _Requirements: 5.4, 9.6, 10.5_

- [ ] 12. Create master GSAP timeline function
  - Create lib/animations/masterTimeline.ts
  - Export createMasterTimeline function accepting AnimationRefs interface
  - Create timeline with paused: true initial state
  - Add onComplete callback parameter
  - Implement wax seal break animation (0s-1s): scale to 0, rotate 180deg, opacity 0
  - Implement reveal button fade (0s-0.5s): opacity 0, y translate 20px
  - Implement left door opening (0.5s-2.5s): rotateY -120deg with power2.inOut easing
  - Implement right door opening (0.5s-2.5s): rotateY 120deg with power2.inOut easing
  - Implement inner page reveal (1.5s-3s): opacity 1, scale 1 with power2.out easing
  - Return configured timeline instance
  - _Requirements: 5.1, 5.2, 5.5, 5.6, 5.7, 5.8, 5.9_

- [ ] 13. Create RevealButton component with Framer Motion
  - Create components/RevealButton.tsx with forwarded ref
  - Accept onClick and disabled props
  - Use Framer Motion's motion.button component
  - Implement initial state: opacity 0, scale 0.8
  - Implement animate state: opacity 1, scale 1 (or 0 if disabled)
  - Add whileHover animation: scale 1.1
  - Add whileTap animation: scale 0.95
  - Implement pulsing text animation (opacity 0.5 to 1, infinite loop)
  - Position fixed at bottom center (bottom-24 mobile to bottom-32 desktop)
  - Style with white/90 background, backdrop-blur, rounded-full
  - Apply sage-700 text color with serif font
  - Set minimum touch target size (140px wide, 44px tall)
  - Add ARIA label: "Tap to reveal invitation details"
  - Apply touchAction: manipulation to prevent double-tap zoom
  - Remove WebkitTapHighlightColor on iOS
  - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.7, 8.6, 12.1, 12.2_

- [ ] 14. Implement InvitationWrapper orchestration component
  - Create components/InvitationWrapper.tsx as client component
  - Define InvitationState interface with isReady, isAnimating, isRevealed states
  - Initialize state with useState hooks
  - Create refs for all animated elements (leftDoor, rightDoor, waxSeal, innerPage, revealButton)
  - Implement useEffect to initialize GSAP timeline on mount with refs
  - Store timeline instance in useRef
  - Implement triggerOpen function to check state and call timeline.play()
  - Update state to isAnimating: true when animation starts
  - Set onComplete callback to update state to isRevealed: true, isAnimating: false
  - Implement cleanup useEffect to kill timeline on unmount
  - Pass refs to child components (LeftDoor, RightDoor, WaxSeal, InnerPage, RevealButton)
  - Pass triggerOpen to RevealButton as onClick handler
  - Pass disabled={isAnimating || isRevealed} to RevealButton
  - Render GateContainer with all child components
  - _Requirements: 4.3, 4.6, 5.1, 5.2, 5.9, 10.1, 10.2_

- [ ] 15. Wire InvitationWrapper into main page
  - Update app/page.tsx to import and render InvitationWrapper
  - Pass couple names and occasion as props through the component tree
  - Verify all components receive correct data
  - _Requirements: 6.1, 6.2, 10.1_

- [ ] 16. Test gate opening animation
  - [ ]* 16.1 Write unit tests for InvitationWrapper component
    - Test initial closed state renders correctly
    - Test reveal button is visible initially
    - Test inner page is hidden initially (opacity 0)
    - Test all door components render with correct data-testid
    - Test ARIA labels are present on interactive elements
    - _Requirements: 4.1, 6.1, 6.2, 12.1_
  
  - [ ]* 16.2 Write interaction tests for reveal button
    - Test button click triggers animation
    - Test button fades out after click
    - Test button is disabled during animation
    - Test button prevents multiple clicks
    - Test keyboard accessibility (Enter and Space keys)
    - Test button has focus indicator
    - _Requirements: 4.3, 4.4, 4.5, 12.2_
  
  - Manually test animation runs at 60 FPS on mobile device
  - Manually test doors open smoothly in 2-3 seconds
  - Manually test wax seal breaks dramatically
  - Manually test inner page reveals gracefully

- [ ] 17. Checkpoint - Verify animation functionality
  - Test animation on mobile, tablet, and desktop viewports
  - Verify animation timing matches design specifications
  - Verify no visual glitches or jank during animation
  - Check that all animated elements have will-change CSS applied
  - Ensure all tests pass, ask the user if questions arise.

### Phase 3: Visual Polish and Effects

- [ ] 18. Optimize SVG floral decorations with filters
  - Update FloralLayer component to include shimmer gradient animation
  - Add linearGradient with id="shimmer" and animateTransform element
  - Apply shimmer gradient as stroke to floral paths
  - Animate gradient transform from -1 to 1 over 3 seconds, infinite loop
  - Adjust emboss filter parameters for optimal depth effect
  - Tune feSpecularLighting with surfaceScale: 5, specularConstant: 0.75
  - Set fePointLight position at x: -5000, y: -10000, z: 20000 for realistic lighting
  - _Requirements: 1.2, 1.6, 2.3, 11.3_

- [ ] 19. Enhance gate panels with depth effects
  - Add soft shadows to LeftDoor and RightDoor components
  - Apply box-shadow: 10px 0 30px rgba(0,0,0,0.3) for left door
  - Apply box-shadow: -10px 0 30px rgba(0,0,0,0.3) for right door
  - Add subtle gradient overlay to door base for cinematic lighting
  - Implement will-change: transform, opacity for animated elements
  - Add backfaceVisibility: hidden to prevent flickering
  - Apply transform: translateZ(0) for GPU layer creation
  - _Requirements: 1.6, 1.7, 2.1, 9.6, 11.6_

- [ ] 20. Create Lottie animation loading hook
  - Create hooks/useLottieAnimation.ts
  - Define hook accepting animationPath parameter
  - Initialize state for animationData, isLoading, error
  - Implement useEffect to fetch animation JSON with 1 second delay
  - Add error handling and mounted check
  - Return animationData, isLoading, error
  - _Requirements: 7.5, 9.1, 9.2, 9.3_

- [ ] 21. Implement LottieSparkles component
  - Create components/DecorativeEffects/LottieSparkles.tsx
  - Accept position {x, y} and optional scale props
  - Dynamically import lottie-react with ssr: false
  - Use useLottieAnimation hook to load sparkles.json
  - Return null during loading or on error (graceful degradation)
  - Position absolutely at provided x, y coordinates
  - Set dimensions based on scale prop (default 100x100)
  - Apply opacity: 0.6 and pointerEvents: none
  - Configure Lottie with loop: true, autoplay: true
  - _Requirements: 7.2, 7.5, 7.6, 9.2_

- [ ] 22. Implement FloatingPetals component
  - Create components/DecorativeEffects/FloatingPetals.tsx
  - Dynamically import lottie-react with ssr: false
  - Use useLottieAnimation hook to load floating-petals.json
  - Return null during loading or on error
  - Position absolutely covering full viewport (inset: 0)
  - Set opacity: 0.3 for subtle background effect
  - Apply pointerEvents: none and z-index: 1
  - Configure Lottie with loop: true, autoplay: true
  - _Requirements: 7.1, 7.4, 7.5, 7.6, 9.2_

- [ ] 23. Implement GlowEffects component
  - Create components/DecorativeEffects/GlowEffects.tsx
  - Create div with radial gradient background (gold color with transparency)
  - Position absolutely with dimensions 200x200px
  - Apply borderRadius: 50% for circular shape
  - Add blur filter (30px) for soft glow effect
  - Set pointerEvents: none
  - Use useRef and GSAP to animate opacity (0.6 to 0.8) and scale (1 to 1.2)
  - Configure animation with yoyo: true, repeat: -1, ease: sine.inOut
  - _Requirements: 7.3, 7.4, 10.5_

- [ ] 24. Integrate decorative effects into InvitationWrapper
  - Add FloatingPetals as background layer in InvitationWrapper
  - Position LottieSparkles near gold floral elements (2-3 instances)
  - Add GlowEffects near wax seal
  - Conditionally render sparkles with increased intensity when isRevealed is true
  - Ensure decorative effects don't obscure primary content (check z-index layering)
  - _Requirements: 7.1, 7.2, 7.3, 7.6, 7.7_

- [ ] 25. Checkpoint - Verify visual polish
  - Test gold foil shimmer animation on floral elements
  - Test Lottie sparkles appear and animate correctly
  - Test floating petals render subtly in background
  - Test glow effects pulse smoothly
  - Verify all decorative effects degrade gracefully if loading fails
  - Ensure all tests pass, ask the user if questions arise.

### Phase 4: Optimization and Accessibility

- [ ] 26. Implement code splitting and lazy loading
  - Update LottieSparkles to use next/dynamic for Lottie import
  - Update FloatingPetals to use next/dynamic for Lottie import
  - Add loading placeholder components for Lottie elements
  - Delay Lottie animation loading by 1 second using setTimeout
  - Verify bundle analyzer shows reduced main bundle size
  - _Requirements: 9.1, 9.2_

- [ ] 27. Optimize SVG assets
  - Install svgo as dev dependency
  - Configure SVGO with optimization plugins (removeMetadata, cleanupAttrs, minifyStyles)
  - Run SVGO on all SVG floral elements
  - Reduce path precision to 2 decimal places
  - Remove unnecessary XML declarations and comments
  - Verify visual quality remains high after optimization
  - _Requirements: 9.3_

- [ ] 28. Configure font preloading and subsetting
  - Update app/layout.tsx font configuration
  - Enable preload: true for Playfair Display
  - Enable adjustFontFallback: true to minimize layout shift
  - Configure display: 'swap' for both fonts
  - Add subset: 'latin' to reduce font file size
  - Verify fonts load without visible FOUT or FOIT
  - _Requirements: 9.4, 9.8_

- [ ] 29. Implement reduced motion support
  - Create hooks/useReducedMotion.ts using window.matchMedia
  - Check for (prefers-reduced-motion: reduce) media query
  - Update InvitationWrapper to use useReducedMotion hook
  - Conditionally simplify animations when reduced motion is preferred
  - Replace complex GSAP animations with simple opacity transitions
  - Update Framer Motion variants to use simplified animations
  - Test with browser reduced motion settings enabled
  - _Requirements: 12.5, 12.6_

- [ ] 30. Add keyboard navigation and ARIA labels
  - Verify RevealButton is keyboard accessible (already implemented in task 13)
  - Add ARIA label to GateContainer: "Wedding invitation gate"
  - Add ARIA label to InnerPage: "Invitation details"
  - Add ARIA live region for animation state announcements
  - Announce "Opening invitation" when animation starts
  - Announce "Invitation revealed" when animation completes
  - Test with keyboard-only navigation (Tab, Enter, Space)
  - _Requirements: 12.1, 12.2, 12.3, 12.7_

- [ ] 31. Verify semantic HTML and accessibility
  - [ ]* 31.1 Write accessibility tests with jest-axe
    - Install jest-axe and @axe-core/playwright
    - Test InvitationWrapper for accessibility violations
    - Test color contrast ratios meet WCAG AA standards
    - Test all interactive elements have accessible names
    - Test focus management during animation transitions
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - Manually test with screen reader (NVDA/JAWS/VoiceOver)
  - Verify all content is announced correctly
  - Verify animation state changes are communicated

- [ ] 32. Configure Next.js for production optimization
  - Create next.config.js with production settings
  - Enable reactStrictMode: true
  - Enable swcMinify: true for faster builds
  - Configure image optimization formats (avif, webp)
  - Set up device sizes for responsive images
  - Enable removeConsole in production
  - Configure experimental optimizePackageImports for framer-motion and lottie-react
  - Add cache headers for static assets (animations directory)
  - _Requirements: 9.3, 9.4, 9.7, 10.1_

- [ ] 33. Implement performance monitoring hook
  - Create hooks/usePerformanceMonitor.ts
  - Monitor navigation timing (loadEventEnd - fetchStart)
  - Log warning if load time exceeds 3 seconds
  - Monitor memory usage if performance.memory available
  - Log warning if memory usage exceeds 100MB
  - Run monitoring after page load completes
  - _Requirements: 9.5, 9.6_

- [ ] 34. Checkpoint - Verify optimization and accessibility
  - Run Lighthouse audit and verify performance score ≥85
  - Run Lighthouse audit and verify accessibility score ≥95
  - Test reduced motion with browser preferences enabled
  - Test keyboard navigation works for all interactions
  - Verify initial load time is under 2 seconds on throttled 3G
  - Verify bundle size is reasonable (check with next build output)
  - Ensure all tests pass, ask the user if questions arise.

### Phase 5: Testing and Quality Assurance

- [ ] 35. Set up testing infrastructure
  - Create jest.config.js with Next.js configuration
  - Create jest.setup.js with @testing-library/jest-dom
  - Configure moduleNameMapper for path aliases (@/*)
  - Set up collectCoverageFrom patterns
  - Set coverage thresholds (branches: 70%, functions: 75%, lines: 80%)
  - Create playwright.config.ts with device configurations
  - Configure projects for Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
  - Set up web server for e2e tests (npm run dev)
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 36. Write component unit tests
  - [ ]* 36.1 Write snapshot tests
    - Test InvitationWrapper matches snapshot for closed state
    - Test InvitationWrapper matches snapshot for mobile viewport (375px)
    - Test InvitationWrapper matches snapshot for tablet viewport (768px)
    - Test InvitationWrapper matches snapshot for desktop viewport (1920px)
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [ ]* 36.2 Write component rendering tests
    - Test GateContainer renders with correct perspective styling
    - Test LeftDoor and RightDoor render with correct positioning
    - Test WaxSeal renders with initials
    - Test InnerPage is hidden initially
    - Test CoupleNames renders with correct text
    - Test EventDetails renders with correct text
    - _Requirements: 2.1, 3.1, 3.2, 6.1, 6.2_

- [ ] 37. Write integration tests
  - [ ]* 37.1 Write animation timeline integration tests
    - Mock GSAP timeline methods
    - Test timeline is created on component mount
    - Test timeline.play() is called when reveal button clicked
    - Test onComplete callback updates state correctly
    - Test timeline is cleaned up on component unmount
    - _Requirements: 5.1, 5.2, 5.9_
  
  - [ ]* 37.2 Write component integration tests
    - Test all gate components render together correctly
    - Test z-index layering maintains correct order
    - Test wax seal appears above door panels
    - Test inner page appears below door panels
    - Test reveal button appears above all other elements
    - _Requirements: 2.1, 3.1, 11.5_

- [ ] 38. Set up Playwright visual regression tests
  - [ ]* 38.1 Write visual regression tests
    - Create e2e/visual-regression.spec.ts
    - Test closed gate screenshot matches baseline
    - Test opened gate screenshot matches baseline (after 3s wait)
    - Test mobile viewport (375x667) matches baseline
    - Test tablet viewport (768x1024) matches baseline
    - Test desktop viewport (1920x1080) matches baseline
    - Configure maxDiffPixels: 100 tolerance
    - _Requirements: 8.1, 8.2, 8.3_

- [ ] 39. Write performance tests
  - [ ]* 39.1 Write Lighthouse performance tests
    - Create e2e/performance.spec.ts
    - Install playwright-lighthouse
    - Test performance threshold ≥85
    - Test accessibility threshold ≥95
    - Test best-practices threshold ≥90
    - Test SEO threshold ≥90
    - _Requirements: 9.5_
  
  - [ ]* 39.2 Write 3G load time test
    - Mock 3G network conditions with 150ms latency
    - Test initial page load completes within 2 seconds
    - Verify left door element is visible after load
    - _Requirements: 9.5_
  
  - [ ]* 39.3 Write animation FPS test
    - Create e2e/animation-performance.spec.ts
    - Implement FPS measurement using requestAnimationFrame
    - Trigger gate opening animation
    - Collect FPS data during 3-second animation
    - Calculate average FPS
    - Assert average FPS ≥55 (allowing 5 FPS buffer)
    - _Requirements: 5.3, 8.7, 9.6_

- [ ] 40. Create Lottie animation JSON files
  - Create public/animations/sparkles.json with sparkle animation data
  - Create public/animations/floating-petals.json with petal animation data
  - Ensure JSON files are optimized and under 30KB combined
  - Test animations render correctly in browser
  - _Requirements: 7.1, 7.2, 7.5_

- [ ] 41. Manual testing and cross-browser verification
  - Test on Chrome (desktop and mobile)
  - Test on Firefox (desktop)
  - Test on Safari (desktop and mobile)
  - Test on Edge (desktop)
  - Verify gate opening animation runs smoothly on all browsers
  - Verify floral decorations render correctly with emboss effects
  - Verify gold foil gradient appears metallic
  - Verify wax seal has embossed appearance
  - Verify text is readable on all backgrounds and viewports
  - Verify touch targets are at least 44x44px on mobile
  - Verify haptic feedback works on supported mobile devices
  - _Requirements: 1.2, 1.3, 1.5, 2.2, 2.3, 3.2, 3.3, 8.6, 12.4_

- [ ] 42. Fix bugs and performance issues
  - Review all test failures and fix failing tests
  - Address any performance bottlenecks identified in FPS tests
  - Fix any visual regressions identified in screenshot tests
  - Optimize any components causing layout shift
  - Address any accessibility violations from axe tests
  - _Requirements: 5.3, 8.7, 9.5, 12.1, 12.2, 12.3_

- [ ] 43. Final checkpoint - Production readiness
  - Run full test suite (unit, integration, e2e, visual regression)
  - Verify all tests pass
  - Run npm run build and verify no errors
  - Check bundle size is reasonable
  - Run Lighthouse audit one final time
  - Verify performance score ≥85, accessibility score ≥95
  - Test on real mobile device (iOS and Android if possible)
  - Ensure all tests pass, ask the user if questions arise.


## Notes

- **Testing Strategy**: This feature focuses on UI rendering, animations, and visual presentation. Unit tests, snapshot tests, visual regression tests, and performance benchmarks are used instead of property-based testing.
- **Optional Tasks**: Tasks marked with `*` are optional and focus on testing. They can be skipped for a faster MVP but are recommended for production quality.
- **Requirements Traceability**: Each task references specific requirements using the format `X.Y` for granular acceptance criteria.
- **Phased Approach**: The implementation follows 5 phases (Core Structure, Animation Foundation, Visual Polish, Optimization, Testing) with checkpoints to ensure incremental progress.
- **Animation Libraries**: GSAP handles complex timeline orchestration for gate opening, while Framer Motion handles user interactions for buttons.
- **Performance Budget**: Target 60 FPS animations, 2-second initial load on 3G, Lighthouse performance score ≥85.
- **Accessibility**: Keyboard navigation, ARIA labels, reduced motion support, and screen reader compatibility are built in.
- **Code Splitting**: Lottie animations and heavy libraries are lazy-loaded to reduce initial bundle size.
- **Checkpoints**: Multiple checkpoints ensure the application remains functional and tested at each major milestone.


## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1", "2"] },
    { "id": 1, "tasks": ["3", "4", "11"] },
    { "id": 2, "tasks": ["5", "6.1", "6.2"] },
    { "id": 3, "tasks": ["7", "8", "9.1"] },
    { "id": 4, "tasks": ["9.2", "9.3", "12"] },
    { "id": 5, "tasks": ["13", "14"] },
    { "id": 6, "tasks": ["15", "16.1", "16.2"] },
    { "id": 7, "tasks": ["18", "19", "20"] },
    { "id": 8, "tasks": ["21", "22", "23"] },
    { "id": 9, "tasks": ["24"] },
    { "id": 10, "tasks": ["26", "27", "28"] },
    { "id": 11, "tasks": ["29", "30", "31.1"] },
    { "id": 12, "tasks": ["32", "33"] },
    { "id": 13, "tasks": ["35"] },
    { "id": 14, "tasks": ["36.1", "36.2"] },
    { "id": 15, "tasks": ["37.1", "37.2", "38.1"] },
    { "id": 16, "tasks": ["39.1", "39.2", "39.3", "40"] },
    { "id": 17, "tasks": ["41", "42"] }
  ]
}
```
