import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../styles/theme';

interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  // Sizes
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  // Variants
  primary: {
    backgroundColor: colors.primary[700],
  },
  secondary: {
    backgroundColor: colors.accent.sage,
    borderWidth: 1,
    borderColor: colors.primary[300],
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[300],
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
});

const textStyles = StyleSheet.create({
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  sm: {
    fontSize: typography.sizes.sm,
  },
  md: {
    fontSize: typography.sizes.base,
  },
  lg: {
    fontSize: typography.sizes.lg,
  },
  primary: {
    color: colors.white,
  },
  secondary: {
    color: colors.primary[900],
  },
  ghost: {
    color: colors.primary[700],
  },
});

export const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => setPressed(true);
  const handlePressOut = () => setPressed(false);

  const buttonStyle = [
    styles.button,
    styles[size as keyof typeof styles],
    styles[variant as keyof typeof styles],
    ...(disabled ? [styles.disabled] : []),
    ...(pressed ? [{ opacity: 0.8 }] : []),
    ...(fullWidth ? [styles.fullWidth] : []),
    ...(style ? [style] : []),
  ] as any;

  const textColor = {
    primary: colors.white,
    secondary: colors.primary[900],
    ghost: colors.primary[700],
  }[variant];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : null}
      <RNText
        style={[
          textStyles.text,
          textStyles[size as keyof typeof textStyles],
          { color: textColor },
          textStyle,
        ]}
      >
        {label}
      </RNText>
    </TouchableOpacity>
  );
};
