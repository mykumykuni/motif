/**
 * MOTIF Design System
 * Liquid-Glass Aesthetic with Muted Palette
 * Neo-Tactile minimal interactions
 */

export const colors = {
  // Primary palette - warm, muted neutrals
  primary: {
    50: '#FAF9F7',
    100: '#F5F2EE',
    200: '#EBE6E0',
    300: '#DDD5CC',
    400: '#CCBFB2',
    500: '#B8A89A',
    600: '#A59486',
    700: '#8B7D74',
    800: '#6B6157',
    900: '#4A4238',
  },

  // Accent palette - soft, muted tones (avoid typical blues)
  accent: {
    sage: '#9CAF88',        // Muted sage green
    blush: '#D9B3A8',       // Soft blush pink
    clay: '#C9A089',        // Warm clay
    stone: '#A39E95',       // Stone gray
    dust: '#D4C9BE',        // Soft dust
    twilight: '#8B8FA3',    // Muted twilight blue
    bronze: '#C8A574',      // Warm bronze
  },

  // Semantic colors
  success: '#A8C96F',       // Muted green
  warning: '#D9A76A',       // Muted amber
  error: '#C97070',         // Muted red
  info: '#8B9DAA',          // Muted blue

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Glass effect overlays
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    dark: 'rgba(0, 0, 0, 0.1)',
  },

  // Gradients for backgrounds
  gradients: {
    background: ['#FAF9F7', '#F5F2EE'],
    card: ['#F9F7F4', '#F0EBE4'],
    overlay: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)'],
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
};

export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  none: 'none',
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
};

export const animations = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800,
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animations,
};

export type Theme = typeof theme;
