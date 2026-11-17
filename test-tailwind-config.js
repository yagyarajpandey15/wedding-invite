// Test script to verify Tailwind configuration
const config = require('./tailwind.config.ts').default;

console.log('=== Tailwind Configuration Test ===\n');

// Test 1: Sage green color palette
console.log('✓ Test 1: Sage green color palette');
console.log('  Primary sage green (400):', config.theme.extend.colors.sage[400]);
console.log('  Expected: #A8B5A2');
console.log('  Match:', config.theme.extend.colors.sage[400] === '#A8B5A2' ? 'PASS' : 'FAIL');

// Test 2: Gold color palette
console.log('\n✓ Test 2: Gold color palette');
console.log('  Primary gold (400):', config.theme.extend.colors.gold[400]);
console.log('  Expected: #D4AF37');
console.log('  Match:', config.theme.extend.colors.gold[400] === '#D4AF37' ? 'PASS' : 'FAIL');

// Test 3: Responsive breakpoints
console.log('\n✓ Test 3: Responsive breakpoints');
console.log('  xs:', config.theme.extend.screens.xs, '(Expected: 320px)');
console.log('  sm:', config.theme.extend.screens.sm, '(Expected: 640px)');
console.log('  md:', config.theme.extend.screens.md, '(Expected: 768px)');
console.log('  lg:', config.theme.extend.screens.lg, '(Expected: 1024px)');

const breakpointsMatch = 
  config.theme.extend.screens.xs === '320px' &&
  config.theme.extend.screens.sm === '640px' &&
  config.theme.extend.screens.md === '768px' &&
  config.theme.extend.screens.lg === '1024px';
console.log('  Match:', breakpointsMatch ? 'PASS' : 'FAIL');

// Test 4: Custom perspective utilities
console.log('\n✓ Test 4: Custom perspective utilities');
console.log('  1000px:', config.theme.extend.perspective['1000']);
console.log('  1500px:', config.theme.extend.perspective['1500']);
console.log('  2000px:', config.theme.extend.perspective['2000']);

const perspectiveMatch = 
  config.theme.extend.perspective['1000'] === '1000px' &&
  config.theme.extend.perspective['1500'] === '1500px' &&
  config.theme.extend.perspective['2000'] === '2000px';
console.log('  Match:', perspectiveMatch ? 'PASS' : 'FAIL');

// Test 5: Font families
console.log('\n✓ Test 5: Font families');
console.log('  Serif (Playfair Display):', config.theme.extend.fontFamily.serif);
console.log('  Sans (Montserrat):', config.theme.extend.fontFamily.sans);

const fontsMatch = 
  config.theme.extend.fontFamily.serif.includes('Playfair Display') &&
  config.theme.extend.fontFamily.sans.includes('Montserrat');
console.log('  Match:', fontsMatch ? 'PASS' : 'FAIL');

// Summary
console.log('\n=== Summary ===');
const allTestsPass = 
  config.theme.extend.colors.sage[400] === '#A8B5A2' &&
  config.theme.extend.colors.gold[400] === '#D4AF37' &&
  breakpointsMatch &&
  perspectiveMatch &&
  fontsMatch;

console.log('All tests:', allTestsPass ? 'PASSED ✓' : 'FAILED ✗');
console.log('\nRequirements verified: 1.1, 8.8, 10.4');
