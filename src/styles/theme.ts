/**
 * MOTIF Design System Tokens — Dark Glassmorphism
 */

// ─── Color Tokens ────────────────────────────────────────────────────────────
export const colors = {
  // Brand
  primary:      '#0060EF',
  primaryLight: '#3D8EF5',
  primaryDim:   'rgba(0, 96, 239, 0.25)',
  accent:       '#0060EF',  // alias — update here to change accent globally

  // Backgrounds
  background:         '#0A0A0F',
  backgroundElevated: '#12121A',
  backgroundSheet:    '#1A1A24',
  surface:            'rgba(255, 255, 255, 0.08)',
  surfaceActive:      'rgba(255, 255, 255, 0.14)',

  // Text
  text: {
    primary:   '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.55)',
    tertiary:  'rgba(255, 255, 255, 0.30)',
  },

  // Border
  border:        'rgba(255, 255, 255, 0.10)',
  borderFocused: 'rgba(0, 96, 239, 0.70)',

  // Focus
  focusRing: 'rgba(0, 96, 239, 0.45)',

  // Semantic — Apple dark mode system palette
  success:      '#30D158',
  successLight: 'rgba(48, 209, 88, 0.15)',
  warning:      '#FFD60A',
  warningLight: 'rgba(255, 214, 10, 0.15)',
  error:        '#FF453A',
  errorLight:   'rgba(255, 69, 58, 0.15)',
  info:         '#0A84FF',
  infoLight:    'rgba(10, 132, 255, 0.15)',

  // Base
  white:       '#FFFFFF',
  black:       '#000000',
  transparent: 'transparent',

  // Glass overlays
  glass: {
    subtle: 'rgba(255, 255, 255, 0.05)',
    light:  'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.14)',
    strong: 'rgba(255, 255, 255, 0.22)',
    dark:   'rgba(0, 0, 0, 0.40)',
  },
};

// ─── Spacing (4px grid) ──────────────────────────────────────────────────────
export const spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

// ─── Typography ──────────────────────────────────────────────────────────────
export const typography = {
  // Named scale
  h1:       { fontSize: 32, fontWeight: '700' as const, lineHeight: 40 },
  h2:       { fontSize: 24, fontWeight: '700' as const, lineHeight: 32 },
  subtitle: { fontSize: 18, fontWeight: '500' as const, lineHeight: 26 },
  body1:    { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  body2:    { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption:  { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  button:   { fontSize: 16, fontWeight: '700' as const, lineHeight: 24 },

  // Legacy helpers (used by existing components)
  sizes: {
    xs:    12,
    sm:    14,
    base:  16,
    lg:    18,
    xl:    20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  weights: {
    regular:  '400' as const,
    medium:   '500' as const,
    semibold: '600' as const,
    bold:     '700' as const,
  },
  lineHeights: {
    tight:   1.2,
    normal:  1.5,
    relaxed: 1.75,
    loose:   2,
  },
};

// ─── Border Radius ───────────────────────────────────────────────────────────
export const borderRadius = {
  none: 0,
  xs:   4,
  sm:   4,
  md:   8,
  lg:   16,
  xl:   20,
  '2xl': 24,
  full: 9999,
};

export const radius = borderRadius;

// ─── Elevation / Shadows ─────────────────────────────────────────────────────
export const elevation = {
  0: {} as object,
  1: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius:  4,
    elevation:     2,
  },
  2: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius:  12,
    elevation:     6,
  },
  3: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 12 },
    shadowOpacity: 0.50,
    shadowRadius:  24,
    elevation:     12,
  },
};

// Legacy alias
export const shadows = {
  none: elevation[0],
  sm:   elevation[1],
  md:   elevation[2],
  lg:   elevation[3],
  xl: {
    shadowColor:   '#000000',
    shadowOffset:  { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius:  24,
    elevation:     12,
  },
};

// ─── Animations ──────────────────────────────────────────────────────────────
export const animations = {
  fast:   200,
  normal: 300,
  slow:   500,
  slower: 800,
};

// ─── Gradient Presets ─────────────────────────────────────────────────────────
export const gradients = {
  hero:       ['rgba(0,96,239,0.55)', 'rgba(80,0,180,0.30)', 'transparent'] as const,
  heroAlt:    ['rgba(80,0,180,0.45)', 'rgba(0,96,239,0.25)', 'transparent'] as const,
  heroWarm:   ['rgba(180,0,80,0.40)', 'rgba(80,0,180,0.30)', 'transparent'] as const,
  card:       ['rgba(0,96,239,0.45)', 'rgba(0,30,100,0.85)'] as const,
  playBtn:    ['#0060EF', '#004EC2'] as const,
  dark:       ['#12121A', '#0A0A0F'] as const,
  sheet:      ['#1A1A24', '#12121A'] as const,
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  radius,
  elevation,
  shadows,
  animations,
};

export type Theme = typeof theme;
