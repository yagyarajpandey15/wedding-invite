# Tailwind CSS Usage Guide - Wedding Invitation

## Quick Reference

This guide provides quick examples for using the custom Tailwind configuration in the wedding invitation project.

---

## Color Palette Usage

### Sage Green (Primary Brand Color)

The sage green palette is the primary color scheme for the invitation background and UI elements.

```jsx
// Background colors
<div className="bg-sage-400">     {/* Primary sage green #A8B5A2 */}
<div className="bg-sage-50">      {/* Lightest sage */}
<div className="bg-sage-900">     {/* Darkest sage */}

// Text colors
<h1 className="text-sage-800">    {/* Dark sage for headings */}
<p className="text-sage-600">     {/* Medium sage for body */}

// Border and accent colors
<div className="border-sage-400">
<button className="hover:bg-sage-500">
```

### Gold (Accent & Foil Color)

The gold palette is used for decorative accents, foil effects, and interactive elements.

```jsx
// Background colors
<div className="bg-gold-400">     {/* Primary gold #D4AF37 */}
<span className="bg-gold-200">    {/* Light gold shimmer */}

// Text colors  
<h2 className="text-gold-400">    {/* Gold headings */}
<p className="text-gold-700">     {/* Darker gold for contrast */}

// Decorative elements
<svg className="fill-gold-400 stroke-gold-500">
```

---

## Responsive Breakpoints

Mobile-first approach with custom breakpoints optimized for wedding invitation viewing.

### Breakpoint Values
- `xs`: 320px (Small mobile)
- `sm`: 640px (Large mobile)
- `md`: 768px (Tablet)
- `lg`: 1024px (Desktop)

### Usage Examples

```jsx
// Text sizing
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Sakshi and Jayum
</h1>

// Spacing
<div className="p-4 sm:p-6 md:p-8 lg:p-12">
  {/* Content */}
</div>

// Layout
<div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
  {/* Responsive width */}
</div>

// Gate dimensions
<div className="w-screen h-screen sm:h-[90vh] md:h-[85vh]">
  {/* Gate container */}
</div>
```

---

## 3D Perspective & Transforms

Custom utilities for the gate opening animation and 3D effects.

### Perspective Values

```jsx
// Subtle 3D effect (closer perspective)
<div className="perspective-1000">
  <div className="transform rotate-y-15">
    {/* Content appears with mild 3D depth */}
  </div>
</div>

// Medium 3D effect (mobile devices)
<div className="perspective-1500">
  <div className="transform rotate-y-30">
    {/* Content appears with moderate 3D depth */}
  </div>
</div>

// Strong 3D effect (primary for desktop gate animation)
<div className="perspective-2000">
  <div className="transform rotate-y-45">
    {/* Content appears with dramatic 3D depth */}
  </div>
</div>
```

### Responsive Perspective

```jsx
// Adjust perspective based on viewport
<div className="perspective-1500 lg:perspective-2000">
  <div className="transform-style-3d">
    {/* Child elements maintain 3D space */}
  </div>
</div>
```

### 3D Transform Utilities

```jsx
// Enable 3D transforms on children
<div className="transform-style-3d">
  <div style={{ transform: 'rotateY(45deg)' }}>
    {/* Rotates in 3D space */}
  </div>
</div>

// Hide element backface during rotation
<div className="backface-hidden">
  {/* Back side is invisible when rotated */}
</div>
```

### Gate Component Example

```jsx
// Left door panel
<div className="perspective-2000">
  <div 
    className="transform-style-3d backface-hidden"
    style={{ 
      transformOrigin: 'left center',
      transform: 'rotateY(0deg)' // Animate to -120deg
    }}
  >
    {/* Door content */}
  </div>
</div>

// Right door panel  
<div className="perspective-2000">
  <div 
    className="transform-style-3d backface-hidden"
    style={{ 
      transformOrigin: 'right center',
      transform: 'rotateY(0deg)' // Animate to 120deg
    }}
  >
    {/* Door content */}
  </div>
</div>
```

---

## Typography

Custom font families for elegant wedding invitation aesthetics.

### Font Family Classes

```jsx
// Serif font (Playfair Display) - For elegant headings
<h1 className="font-serif text-4xl">
  Sakshi and Jayum
</h1>

// Sans-serif font (Montserrat) - For body text
<p className="font-sans text-lg">
  Engagement Ceremony
</p>
```

### Complete Typography Examples

```jsx
// Couple names (primary heading)
<h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-sage-800 tracking-wide">
  Sakshi and Jayum
</h1>

// Event details (secondary text)
<p className="font-sans text-xl sm:text-2xl text-sage-600 tracking-wider uppercase">
  Engagement Ceremony
</p>

// Decorative text with gold accent
<span className="font-serif text-2xl text-gold-400 italic">
  Join us to celebrate
</span>
```

---

## Common Component Patterns

### Button Styling

```jsx
// Primary button
<button className="
  px-8 py-4 
  bg-gold-400 hover:bg-gold-500 
  text-white font-sans 
  rounded-full 
  shadow-xl shadow-sage-900/20
  transition-colors duration-300
">
  Tap to Reveal
</button>

// Ghost button
<button className="
  px-6 py-3
  border-2 border-sage-400 hover:bg-sage-50
  text-sage-800 font-sans
  rounded-lg
  transition-all duration-300
">
  View Details
</button>
```

### Card/Panel Styling

```jsx
// White inner page card
<div className="
  bg-white 
  rounded-xl 
  p-6 sm:p-8 md:p-12
  shadow-2xl shadow-sage-900/10
  max-w-2xl mx-auto
">
  {/* Content */}
</div>

// Sage green background panel
<div className="
  bg-sage-400 
  p-8 
  rounded-lg 
  border border-sage-500
">
  {/* Content */}
</div>
```

### Overlay/Modal Styling

```jsx
// Semi-transparent overlay
<div className="
  fixed inset-0 
  bg-sage-900/50 
  backdrop-blur-sm
  flex items-center justify-center
  z-50
">
  {/* Modal content */}
</div>
```

---

## CSS Custom Properties

Use CSS variables for dynamic styling that can't be handled by Tailwind classes.

```jsx
// Inline styles using custom properties
<div style={{ 
  background: 'var(--sage-green)',
  color: 'var(--gold)',
  fontFamily: 'var(--font-serif)'
}}>
  {/* Content */}
</div>

// Gradient with custom colors
<div className="bg-gradient-to-r" style={{
  backgroundImage: 'linear-gradient(to right, var(--sage-green), var(--gold))'
}}>
  {/* Content */}
</div>
```

---

## Advanced Techniques

### Shadow Effects

```jsx
// Soft depth shadow
<div className="shadow-lg shadow-sage-900/20">

// Elevated card shadow
<div className="shadow-2xl shadow-sage-900/10">

// Inset shadow for embossed effect
<div className="shadow-inner shadow-sage-700/30">

// Custom shadow with utility
<div className="shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
```

### Gradient Backgrounds

```jsx
// Sage green gradient
<div className="bg-gradient-to-b from-sage-300 to-sage-500">

// Gold shimmer gradient
<div className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300">

// Radial glow effect
<div className="bg-radial-gradient from-gold-200/50 to-transparent">
```

### Animation Optimization

```jsx
// Hardware-accelerated transforms
<div className="
  transform 
  will-change-transform
  transition-transform duration-500 ease-out
">
  {/* Animated content */}
</div>

// Smooth opacity transitions
<div className="
  opacity-0 
  animate-fade-in
  transition-opacity duration-1000
">
  {/* Fading content */}
</div>
```

---

## Accessibility Considerations

```jsx
// Sufficient color contrast
<p className="text-sage-800 bg-white">          {/* High contrast */}
<p className="text-sage-600 bg-sage-50">        {/* Medium contrast */}

// Focus states
<button className="
  focus:outline-none 
  focus:ring-4 focus:ring-sage-400/50
  focus:border-sage-600
">

// Reduced motion support (handle in component logic)
const shouldReduceMotion = useReducedMotion();
<div className={shouldReduceMotion ? 'transition-none' : 'transition-all duration-500'}>
```

---

## Testing & Debugging

### View Tailwind Classes in DevTools

```html
<!-- Classes are visible in browser inspector -->
<div class="bg-sage-400 text-gold-400 p-8 perspective-2000">
```

### Test Responsive Breakpoints

Use browser DevTools device toolbar to test breakpoints:
- 320px - xs (iPhone SE)
- 375px - xs (iPhone 12/13)  
- 640px - sm (Large mobile)
- 768px - md (iPad)
- 1024px - lg (Desktop)

### Verify 3D Transforms

```jsx
// Add debug borders to see transform origins
<div className="border-4 border-red-500" style={{ transformOrigin: 'left center' }}>
  {/* Transform origin is at left edge, vertical center */}
</div>
```

---

## Resources

- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `app/globals.css`
- **Demo Component**: `components/TailwindDemo.tsx`
- **Test Suite**: `__tests__/tailwind-config.test.ts`
- **Verification Script**: `verify-tailwind.js`

For questions or issues, refer to the official [Tailwind CSS documentation](https://tailwindcss.com/docs).
