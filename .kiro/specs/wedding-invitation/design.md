# Design Document: Luxury Wedding Invitation

## Overview

The luxury wedding invitation is a high-fidelity interactive web experience that simulates opening a physical premium invitation card. The design centers around a 3D gate opening animation using GSAP's advanced timeline orchestration, layered SVG graphics with depth effects, and physics-based motion using Framer Motion. Built with Next.js 15 App Router and React Server Components for optimal performance, the application delivers a mobile-first, 60 FPS animation experience while maintaining accessibility.

### Design Philosophy

**Animation-First Architecture**: All interactions flow through GSAP's timeline system, providing frame-perfect synchronization across multiple animation layers (gate panels, wax seal, reveal elements, decorative effects).

**Layered Depth System**: SVG and HTML elements are positioned in 3D space using CSS transforms (translateZ, rotateY, perspective) to create realistic paper-cut depth without requiring WebGL.

**Performance Budget**: Target 2-second initial load on 3G, maintain 60 FPS during animations on mid-range mobile devices, minimize JavaScript bundle size through code splitting.

## Architecture

### Component Hierarchy

```
app/
├── layout.tsx (Root layout with font preloading)
├── page.tsx (Server Component - static data)
└── components/
    ├── InvitationWrapper.tsx (Client boundary, animation orchestration)
    ├── OpeningGate/
    │   ├── GateContainer.tsx (3D perspective parent)
    │   ├── LeftDoor.tsx (Transform origin: left edge)
    │   ├── RightDoor.tsx (Transform origin: right edge)
    │   ├── WaxSeal.tsx (Positioned absolute, breaks on open)
    │   └── FloralLayer.tsx (SVG decorations with filters)
    ├── RevealButton.tsx (Interactive trigger with Framer Motion)
    ├── InvitationPage/
    │   ├── InnerPage.tsx (Content revealed behind gates)
    │   ├── CoupleNames.tsx (Typography component)
    │   └── EventDetails.tsx (Ceremony information)
    └── DecorativeEffects/
        ├── LottieSparkles.tsx (Dynamic imports)
        ├── FloatingPetals.tsx (Lottie animation)
        └── GlowEffects.tsx (CSS + GSAP pulses)
```


### System Architecture

**Rendering Strategy**:
- Server Components: page.tsx, layout.tsx (static HTML generation)
- Client Components: All animation, interaction, and state management
- Client boundary at InvitationWrapper.tsx to minimize JavaScript on initial load

**State Management**:
- Local component state (useState) for animation triggers
- GSAP timeline refs for animation control
- No global state management needed (single-page experience)

**Animation Pipeline**:
1. Initial render: Closed gate with static elements
2. User interaction: RevealButton click triggers master timeline
3. GSAP orchestration: Sequenced animations across all components
4. Completion: Static open state with content visible

## Data Flow and State Management

### Animation State Machine

```
[INITIAL] → [READY] → [ANIMATING] → [REVEALED]
```

**INITIAL**: Components mounting, GSAP timelines initializing
**READY**: All assets loaded, RevealButton visible and interactive
**ANIMATING**: Gate opening sequence in progress (2-3 seconds)
**REVEALED**: Gates fully open, inner page visible, decorative effects active

### Data Flow Diagram

```
User Tap/Click
    ↓
RevealButton onClick
    ↓
InvitationWrapper.triggerOpen()
    ↓
GSAP Master Timeline .play()
    ↓
├─→ LeftDoor: rotateY(-120deg)
├─→ RightDoor: rotateY(120deg)
├─→ WaxSeal: scale(0) + rotate(180deg)
├─→ RevealButton: opacity(0)
└─→ InnerPage: opacity(1) + scale(1)
    ↓
onComplete callback
    ↓
setState({ revealed: true })
```


### Performance Optimization Strategy

**Code Splitting**:
- Dynamic imports for GSAP plugins (SplitText, ScrollTrigger if used)
- Dynamic imports for Lottie player and animation JSON files
- Tree-shaking of unused Framer Motion features

**Asset Optimization**:
- SVG optimization with SVGO (remove metadata, compress paths)
- Font subsetting for calligraphy fonts (only used characters)
- next/image for any raster images (webp conversion, responsive sizing)

**Critical Rendering Path**:
1. Inline critical CSS for above-the-fold gate view
2. Preload calligraphy font files
3. Defer non-critical animations (sparkles, petals)
4. Use `loading="lazy"` for inner page content

**Hardware Acceleration**:
- Force GPU compositing: `transform: translateZ(0)` on animated elements
- Use transform and opacity (compositor-only properties)
- Avoid animating layout properties (width, height, top, left)

**Performance Monitoring**:
```typescript
// Monitor FPS during animation
const checkFPS = () => {
  let lastTime = performance.now();
  let frames = 0;
  
  const loop = () => {
    frames++;
    const currentTime = performance.now();
    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      if (fps < 55) console.warn('Performance degradation:', fps);
      frames = 0;
      lastTime = currentTime;
    }
    requestAnimationFrame(loop);
  };
  
  loop();
};
```


## Components and Interfaces

### InvitationWrapper.tsx

**Purpose**: Client component boundary, orchestrates GSAP master timeline

**Props**: None (root client component)

**State**:
```typescript
interface InvitationState {
  isReady: boolean;        // Assets loaded, ready to animate
  isAnimating: boolean;    // Gate opening in progress
  isRevealed: boolean;     // Animation complete
}
```

**Key Methods**:
```typescript
const triggerOpen = () => {
  if (isAnimating || isRevealed) return;
  setIsAnimating(true);
  masterTimeline.play();
};

const initializeTimeline = () => {
  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      setIsAnimating(false);
      setIsRevealed(true);
    }
  });
  
  // Sequence animations (details in Animation Timeline section)
  return tl;
};
```

**Lifecycle**:
- useEffect: Initialize GSAP timeline on mount
- useEffect: Cleanup timeline on unmount
- Forward refs to child components for GSAP targeting


### GateContainer.tsx

**Purpose**: 3D perspective parent container for door panels

**Props**:
```typescript
interface GateContainerProps {
  children: React.ReactNode;
  className?: string;
}
```

**Styling**:
```typescript
const containerStyles = {
  perspective: '2000px',           // 3D depth
  perspectiveOrigin: '50% 50%',   // Center vanishing point
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: '#A8B5A2'      // Sage green
};
```

**Responsibilities**:
- Establish 3D rendering context
- Center child elements
- Maintain aspect ratio across viewports

### LeftDoor.tsx

**Purpose**: Left gate panel with floral decorations

**Props**:
```typescript
interface DoorProps {
  ref: React.RefObject<HTMLDivElement>;  // For GSAP targeting
}
```

**Structure**:
```typescript
<div ref={doorRef} className="door-panel left">
  <div className="door-base">
    {/* Base panel with gradient */}
  </div>
  <FloralLayer position="left" />
  <div className="embossed-border" />
</div>
```

**Styling**:
```typescript
const doorStyles = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '50vw',
  height: '90vh',
  transformOrigin: 'left center',  // Rotate around left edge
  transformStyle: 'preserve-3d',
  transform: 'translate(-100%, -50%)',
  boxShadow: '10px 0 30px rgba(0,0,0,0.3)'
};
```

**Animation Target**:
```typescript
// GSAP will animate this element
gsap.to(doorRef.current, {
  rotateY: -120,
  duration: 2,
  ease: 'power2.inOut'
});
```


### RightDoor.tsx

**Purpose**: Right gate panel (mirror of left door)

**Styling Difference**:
```typescript
const doorStyles = {
  // ... same as LeftDoor except:
  right: '50%',
  transformOrigin: 'right center',  // Rotate around right edge
  transform: 'translate(100%, -50%)'
};
```

**Animation Target**:
```typescript
gsap.to(doorRef.current, {
  rotateY: 120,  // Opposite direction from left door
  duration: 2,
  ease: 'power2.inOut'
});
```

### WaxSeal.tsx

**Purpose**: Decorative wax seal with couple's initials

**Props**:
```typescript
interface WaxSealProps {
  ref: React.RefObject<HTMLDivElement>;
  initials: string;  // "S J"
}
```

**Structure**:
```typescript
<div ref={sealRef} className="wax-seal">
  <div className="seal-texture" />
  <svg className="seal-emboss">
    {/* Embossed pattern */}
  </svg>
  <div className="initials">{initials}</div>
</div>
```

**Styling**:
```typescript
const sealStyles = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  backgroundColor: '#8A9A82',  // Darker sage green
  transform: 'translate(-50%, -50%)',
  boxShadow: `
    inset 0 2px 10px rgba(255,255,255,0.3),
    0 4px 15px rgba(0,0,0,0.4)
  `,
  zIndex: 10
};
```

**Animation Sequence**:
```typescript
// Break seal animation
gsap.to(sealRef.current, {
  scale: 0,
  rotation: 180,
  opacity: 0,
  duration: 1,
  ease: 'back.in(2)'
});
```


### FloralLayer.tsx

**Purpose**: SVG botanical illustrations with embossed effects

**Props**:
```typescript
interface FloralLayerProps {
  position: 'left' | 'right';
  className?: string;
}
```

**SVG Structure**:
```typescript
<svg 
  viewBox="0 0 400 800" 
  className="floral-layer"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    {/* Embossed filter */}
    <filter id="emboss">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
      <feOffset dx="2" dy="2" result="offsetblur" />
      <feSpecularLighting result="spec" in="offsetblur" 
        surfaceScale="5" specularConstant="0.75">
        <fePointLight x="-5000" y="-10000" z="20000" />
      </feSpecularLighting>
      <feComposite in="spec" in2="SourceAlpha" 
        operator="in" result="spec" />
      <feComposite in="SourceGraphic" in2="spec" 
        operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
    </filter>
    
    {/* Gold foil gradient */}
    <linearGradient id="goldFoil">
      <stop offset="0%" stopColor="#D4AF37" />
      <stop offset="50%" stopColor="#F9E79F" />
      <stop offset="100%" stopColor="#D4AF37" />
    </linearGradient>
  </defs>
  
  {/* Floral elements */}
  <g filter="url(#emboss)">
    <path d="M..." fill="url(#goldFoil)" className="lily" />
    <path d="M..." fill="url(#goldFoil)" className="rose" />
    <path d="M..." stroke="url(#goldFoil)" className="vine" />
    <circle cx="..." cy="..." r="..." fill="url(#goldFoil)" className="eucalyptus-leaf" />
  </g>
</svg>
```

**Layering**:
```typescript
const layerStyles = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  transform: 'translateZ(20px)',  // Slight depth offset
  filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))'
};
```


### RevealButton.tsx

**Purpose**: Interactive trigger with Framer Motion hover/tap feedback

**Props**:
```typescript
interface RevealButtonProps {
  onClick: () => void;
  disabled: boolean;
}
```

**Implementation**:
```typescript
import { motion } from 'framer-motion';

const RevealButton: React.FC<RevealButtonProps> = ({ onClick, disabled }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="reveal-button"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: disabled ? 0 : 1, 
        scale: disabled ? 0.8 : 1 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      aria-label="Tap to reveal invitation details"
    >
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      >
        Tap to Reveal
      </motion.span>
    </motion.button>
  );
};
```

**Styling**:
```typescript
// Tailwind classes
className="
  fixed bottom-24 left-1/2 -translate-x-1/2 z-20
  px-8 py-4 rounded-full
  bg-white/90 backdrop-blur-sm
  text-sage-700 font-serif text-lg
  shadow-xl shadow-sage-900/20
  cursor-pointer
  sm:bottom-32 sm:px-12 sm:py-5 sm:text-xl
"
```

**Accessibility**:
- Keyboard accessible (Enter/Space)
- ARIA label for screen readers
- Focus visible styles
- Touch target minimum 44x44px


### InnerPage.tsx

**Purpose**: White invitation page with couple names and event details

**Props**:
```typescript
interface InnerPageProps {
  ref: React.RefObject<HTMLDivElement>;
}
```

**Structure**:
```typescript
<div ref={pageRef} className="inner-page">
  <div className="page-content">
    <CoupleNames 
      names="Sakshi and Jayum" 
      fontFamily="Playfair Display" 
    />
    <div className="divider" />
    <EventDetails 
      occasion="Engagement Ceremony" 
    />
  </div>
</div>
```

**Styling**:
```typescript
const pageStyles = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '85vw',
  maxWidth: '600px',
  height: '85vh',
  maxHeight: '800px',
  transform: 'translate(-50%, -50%) scale(0.9)',
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '3rem 2rem',
  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  opacity: 0,  // Hidden initially
  zIndex: 5
};
```

**Animation Entry**:
```typescript
gsap.to(pageRef.current, {
  opacity: 1,
  scale: 1,
  duration: 1.5,
  ease: 'power2.out',
  delay: 1  // After gates start opening
});
```

### CoupleNames.tsx

**Purpose**: Typography component for couple's names

**Props**:
```typescript
interface CoupleNamesProps {
  names: string;
  fontFamily: string;
}
```

**Implementation**:
```typescript
<h1 className="couple-names">
  {names}
</h1>

// Styling
className="
  text-4xl sm:text-5xl lg:text-6xl
  text-sage-800 text-center
  font-serif tracking-wide
  mb-6
"
style={{ fontFamily: 'Playfair Display, serif' }}
```


### EventDetails.tsx

**Purpose**: Display ceremony information

**Props**:
```typescript
interface EventDetailsProps {
  occasion: string;
}
```

**Implementation**:
```typescript
<div className="event-details">
  <p className="occasion">{occasion}</p>
</div>

// Styling
className="
  text-xl sm:text-2xl
  text-sage-600 text-center
  font-sans tracking-wider uppercase
  mt-4
"
```

### LottieSparkles.tsx

**Purpose**: Animated sparkle effects near gold elements

**Props**:
```typescript
interface LottieSparklesProps {
  position: { x: string; y: string };
  scale?: number;
}
```

**Implementation**:
```typescript
import dynamic from 'next/dynamic';

// Dynamic import for code splitting
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const LottieSparkles: React.FC<LottieSparklesProps> = ({ position, scale = 1 }) => {
  const [animationData, setAnimationData] = useState(null);
  
  useEffect(() => {
    // Lazy load animation JSON
    import('@/assets/animations/sparkles.json')
      .then(data => setAnimationData(data.default));
  }, []);
  
  if (!animationData) return null;
  
  return (
    <div 
      className="lottie-sparkles"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: `${100 * scale}px`,
        height: `${100 * scale}px`,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    >
      <Lottie 
        animationData={animationData}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};
```


### FloatingPetals.tsx

**Purpose**: Background petal animations

**Implementation**:
```typescript
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const FloatingPetals: React.FC = () => {
  const [animationData, setAnimationData] = useState(null);
  
  useEffect(() => {
    import('@/assets/animations/floating-petals.json')
      .then(data => setAnimationData(data.default));
  }, []);
  
  if (!animationData) return null;
  
  return (
    <div className="floating-petals">
      <Lottie 
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </div>
  );
};
```

### GlowEffects.tsx

**Purpose**: CSS-based glowing effects for interactive elements

**Implementation**:
```typescript
const GlowEffects: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!glowRef.current) return;
    
    // GSAP pulsing animation
    gsap.to(glowRef.current, {
      opacity: 0.8,
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);
  
  return (
    <div 
      ref={glowRef}
      className="glow-effect"
      style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none'
      }}
    />
  );
};
```


## Data Models

### Animation Timeline State

```typescript
interface AnimationTimeline {
  master: gsap.core.Timeline;
  duration: number;
  progress: number;
  isActive: boolean;
}
```

### Component Refs

```typescript
interface AnimationRefs {
  leftDoor: React.RefObject<HTMLDivElement>;
  rightDoor: React.RefObject<HTMLDivElement>;
  waxSeal: React.RefObject<HTMLDivElement>;
  innerPage: React.RefObject<HTMLDivElement>;
  revealButton: React.RefObject<HTMLButtonElement>;
}
```

### Viewport Breakpoints

```typescript
type Breakpoint = 'mobile' | 'tablet' | 'desktop';

interface ViewportConfig {
  breakpoint: Breakpoint;
  doorWidth: string;
  doorHeight: string;
  sealSize: number;
  perspective: number;
}

const viewportConfigs: Record<Breakpoint, ViewportConfig> = {
  mobile: {
    breakpoint: 'mobile',
    doorWidth: '50vw',
    doorHeight: '90vh',
    sealSize: 100,
    perspective: 1500
  },
  tablet: {
    breakpoint: 'tablet',
    doorWidth: '50vw',
    doorHeight: '85vh',
    sealSize: 120,
    perspective: 1800
  },
  desktop: {
    breakpoint: 'desktop',
    doorWidth: '40vw',
    doorHeight: '85vh',
    sealSize: 140,
    perspective: 2000
  }
};
```

### Font Configuration

```typescript
interface FontConfig {
  family: string;
  weights: number[];
  display: 'swap' | 'block' | 'fallback';
  preload: boolean;
  subset?: string;
}

const fonts: FontConfig[] = [
  {
    family: 'Playfair Display',
    weights: [400, 700],
    display: 'swap',
    preload: true,
    subset: 'latin'
  },
  {
    family: 'Montserrat',
    weights: [300, 400, 600],
    display: 'swap',
    preload: false
  }
];
```


### Lottie Animation Data

```typescript
interface LottieAnimation {
  id: string;
  path: string;
  loop: boolean;
  autoplay: boolean;
  preload: boolean;
}

const animations: LottieAnimation[] = [
  {
    id: 'sparkles',
    path: '/animations/sparkles.json',
    loop: true,
    autoplay: true,
    preload: false
  },
  {
    id: 'floating-petals',
    path: '/animations/floating-petals.json',
    loop: true,
    autoplay: true,
    preload: false
  }
];
```

## Animation Timeline and Sequencing

### Master Timeline Structure

```typescript
const createMasterTimeline = (refs: AnimationRefs): gsap.core.Timeline => {
  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      console.log('Animation complete');
    }
  });
  
  // Sequence 1: Wax seal breaks (0s - 1s)
  tl.to(refs.waxSeal.current, {
    scale: 0,
    rotation: 180,
    opacity: 0,
    duration: 1,
    ease: 'back.in(2)'
  }, 0);
  
  // Sequence 2: Hide reveal button (0s - 0.5s)
  tl.to(refs.revealButton.current, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power2.in'
  }, 0);
  
  // Sequence 3: Doors open (0.5s - 2.5s)
  tl.to(refs.leftDoor.current, {
    rotateY: -120,
    duration: 2,
    ease: 'power2.inOut'
  }, 0.5)
  .to(refs.rightDoor.current, {
    rotateY: 120,
    duration: 2,
    ease: 'power2.inOut'
  }, 0.5);
  
  // Sequence 4: Inner page reveals (1.5s - 3s)
  tl.to(refs.innerPage.current, {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: 'power2.out'
  }, 1.5);
  
  return tl;
};
```


### Timeline Visualization

```
Time (s): 0    0.5   1.0   1.5   2.0   2.5   3.0
          |-----|-----|-----|-----|-----|-----|
WaxSeal:  [====Breaking====]
Button:   [==Fade==]
LeftDoor:       [=========Opening=========]
RightDoor:      [=========Opening=========]
InnerPage:                  [=====Reveal=====]
Sparkles:                         [Intensify]
```

### GSAP Configuration

```typescript
// Initialize GSAP defaults
gsap.config({
  force3D: true,           // Force GPU acceleration
  nullTargetWarn: false    // Suppress warnings for conditional targets
});

// Register plugins if needed
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);  // If scroll effects added later
```

### Easing Functions

```typescript
// Custom easing for realistic paper fold
const paperFoldEase = 'cubic-bezier(0.4, 0.0, 0.2, 1)';

// Seal break (dramatic)
const sealBreakEase = 'back.in(2)';

// Door opening (smooth and natural)
const doorOpenEase = 'power2.inOut';

// Page reveal (gentle)
const pageRevealEase = 'power2.out';
```

### Animation Performance Optimization

```typescript
// Use will-change for animated elements
const animatedElementStyle = {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  transform: 'translateZ(0)'  // Force layer creation
};

// Remove will-change after animation
const cleanupAnimation = (element: HTMLElement) => {
  element.style.willChange = 'auto';
};
```


## Framer Motion Integration Patterns

### Button Interactions

```typescript
// Hover state
const hoverVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeIn'
    }
  }
};

// Usage
<motion.button
  variants={hoverVariants}
  initial="rest"
  whileHover="hover"
  whileTap="tap"
>
  Tap to Reveal
</motion.button>
```

### Pulse Animation

```typescript
const pulseVariants = {
  pulse: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};
```

### Stagger Children

```typescript
// For decorative elements that appear after reveal
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="show">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
  <motion.div variants={itemVariants}>Item 3</motion.div>
</motion.div>
```


### Accessibility: Reduced Motion

```typescript
import { useReducedMotion } from 'framer-motion';

const RevealButton = () => {
  const shouldReduceMotion = useReducedMotion();
  
  const buttonVariants = shouldReduceMotion
    ? {
        // Simplified animations
        rest: { opacity: 1 },
        hover: { opacity: 0.8 }
      }
    : {
        // Full animations
        rest: { scale: 1, opacity: 1 },
        hover: { scale: 1.1, opacity: 1 }
      };
  
  return (
    <motion.button variants={buttonVariants} {...props}>
      Tap to Reveal
    </motion.button>
  );
};
```

### GSAP + Framer Motion Coordination

```typescript
// Use GSAP for complex timeline orchestration
// Use Framer Motion for user interactions

const InvitationWrapper = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  // GSAP handles gate opening
  const triggerOpen = () => {
    masterTimeline.play();
  };
  
  return (
    <>
      {/* Framer Motion handles button interaction */}
      <RevealButton onClick={triggerOpen} />
      
      {/* GSAP handles door animation */}
      <LeftDoor ref={leftDoorRef} />
      <RightDoor ref={rightDoorRef} />
      
      {/* Framer Motion can handle decorative elements after reveal */}
      {isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <DecorativeElements />
        </motion.div>
      )}
    </>
  );
};
```


## SVG Layer Structure and Styling

### Layer Organization

```typescript
// Z-index layering system
const layers = {
  background: 0,         // Sage green background
  floatingPetals: 1,     // Background Lottie animation
  innerPage: 5,          // White invitation card
  doorBase: 10,          // Door panel base
  floralDecoration: 15,  // SVG floral patterns
  waxSeal: 20,           // Seal on top of doors
  revealButton: 25,      // Interactive button
  sparkles: 30           // Foreground effects
};
```

### SVG Embossed Effect Implementation

```typescript
// Complete SVG with filters
<svg viewBox="0 0 400 800" className="floral-decoration">
  <defs>
    {/* Emboss filter for 3D paper-cut effect */}
    <filter id="emboss" x="-50%" y="-50%" width="200%" height="200%">
      {/* Create alpha channel blur */}
      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
      
      {/* Offset for shadow */}
      <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
      
      {/* Lighting effect */}
      <feSpecularLighting 
        result="specOut" 
        in="blur"
        surfaceScale="5" 
        specularConstant="0.75"
        specularExponent="20"
        lightingColor="#ffffff"
      >
        <fePointLight x="-5000" y="-10000" z="20000" />
      </feSpecularLighting>
      
      {/* Composite with source */}
      <feComposite 
        in="specOut" 
        in2="SourceAlpha" 
        operator="in" 
        result="specOut" 
      />
      
      {/* Merge layers */}
      <feComposite 
        in="SourceGraphic" 
        in2="specOut" 
        operator="arithmetic" 
        k1="0" k2="1" k3="1" k4="0" 
      />
    </filter>
    
    {/* Gold foil gradient with shimmer */}
    <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#C9A860" />
      <stop offset="25%" stopColor="#F9E79F" />
      <stop offset="50%" stopColor="#D4AF37" />
      <stop offset="75%" stopColor="#F9E79F" />
      <stop offset="100%" stopColor="#C9A860" />
    </linearGradient>
    
    {/* Animated shimmer (optional) */}
    <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="rgba(255,255,255,0)" />
      <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      <animateTransform
        attributeName="gradientTransform"
        type="translate"
        from="-1 0"
        to="1 0"
        dur="3s"
        repeatCount="indefinite"
      />
    </linearGradient>
  </defs>
  
  {/* Floral elements with emboss and gold */}
  <g filter="url(#emboss)">
    {/* Lily flower */}
    <path 
      d="M200,100 Q220,80 240,100 Q220,120 200,100 Z"
      fill="url(#goldFoil)"
      stroke="url(#shimmer)"
      strokeWidth="1"
    />
    
    {/* Rose */}
    <circle 
      cx="150" 
      cy="300" 
      r="20"
      fill="url(#goldFoil)"
    />
    
    {/* Eucalyptus leaves */}
    <ellipse 
      cx="300" 
      cy="400" 
      rx="15" 
      ry="30"
      fill="url(#goldFoil)"
      opacity="0.8"
    />
    
    {/* Vine/stem */}
    <path
      d="M200,500 Q250,450 300,500 Q350,550 400,500"
      stroke="url(#goldFoil)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </g>
</svg>
```


### SVG Optimization

```typescript
// SVGO configuration for optimization
const svgoConfig = {
  plugins: [
    {
      name: 'removeDoctype',
    },
    {
      name: 'removeXMLProcInst',
    },
    {
      name: 'removeComments',
    },
    {
      name: 'removeMetadata',
    },
    {
      name: 'removeEditorsNSData',
    },
    {
      name: 'cleanupAttrs',
    },
    {
      name: 'minifyStyles',
    },
    {
      name: 'convertStyleToAttrs',
    },
    {
      name: 'cleanupIds',
    },
    {
      name: 'removeUselessDefs',
    },
    {
      name: 'cleanupNumericValues',
      params: {
        floatPrecision: 2
      }
    },
    {
      name: 'convertPathData',
      params: {
        floatPrecision: 2
      }
    },
    {
      name: 'convertTransform',
    },
    {
      name: 'removeEmptyAttrs',
    },
    {
      name: 'removeEmptyContainers',
    },
    {
      name: 'mergePaths',
    },
    {
      name: 'removeUnusedNS',
    },
    {
      name: 'sortAttrs',
    },
    {
      name: 'removeTitle',
    },
    {
      name: 'removeDesc',
    }
  ]
};
```

### SVG Component Pattern

```typescript
// Reusable SVG component
interface FloralElementProps {
  type: 'lily' | 'rose' | 'eucalyptus' | 'vine';
  position: { x: number; y: number };
  rotation?: number;
  scale?: number;
}

const FloralElement: React.FC<FloralElementProps> = ({
  type,
  position,
  rotation = 0,
  scale = 1
}) => {
  const paths = {
    lily: "M200,100 Q220,80 240,100 Q220,120 200,100 Z",
    rose: "M0,0 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0",
    eucalyptus: "M0,-15 Q7.5,-15 15,0 Q7.5,15 0,15 Q-7.5,15 -15,0 Q-7.5,-15 0,-15",
    vine: "M0,0 Q50,-50 100,0 Q150,50 200,0"
  };
  
  return (
    <g
      transform={`translate(${position.x}, ${position.y}) rotate(${rotation}) scale(${scale})`}
      filter="url(#emboss)"
    >
      <path
        d={paths[type]}
        fill="url(#goldFoil)"
        stroke="url(#shimmer)"
        strokeWidth="1"
      />
    </g>
  );
};
```


## Lottie Animation Integration

### Animation File Structure

```
public/
└── animations/
    ├── sparkles.json        (~15KB)
    └── floating-petals.json (~25KB)
```

### Dynamic Loading Pattern

```typescript
// hooks/useLottieAnimation.ts
import { useState, useEffect } from 'react';
import type { AnimationItem } from 'lottie-web';

export const useLottieAnimation = (animationPath: string) => {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const loadAnimation = async () => {
      try {
        const response = await fetch(animationPath);
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.status}`);
        }
        const data = await response.json();
        
        if (isMounted) {
          setAnimationData(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setIsLoading(false);
        }
      }
    };
    
    // Delay loading for non-critical animations
    const timeoutId = setTimeout(loadAnimation, 1000);
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [animationPath]);
  
  return { animationData, isLoading, error };
};
```

### Lottie Component with Fallback

```typescript
import dynamic from 'next/dynamic';
import { useLottieAnimation } from '@/hooks/useLottieAnimation';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="lottie-placeholder" />
});

interface LottiePlayerProps {
  animationPath: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({
  animationPath,
  loop = true,
  autoplay = true,
  className
}) => {
  const { animationData, isLoading, error } = useLottieAnimation(animationPath);
  
  if (error) {
    console.error('Lottie animation error:', error);
    return null;  // Graceful degradation
  }
  
  if (isLoading || !animationData) {
    return null;
  }
  
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true
      }}
    />
  );
};

export default LottiePlayer;
```


### Lottie Performance Optimization

```typescript
// Reduce animation complexity for mobile
const getAnimationSettings = () => {
  const isMobile = window.innerWidth < 768;
  
  return {
    quality: isMobile ? 'low' : 'high',
    renderer: 'svg',  // 'svg' is more performant than 'canvas' for simple animations
    progressiveLoad: true
  };
};

// Control playback based on visibility
const useLottieVisibility = (ref: React.RefObject<HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [ref]);
  
  return isVisible;
};

// Usage
const SparklesWithVisibility = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useLottieVisibility(containerRef);
  
  return (
    <div ref={containerRef}>
      {isVisible && (
        <LottiePlayer 
          animationPath="/animations/sparkles.json"
          autoplay={isVisible}
        />
      )}
    </div>
  );
};
```


## Responsive Design Breakpoints

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F5F7F4',
          100: '#E8EDE6',
          200: '#D1DBC9',
          300: '#B9C9AC',
          400: '#A8B5A2',  // Primary sage
          500: '#8A9A82',
          600: '#6D7D67',
          700: '#52604D',
          800: '#394338',
          900: '#212621',
        },
        gold: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#F9E79F',
          500: '#D4AF37',  // Primary gold
          600: '#C9A860',
          700: '#B8922D',
          800: '#8B6F22',
          900: '#5E4A17',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
        '2000': '2000px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
```


### Responsive Component Styles

```typescript
// Mobile-first responsive classes
const responsiveClasses = {
  gateContainer: `
    w-full h-screen
    perspective-1500 md:perspective-1800 lg:perspective-2000
    bg-sage-400
    overflow-hidden
  `,
  
  door: `
    absolute top-1/2 -translate-y-1/2
    w-[50vw] h-[90vh]
    md:w-[50vw] md:h-[85vh]
    lg:w-[40vw] lg:h-[85vh]
    rounded-lg shadow-2xl
  `,
  
  waxSeal: `
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-24 h-24
    sm:w-28 sm:h-28
    md:w-32 md:h-32
    lg:w-36 lg:h-36
    rounded-full
    bg-sage-500
    shadow-xl
  `,
  
  innerPage: `
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-[85vw] h-[85vh]
    max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
    max-h-[700px] sm:max-h-[750px] md:max-h-[800px]
    p-6 sm:p-8 md:p-10 lg:p-12
    bg-white rounded-xl
    shadow-2xl
  `,
  
  coupleNames: `
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    font-serif font-bold
    text-sage-800 text-center
    tracking-wide
    mb-4 sm:mb-6 md:mb-8
  `,
  
  eventDetails: `
    text-lg sm:text-xl md:text-2xl
    font-sans font-light
    text-sage-600 text-center
    tracking-wider uppercase
    mt-4 sm:mt-6 md:mt-8
  `,
  
  revealButton: `
    fixed bottom-20 left-1/2 -translate-x-1/2
    sm:bottom-24 md:bottom-28 lg:bottom-32
    px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5
    text-base sm:text-lg md:text-xl
    font-serif text-sage-700
    bg-white/90 backdrop-blur-sm
    rounded-full
    shadow-xl shadow-sage-900/20
    cursor-pointer
    min-w-[140px] min-h-[44px]  // Touch target
  `
};
```


### Viewport-Specific Animation Adjustments

```typescript
// Adjust animation parameters based on viewport
const useResponsiveAnimation = () => {
  const [viewportConfig, setViewportConfig] = useState<ViewportConfig>({
    doorRotation: 120,
    animationDuration: 2,
    perspective: 1500
  });
  
  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      
      if (width >= 1024) {
        // Desktop
        setViewportConfig({
          doorRotation: 130,
          animationDuration: 2.5,
          perspective: 2000
        });
      } else if (width >= 768) {
        // Tablet
        setViewportConfig({
          doorRotation: 120,
          animationDuration: 2.2,
          perspective: 1800
        });
      } else {
        // Mobile
        setViewportConfig({
          doorRotation: 110,
          animationDuration: 2,
          perspective: 1500
        });
      }
    };
    
    updateConfig();
    window.addEventListener('resize', updateConfig);
    
    return () => window.removeEventListener('resize', updateConfig);
  }, []);
  
  return viewportConfig;
};

// Usage in timeline creation
const createResponsiveTimeline = (refs: AnimationRefs) => {
  const config = useResponsiveAnimation();
  
  const tl = gsap.timeline({ paused: true });
  
  tl.to(refs.leftDoor.current, {
    rotateY: -config.doorRotation,
    duration: config.animationDuration,
    ease: 'power2.inOut'
  });
  
  return tl;
};
```


### Touch and Pointer Events

```typescript
// Unified pointer handling for touch and mouse
const RevealButton = ({ onClick }: RevealButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handlePointerDown = () => {
    setIsPressed(true);
  };
  
  const handlePointerUp = () => {
    setIsPressed(false);
  };
  
  const handleClick = () => {
    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    onClick();
  };
  
  return (
    <motion.button
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="reveal-button"
      style={{
        touchAction: 'manipulation',  // Prevent double-tap zoom
        WebkitTapHighlightColor: 'transparent'  // Remove tap highlight on iOS
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Tap to reveal invitation details"
    >
      <span className={isPressed ? 'pressed' : ''}>
        Tap to Reveal
      </span>
    </motion.button>
  );
};
```


## Error Handling

### Animation Fallbacks

```typescript
// Graceful degradation if GSAP fails
const InvitationWrapper = () => {
  const [animationError, setAnimationError] = useState(false);
  
  useEffect(() => {
    try {
      // Initialize GSAP timeline
      const tl = createMasterTimeline(refs);
      setMasterTimeline(tl);
    } catch (error) {
      console.error('GSAP initialization failed:', error);
      setAnimationError(true);
    }
  }, []);
  
  if (animationError) {
    // Fallback to CSS transitions
    return <SimpleCSSFallback />;
  }
  
  return <AnimatedInvitation />;
};

// CSS-only fallback
const SimpleCSSFallback = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="invitation-fallback">
      <div className={`gates ${isOpen ? 'open' : 'closed'}`}>
        <div className="left-door" />
        <div className="right-door" />
      </div>
      <button onClick={() => setIsOpen(true)}>
        Reveal Invitation
      </button>
      <div className={`inner-page ${isOpen ? 'visible' : 'hidden'}`}>
        <CoupleNames names="Sakshi and Jayum" />
        <EventDetails occasion="Engagement Ceremony" />
      </div>
    </div>
  );
};
```

### Font Loading Error Handling

```typescript
// app/layout.tsx
import { Playfair_Display, Montserrat } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  preload: true,
  adjustFontFallback: true,  // Minimize layout shift
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
  preload: false,
  adjustFontFallback: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```


### Asset Loading Error Handling

```typescript
// Handle SVG loading failures
const FloralLayer = ({ position }: FloralLayerProps) => {
  const [svgError, setSvgError] = useState(false);
  
  const handleError = () => {
    console.error('SVG failed to load');
    setSvgError(true);
  };
  
  if (svgError) {
    // Fallback to simple CSS decorations
    return <SimpleCSSDecoration position={position} />;
  }
  
  return (
    <svg onError={handleError}>
      {/* SVG content */}
    </svg>
  );
};

// Handle Lottie loading failures
const LottiePlayer = ({ animationPath }: LottiePlayerProps) => {
  const { animationData, isLoading, error } = useLottieAnimation(animationPath);
  
  if (error) {
    // Fail silently for decorative animations
    return null;
  }
  
  if (isLoading) {
    // Optional: Show subtle loading state
    return <div className="w-full h-full opacity-0" />;
  }
  
  return <Lottie animationData={animationData} />;
};
```

### Network Error Handling

```typescript
// Retry logic for animation files
const fetchWithRetry = async (
  url: string, 
  retries = 3, 
  delay = 1000
): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
};

// Usage
const loadAnimation = async (path: string) => {
  try {
    const response = await fetchWithRetry(path);
    return await response.json();
  } catch (error) {
    console.error('Animation loading failed:', error);
    return null;
  }
};
```


### Performance Monitoring

```typescript
// Monitor and log performance issues
const usePerformanceMonitor = () => {
  useEffect(() => {
    // Check if running on low-end device
    const checkPerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      
      if (loadTime > 3000) {
        console.warn('Slow load time detected:', loadTime);
      }
      
      // Check memory if available
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMemoryMB = memory.usedJSHeapSize / 1048576;
        
        if (usedMemoryMB > 100) {
          console.warn('High memory usage:', usedMemoryMB.toFixed(2), 'MB');
        }
      }
    };
    
    // Run after page load
    if (document.readyState === 'complete') {
      checkPerformance();
    } else {
      window.addEventListener('load', checkPerformance);
      return () => window.removeEventListener('load', checkPerformance);
    }
  }, []);
};
```


## Testing Strategy

### Testing Approach

This feature is a frontend animation and visual presentation application that is **NOT suitable for property-based testing**. The system involves:
- UI rendering and layout
- CSS animations and transitions
- Interactive user gestures
- Visual aesthetics and timing
- 3D transforms and effects

**Testing Strategy**: Focus on snapshot tests, visual regression tests, interaction tests, and performance benchmarks rather than property-based tests.

### Unit Testing

**Component Rendering Tests**:
```typescript
// __tests__/components/InvitationWrapper.test.tsx
import { render, screen } from '@testing-library/react';
import { InvitationWrapper } from '@/components/InvitationWrapper';

describe('InvitationWrapper', () => {
  it('should render the closed gate initially', () => {
    render(<InvitationWrapper />);
    
    expect(screen.getByRole('button', { name: /tap to reveal/i })).toBeInTheDocument();
    expect(screen.getByTestId('left-door')).toBeInTheDocument();
    expect(screen.getByTestId('right-door')).toBeInTheDocument();
    expect(screen.getByTestId('wax-seal')).toBeInTheDocument();
  });
  
  it('should hide inner page initially', () => {
    render(<InvitationWrapper />);
    
    const innerPage = screen.getByTestId('inner-page');
    expect(innerPage).toHaveStyle({ opacity: '0' });
  });
  
  it('should render reveal button with correct accessibility attributes', () => {
    render(<InvitationWrapper />);
    
    const button = screen.getByRole('button', { name: /tap to reveal/i });
    expect(button).toHaveAttribute('aria-label', 'Tap to reveal invitation details');
  });
});
```


**Interaction Tests**:
```typescript
// __tests__/interactions/reveal-button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InvitationWrapper } from '@/components/InvitationWrapper';

describe('Reveal Button Interaction', () => {
  it('should trigger animation on button click', async () => {
    const user = userEvent.setup();
    render(<InvitationWrapper />);
    
    const button = screen.getByRole('button', { name: /tap to reveal/i });
    await user.click(button);
    
    // Button should fade out
    expect(button).toHaveStyle({ opacity: '0' });
  });
  
  it('should prevent multiple clicks during animation', async () => {
    const user = userEvent.setup();
    render(<InvitationWrapper />);
    
    const button = screen.getByRole('button', { name: /tap to reveal/i });
    
    await user.click(button);
    await user.click(button);  // Second click should be ignored
    
    // Animation should only run once
    expect(button).toBeDisabled();
  });
  
  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    render(<InvitationWrapper />);
    
    const button = screen.getByRole('button', { name: /tap to reveal/i });
    button.focus();
    
    expect(button).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(button).toHaveStyle({ opacity: '0' });
  });
});
```


**Snapshot Tests**:
```typescript
// __tests__/snapshots/invitation.snapshot.test.tsx
import { render } from '@testing-library/react';
import { InvitationWrapper } from '@/components/InvitationWrapper';

describe('Invitation Snapshots', () => {
  it('should match snapshot for initial closed state', () => {
    const { container } = render(<InvitationWrapper />);
    expect(container).toMatchSnapshot();
  });
  
  it('should match snapshot for mobile viewport', () => {
    global.innerWidth = 375;
    const { container } = render(<InvitationWrapper />);
    expect(container).toMatchSnapshot();
  });
  
  it('should match snapshot for desktop viewport', () => {
    global.innerWidth = 1920;
    const { container } = render(<InvitationWrapper />);
    expect(container).toMatchSnapshot();
  });
});
```

**Accessibility Tests**:
```typescript
// __tests__/a11y/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { InvitationWrapper } from '@/components/InvitationWrapper';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<InvitationWrapper />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('should have sufficient color contrast', () => {
    render(<InvitationWrapper />);
    const coupleNames = screen.getByText(/sakshi and jayum/i);
    
    // Check contrast ratio (should be >= 4.5:1 for normal text)
    const computedStyle = window.getComputedStyle(coupleNames);
    expect(computedStyle.color).toBeDefined();
  });
  
  it('should support reduced motion preference', () => {
    // Mock prefers-reduced-motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    
    render(<InvitationWrapper />);
    
    // Should use simplified animations
    // Verify through animation duration or presence of specific classes
  });
});
```


### Integration Testing

**Animation Timeline Tests**:
```typescript
// __tests__/integration/animation-timeline.test.tsx
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InvitationWrapper } from '@/components/InvitationWrapper';

jest.mock('gsap', () => ({
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    play: jest.fn(),
    pause: jest.fn(),
  })),
  to: jest.fn(),
  config: jest.fn(),
}));

describe('Animation Timeline Integration', () => {
  it('should create GSAP timeline on mount', () => {
    render(<InvitationWrapper />);
    
    const gsap = require('gsap');
    expect(gsap.timeline).toHaveBeenCalled();
  });
  
  it('should play timeline when reveal button clicked', async () => {
    const user = userEvent.setup();
    render(<InvitationWrapper />);
    
    const button = screen.getByRole('button', { name: /tap to reveal/i });
    await user.click(button);
    
    const gsap = require('gsap');
    const timelineInstance = gsap.timeline.mock.results[0].value;
    expect(timelineInstance.play).toHaveBeenCalled();
  });
});
```

**Component Integration Tests**:
```typescript
// __tests__/integration/gate-components.test.tsx
describe('Gate Components Integration', () => {
  it('should render all gate components together', () => {
    render(<InvitationWrapper />);
    
    expect(screen.getByTestId('gate-container')).toBeInTheDocument();
    expect(screen.getByTestId('left-door')).toBeInTheDocument();
    expect(screen.getByTestId('right-door')).toBeInTheDocument();
    expect(screen.getByTestId('wax-seal')).toBeInTheDocument();
    expect(screen.getByTestId('floral-layer-left')).toBeInTheDocument();
    expect(screen.getByTestId('floral-layer-right')).toBeInTheDocument();
  });
  
  it('should maintain correct z-index layering', () => {
    render(<InvitationWrapper />);
    
    const innerPage = screen.getByTestId('inner-page');
    const leftDoor = screen.getByTestId('left-door');
    const waxSeal = screen.getByTestId('wax-seal');
    
    const innerPageZ = window.getComputedStyle(innerPage).zIndex;
    const leftDoorZ = window.getComputedStyle(leftDoor).zIndex;
    const waxSealZ = window.getComputedStyle(waxSeal).zIndex;
    
    expect(Number(waxSealZ)).toBeGreaterThan(Number(leftDoorZ));
    expect(Number(leftDoorZ)).toBeGreaterThan(Number(innerPageZ));
  });
});
```


### Visual Regression Testing

**Playwright Visual Tests**:
```typescript
// e2e/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('should match closed gate screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('closed-gate.png', {
      maxDiffPixels: 100
    });
  });
  
  test('should match opened gate screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click reveal button
    await page.click('button:has-text("Tap to Reveal")');
    
    // Wait for animation to complete
    await page.waitForTimeout(3000);
    
    await expect(page).toHaveScreenshot('opened-gate.png', {
      maxDiffPixels: 100
    });
  });
  
  test('should match mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('mobile-view.png');
  });
  
  test('should match tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('tablet-view.png');
  });
  
  test('should match desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveScreenshot('desktop-view.png');
  });
});
```


### Performance Testing

**Lighthouse Performance Tests**:
```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Performance Tests', () => {
  test('should meet Lighthouse performance thresholds', async ({ page }) => {
    await page.goto('/');
    
    await playAudit({
      page,
      thresholds: {
        performance: 85,
        accessibility: 95,
        'best-practices': 90,
        seo: 90,
      },
      port: 9222,
    });
  });
  
  test('should load initial page within 2 seconds on 3G', async ({ page, context }) => {
    // Throttle to 3G
    await context.route('**/*', route => {
      setTimeout(() => route.continue(), 150); // Simulate 3G latency
    });
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForSelector('[data-testid="left-door"]');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(2000);
  });
});
```

**Animation FPS Tests**:
```typescript
// e2e/animation-performance.spec.ts
test.describe('Animation Performance', () => {
  test('should maintain 60 FPS during gate opening', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Start performance measurement
    await page.evaluate(() => {
      (window as any).fpsData = [];
      let lastTime = performance.now();
      let frames = 0;
      
      const measureFPS = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
          const fps = Math.round((frames * 1000) / (currentTime - lastTime));
          (window as any).fpsData.push(fps);
          frames = 0;
          lastTime = currentTime;
        }
        
        if ((window as any).measuring) {
          requestAnimationFrame(measureFPS);
        }
      };
      
      (window as any).measuring = true;
      requestAnimationFrame(measureFPS);
    });
    
    // Trigger animation
    await page.click('button:has-text("Tap to Reveal")');
    await page.waitForTimeout(3000);
    
    // Stop measurement
    await page.evaluate(() => {
      (window as any).measuring = false;
    });
    
    // Get FPS data
    const fpsData = await page.evaluate(() => (window as any).fpsData);
    const avgFPS = fpsData.reduce((a: number, b: number) => a + b, 0) / fpsData.length;
    
    expect(avgFPS).toBeGreaterThanOrEqual(55);  // Allow 5 FPS buffer
  });
});
```


### Manual Testing Checklist

**Visual Quality**:
- [ ] Gate panels display floral decorations correctly
- [ ] Gold foil gradient appears metallic
- [ ] Wax seal has embossed appearance
- [ ] Text is readable on all backgrounds
- [ ] Shadows create depth perception
- [ ] Colors match design specifications (sage green #A8B5A2)

**Animation Quality**:
- [ ] Gate opening feels smooth and natural
- [ ] Wax seal breaks dramatically
- [ ] Inner page reveals gracefully
- [ ] No jank or stuttering during animations
- [ ] Decorative effects are subtle and non-distracting
- [ ] Animations complete in 2-3 seconds

**Responsive Behavior**:
- [ ] Mobile (320px-767px): Components scale correctly
- [ ] Tablet (768px-1023px): Layout adapts appropriately
- [ ] Desktop (1024px+): Optimal viewing experience
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Text remains readable at all sizes

**Interaction**:
- [ ] Reveal button is clearly visible
- [ ] Button provides visual feedback on hover/tap
- [ ] Button prevents double-clicks during animation
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Haptic feedback works on supported mobile devices

**Accessibility**:
- [ ] Screen reader announces button purpose
- [ ] Reduced motion preference is respected
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Page structure is semantic

**Performance**:
- [ ] Initial load completes within 2 seconds on 3G
- [ ] Animation runs at 60 FPS on mid-range devices
- [ ] No memory leaks after multiple interactions
- [ ] Lottie animations load without blocking
- [ ] Fonts load without visible layout shift

**Cross-Browser**:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (desktop and iOS)
- [ ] Mobile browsers (Chrome, Safari, Samsung Internet)

**Error Handling**:
- [ ] Works without JavaScript (basic content visible)
- [ ] Graceful degradation if GSAP fails
- [ ] Handles missing Lottie files
- [ ] Font fallbacks display correctly


## Implementation Roadmap

### Phase 1: Core Structure and Static Layout (Day 1-2)
- Set up Next.js 15 project with TypeScript
- Configure Tailwind CSS with custom sage green and gold colors
- Create basic component structure (GateContainer, LeftDoor, RightDoor, InnerPage)
- Implement responsive layout with mobile-first approach
- Add static SVG floral decorations
- Test across viewport sizes

**Deliverable**: Static invitation that displays correctly on all devices

### Phase 2: Animation Foundation (Day 3-4)
- Install and configure GSAP
- Create master timeline structure
- Implement door opening animation with 3D transforms
- Add wax seal break animation
- Implement reveal button with Framer Motion
- Test animation performance

**Deliverable**: Working gate opening animation at 60 FPS

### Phase 3: Visual Polish and Effects (Day 5-6)
- Add SVG embossed filters
- Implement gold foil gradients and shimmer
- Integrate Lottie for sparkles and floating petals
- Add glow effects with GSAP
- Fine-tune easing and timing
- Apply shadows and depth effects

**Deliverable**: Polished luxury aesthetic with all decorative effects

### Phase 4: Optimization and Accessibility (Day 7-8)
- Implement code splitting and lazy loading
- Optimize SVG files with SVGO
- Set up font preloading and subsetting
- Add reduced motion support
- Implement keyboard navigation
- Add ARIA labels and semantic HTML
- Test with screen readers

**Deliverable**: Accessible, optimized application meeting performance budgets

### Phase 5: Testing and Quality Assurance (Day 9-10)
- Write unit tests for components
- Add interaction tests
- Set up Playwright for visual regression
- Run Lighthouse audits
- Test on real devices
- Fix bugs and performance issues
- Cross-browser testing

**Deliverable**: Production-ready invitation with comprehensive test coverage


## File Structure

```
wedding-invitation/
├── app/
│   ├── layout.tsx                    # Root layout with font configuration
│   ├── page.tsx                      # Main page (Server Component)
│   ├── globals.css                   # Global styles and Tailwind imports
│   └── fonts/                        # Local font files if needed
├── components/
│   ├── InvitationWrapper.tsx         # Client boundary, animation orchestration
│   ├── OpeningGate/
│   │   ├── GateContainer.tsx         # 3D perspective container
│   │   ├── LeftDoor.tsx              # Left door panel
│   │   ├── RightDoor.tsx             # Right door panel
│   │   ├── WaxSeal.tsx               # Wax seal with initials
│   │   └── FloralLayer.tsx           # SVG floral decorations
│   ├── InvitationPage/
│   │   ├── InnerPage.tsx             # White card container
│   │   ├── CoupleNames.tsx           # Typography for names
│   │   └── EventDetails.tsx          # Ceremony information
│   ├── DecorativeEffects/
│   │   ├── LottieSparkles.tsx        # Sparkle animations
│   │   ├── FloatingPetals.tsx        # Petal animations
│   │   └── GlowEffects.tsx           # CSS glow effects
│   └── RevealButton.tsx              # Interactive trigger button
├── hooks/
│   ├── useLottieAnimation.ts         # Animation loading hook
│   ├── useResponsiveAnimation.ts     # Viewport-specific configs
│   └── usePerformanceMonitor.ts      # Performance tracking
├── lib/
│   ├── animations/
│   │   ├── masterTimeline.ts         # GSAP timeline creation
│   │   └── easingFunctions.ts        # Custom easing curves
│   └── utils/
│       ├── viewportConfig.ts         # Breakpoint configurations
│       └── fetchWithRetry.ts         # Network retry logic
├── public/
│   └── animations/
│       ├── sparkles.json              # Lottie sparkle animation
│       └── floating-petals.json      # Lottie petal animation
├── __tests__/
│   ├── components/                    # Component unit tests
│   ├── integration/                   # Integration tests
│   ├── snapshots/                     # Snapshot tests
│   └── a11y/                          # Accessibility tests
├── e2e/
│   ├── visual-regression.spec.ts      # Visual regression tests
│   ├── performance.spec.ts            # Performance tests
│   └── animation-performance.spec.ts  # Animation FPS tests
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
├── next.config.js                     # Next.js configuration
├── jest.config.js                     # Jest test configuration
├── playwright.config.ts               # Playwright configuration
└── package.json                       # Dependencies and scripts
```


## Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "gsap": "^3.12.0",
    "framer-motion": "^11.0.0",
    "lottie-react": "^2.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@playwright/test": "^1.40.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "jest-axe": "^8.0.0",
    "playwright-lighthouse": "^4.0.0",
    "eslint": "^8.55.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.1.0",
    "svgo": "^3.2.0",
    "@tailwindcss/typography": "^0.5.10"
  }
}
```

### Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "optimize:svg": "svgo -f public/svg -o public/svg/optimized"
  }
}
```


## Configuration Files

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lottie-react'],
  },
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/animations/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/lib/*": ["./lib/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```


### jest.config.js

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/e2e/'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```


## Security Considerations

### Content Security Policy

```typescript
// app/layout.tsx
export const metadata = {
  // ... other metadata
  other: {
    'Content-Security-Policy': `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: blob:;
      connect-src 'self';
      frame-src 'none';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
    `.replace(/\s+/g, ' ').trim()
  }
};
```

### XSS Prevention

- All user input (if any) sanitized through React's built-in escaping
- No dangerouslySetInnerHTML usage
- SVG content inline (not loaded from external sources)
- Lottie animations loaded from same origin

### Dependency Security

- Use `npm audit` in CI/CD pipeline
- Pin exact versions for production dependencies
- Regular updates for security patches
- Use Dependabot or Renovate for automated updates

### Privacy

- No third-party analytics or tracking by default
- No cookies used
- No external API calls (all assets self-hosted)
- No personal data collection


## Deployment Strategy

### Build Optimization

```bash
# Production build
npm run build

# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
```

### Hosting Recommendations

**Option 1: Vercel (Recommended)**
- Native Next.js 15 support
- Automatic image optimization
- Edge network CDN
- Zero configuration deployment
- Free tier available

**Option 2: Netlify**
- Next.js runtime support
- Asset optimization
- CDN distribution
- Easy custom domain setup

**Option 3: Static Export**
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://yourwedding.com
NODE_ENV=production
```

### Performance Checklist

- [ ] Enable gzip/brotli compression
- [ ] Set up CDN for static assets
- [ ] Configure HTTP/2 or HTTP/3
- [ ] Add preconnect hints for external resources
- [ ] Enable long-term caching for immutable assets
- [ ] Minimize Time to First Byte (TTFB)
- [ ] Optimize Largest Contentful Paint (LCP)
- [ ] Reduce Cumulative Layout Shift (CLS)
- [ ] Improve First Input Delay (FID)

### Monitoring

```typescript
// Optional: Performance monitoring
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    // Log to analytics service
    console.log(metric);
  }
};
```


## Future Enhancements

### Potential Features (Post-MVP)

1. **Audio Integration**
   - Background music with user control
   - Sound effects on gate opening
   - Mute/unmute toggle

2. **Additional Pages**
   - RSVP form
   - Photo gallery
   - Event schedule/timeline
   - Location map

3. **Customization Options**
   - Theme color picker
   - Alternative animation styles
   - Different floral patterns
   - Custom fonts

4. **Social Features**
   - Share invitation link
   - Download as video
   - Add to calendar integration
   - WhatsApp/email sharing

5. **Advanced Animations**
   - Parallax scrolling effects
   - Multiple animation sequences
   - Interactive floral elements
   - Particle systems

6. **Internationalization**
   - Multi-language support
   - RTL layout support
   - Localized date formats

### Technical Debt Prevention

- Maintain test coverage above 80%
- Regular dependency updates
- Performance monitoring in production
- Code review for all changes
- Documentation updates with new features


## Conclusion

This design provides a comprehensive technical blueprint for implementing a luxury wedding invitation with premium animations, responsive design, and optimal performance. The architecture separates concerns between server and client components, uses industry-standard animation libraries (GSAP, Framer Motion), and maintains accessibility throughout.

**Key Design Decisions**:

1. **GSAP for Complex Orchestration**: GSAP's timeline system provides frame-perfect synchronization across multiple animated elements, essential for the coordinated gate opening sequence.

2. **Framer Motion for Interactions**: Framer Motion handles user interactions (hover, tap, keyboard) with React-friendly declarative syntax.

3. **Layered 3D Architecture**: CSS transforms with perspective create realistic depth without WebGL overhead, keeping bundle size small and performance high.

4. **Mobile-First Responsive**: Tailwind's utility classes and viewport-specific configurations ensure the invitation works beautifully across all devices.

5. **Progressive Enhancement**: The invitation works with basic CSS if JavaScript fails, uses reduced motion preferences, and degrades gracefully on older browsers.

6. **Performance Budget**: Code splitting, lazy loading, and hardware acceleration ensure 60 FPS animations and 2-second load times even on 3G connections.

**Success Metrics**:
- Lighthouse Performance Score: ≥85
- Lighthouse Accessibility Score: ≥95
- Animation FPS: ≥55 (allowing 5 FPS buffer)
- Initial Load Time (3G): ≤2 seconds
- Test Coverage: ≥80%

This design is ready for implementation, with clear component boundaries, animation timelines, and testing strategies to ensure a premium user experience.

