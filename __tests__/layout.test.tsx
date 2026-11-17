/**
 * Tests for root layout component
 * Validates: Requirements 10.1, 10.2, 9.8, 12.7
 */

import { metadata } from '@/app/layout';

describe('RootLayout Implementation', () => {
  it('should verify layout file contains semantic HTML structure', () => {
    const layoutContent = require('fs').readFileSync(
      require('path').join(process.cwd(), 'app', 'layout.tsx'),
      'utf-8'
    );

    // Verify semantic HTML structure exists
    expect(layoutContent).toContain('<html');
    expect(layoutContent).toContain('<body');
    expect(layoutContent).toContain('lang="en"');
  });

  it('should apply font CSS variables to html element', () => {
    const layoutContent = require('fs').readFileSync(
      require('path').join(process.cwd(), 'app', 'layout.tsx'),
      'utf-8'
    );

    // Verify font variables are applied to html element
    expect(layoutContent).toContain('${playfairDisplay.variable}');
    expect(layoutContent).toContain('${montserrat.variable}');
    expect(layoutContent).toContain('className={`${playfairDisplay.variable} ${montserrat.variable}`}');
  });

  it('should apply font-sans class to body element', () => {
    const layoutContent = require('fs').readFileSync(
      require('path').join(process.cwd(), 'app', 'layout.tsx'),
      'utf-8'
    );

    // Verify body has font-sans class
    expect(layoutContent).toContain('className="font-sans"');
  });

  it('should render children within body', () => {
    const layoutContent = require('fs').readFileSync(
      require('path').join(process.cwd(), 'app', 'layout.tsx'),
      'utf-8'
    );

    // Verify children prop is rendered in body
    expect(layoutContent).toContain('{children}');
    expect(layoutContent).toMatch(/<body[^>]*>{children}<\/body>/);
  });
});

describe('Metadata Configuration', () => {
  it('should have correct title for wedding invitation', () => {
    expect(metadata.title).toBe('Wedding Invitation - Abhishek & Simran');
  });

  it('should have descriptive description', () => {
    expect(metadata.description).toBe('Abhishek Kumar weds Simran Choudhary - Tilak 07 Feb 2027, Wedding 11 Feb 2027');
  });
});

describe('Font Configuration', () => {
  // These tests verify the font configuration exists in the layout file
  // The actual font loading is handled by Next.js at runtime
  
  it('should configure Playfair Display with correct properties', () => {
    // This test verifies that the font configuration exists
    // by checking the import and usage in the layout component
    const layoutContent = require('fs').readFileSync(
      require('path').join(process.cwd(), 'app', 'layout.tsx'),
      'utf-8'
    );

    // Verify Playfair Display configuration
    expect(layoutContent).toContain('Playfair_Display');
    expect(layoutContent).toContain('weight: ["400", "700"]');
    expect(layoutContent).toContain('preload: true');
    expect(layoutContent).toContain('adjustFontFallback: true');
    expect(layoutContent).toContain('fallback: ["Georgia", "serif"]');
    expect(layoutContent).toContain('variable: "--font-playfair"');
  });

  it('should configure Montserrat with correct properties', () => {
    const layoutContent = require('fs').readFileSync(
      require('path').join(process.cwd(), 'app', 'layout.tsx'),
      'utf-8'
    );

    // Verify Montserrat configuration
    expect(layoutContent).toContain('Montserrat');
    expect(layoutContent).toContain('weight: ["300", "400", "600"]');
    expect(layoutContent).toContain('preload: true');
    expect(layoutContent).toContain('adjustFontFallback: true');
    expect(layoutContent).toContain('fallback: ["Arial", "sans-serif"]');
    expect(layoutContent).toContain('variable: "--font-montserrat"');
  });

  it('should enable font display swap for both fonts', () => {
    const layoutContent = require('fs').readFileSync(
      require('path').join(process.cwd(), 'app', 'layout.tsx'),
      'utf-8'
    );

    // Count occurrences of display: "swap"
    const swapMatches = layoutContent.match(/display: "swap"/g);
    expect(swapMatches).toHaveLength(2); // Both fonts should have swap
  });

  it('should load latin subsets for both fonts', () => {
    const layoutContent = require('fs').readFileSync(
      require('path').join(process.cwd(), 'app', 'layout.tsx'),
      'utf-8'
    );

    // Count occurrences of subsets: ["latin"]
    const subsetMatches = layoutContent.match(/subsets: \["latin"\]/g);
    expect(subsetMatches).toHaveLength(2); // Both fonts should have latin subset
  });
});
