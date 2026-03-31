import React from 'react';
import { StyleSheet, Text as RNText, ViewStyle, TextStyle } from 'react-native';
import { colors, typography } from '../../styles/theme';

interface TextProps {
  variant?: 'heading' | 'title' | 'subtitle' | 'body' | 'caption' | 'label';
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
}

const variantStyles: Record<string, TextStyle> = {
  heading: {
    fontSize: typography.sizes['4xl'],
    fontWeight: '700',
    lineHeight: typography.sizes['4xl'] * typography.lineHeights.tight,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: '600',
    lineHeight: typography.sizes['2xl'] * typography.lineHeights.tight,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    lineHeight: typography.sizes.lg * typography.lineHeights.normal,
  },
  body: {
    fontSize: typography.sizes.base,
    fontWeight: '400',
    lineHeight: typography.sizes.base * typography.lineHeights.normal,
  },
  caption: {
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    lineHeight: typography.sizes.sm * typography.lineHeights.normal,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: '500',
    lineHeight: typography.sizes.sm * typography.lineHeights.tight,
  },
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = colors.primary[900],
  align = 'left',
  weight = 'regular',
  children,
  style,
  numberOfLines,
}) => {
  const variantStyle = variantStyles[variant];
  const customStyle: TextStyle = {
    ...variantStyle,
    color,
    textAlign: align,
    fontWeight: weight === 'regular' ? '400' : weight === 'medium' ? '500' : weight === 'semibold' ? '600' : '700',
  };

  return (
    <RNText
      style={[customStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

export const Heading: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="heading" {...props} />
);

export const Title: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="title" {...props} />
);

export const Subtitle: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="subtitle" {...props} />
);

export const Caption: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="caption" {...props} />
);

export const Label: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="label" {...props} />
);

export const Body: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="body" {...props} />
);
