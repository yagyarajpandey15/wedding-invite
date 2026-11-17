/**
 * Tailwind Configuration Tests
 * Validates that the custom Tailwind theme is correctly configured
 */

import tailwindConfig from '../tailwind.config';
import { Config } from 'tailwindcss';

describe('Tailwind Configuration', () => {
  const config = tailwindConfig as Config;
  const theme = config.theme?.extend;

  describe('Color Palettes', () => {
    test('sage green color palette is defined', () => {
      expect(theme?.colors).toBeDefined();
      const colors = theme?.colors as Record<string, any>;
      expect(colors.sage).toBeDefined();
      expect(colors.sage[400]).toBe('#A8B5A2'); // Primary sage green
    });

    test('sage green palette has all shades', () => {
      const colors = theme?.colors as Record<string, any>;
      const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
      shades.forEach(shade => {
        expect(colors.sage[shade]).toBeDefined();
        expect(typeof colors.sage[shade]).toBe('string');
      });
    });

    test('gold color palette is defined', () => {
      const colors = theme?.colors as Record<string, any>;
      expect(colors.gold).toBeDefined();
      expect(colors.gold[400]).toBe('#D4AF37'); // Primary gold
    });

    test('gold palette has all shades', () => {
      const colors = theme?.colors as Record<string, any>;
      const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
      shades.forEach(shade => {
        expect(colors.gold[shade]).toBeDefined();
        expect(typeof colors.gold[shade]).toBe('string');
      });
    });
  });

  describe('Responsive Breakpoints', () => {
    test('custom breakpoints are defined', () => {
      expect(theme?.screens).toBeDefined();
      const screens = theme?.screens as Record<string, string>;
      
      expect(screens.xs).toBe('320px');
      expect(screens.sm).toBe('640px');
      expect(screens.md).toBe('768px');
      expect(screens.lg).toBe('1024px');
    });
  });

  describe('Perspective Utilities', () => {
    test('custom perspective values are defined', () => {
      expect(theme?.perspective).toBeDefined();
      const perspective = theme?.perspective as Record<string, string>;
      
      expect(perspective['1000']).toBe('1000px');
      expect(perspective['1500']).toBe('1500px');
      expect(perspective['2000']).toBe('2000px');
    });
  });

  describe('Font Families', () => {
    test('serif font family includes Playfair Display', () => {
      expect(theme?.fontFamily).toBeDefined();
      const fontFamily = theme?.fontFamily as Record<string, string[]>;
      
      expect(fontFamily.serif).toBeDefined();
      expect(fontFamily.serif).toContain('Playfair Display');
      expect(fontFamily.serif).toContain('Georgia');
      expect(fontFamily.serif).toContain('serif');
    });

    test('sans font family includes Montserrat', () => {
      const fontFamily = theme?.fontFamily as Record<string, string[]>;
      
      expect(fontFamily.sans).toBeDefined();
      expect(fontFamily.sans).toContain('Montserrat');
      expect(fontFamily.sans).toContain('Arial');
      expect(fontFamily.sans).toContain('sans-serif');
    });
  });

  describe('Content Paths', () => {
    test('content paths include required directories', () => {
      expect(config.content).toBeDefined();
      const content = config.content as string[];
      
      expect(content).toContain('./pages/**/*.{js,ts,jsx,tsx,mdx}');
      expect(content).toContain('./components/**/*.{js,ts,jsx,tsx,mdx}');
      expect(content).toContain('./app/**/*.{js,ts,jsx,tsx,mdx}');
    });
  });
});
