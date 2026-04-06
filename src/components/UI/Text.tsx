import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { colors, typography } from '../../styles/theme';

type TextVariant =
  | 'h1' | 'h2' | 'subtitle' | 'body1' | 'body2' | 'caption' | 'button'
  // legacy aliases kept for backward compat
  | 'heading' | 'title' | 'body' | 'label';

interface TextProps {
  variant?: TextVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
}

const VARIANT_STYLES: Record<TextVariant, TextStyle> = {
  h1:       { ...typography.h1 },
  h2:       { ...typography.h2 },
  subtitle: { ...typography.subtitle },
  body1:    { ...typography.body1 },
  body2:    { ...typography.body2 },
  caption:  { ...typography.caption },
  button:   { ...typography.button },
  // legacy
  heading:  { ...typography.h1 },
  title:    { ...typography.h2 },
  body:     { ...typography.body1 },
  label:    { fontSize: 14, fontWeight: '500', lineHeight: 18 },
};

const WEIGHT_MAP: Record<string, TextStyle['fontWeight']> = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
};

export const Text: React.FC<TextProps> = ({
  variant = 'body1',
  color = colors.text.primary,
  align = 'left',
  weight,
  children,
  style,
  numberOfLines,
}) => (
  <RNText
    style={[
      VARIANT_STYLES[variant],
      { color, textAlign: align },
      weight ? { fontWeight: WEIGHT_MAP[weight] } : undefined,
      style,
    ]}
    numberOfLines={numberOfLines}
  >
    {children}
  </RNText>
);

// Named scale shortcuts
export const H1: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="h1" {...p} />;
export const H2: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="h2" {...p} />;
export const Subtitle: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="subtitle" {...p} />;
export const Body1: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="body1" {...p} />;
export const Body2: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="body2" {...p} />;
export const Caption: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="caption" {...p} />;
export const ButtonText: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="button" {...p} />;

// Legacy aliases
export const Heading: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="h1" {...p} />;
export const Title: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="h2" {...p} />;
export const Body: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="body1" {...p} />;
export const Label: React.FC<Omit<TextProps, 'variant'>> = (p) => <Text variant="label" {...p} />;
