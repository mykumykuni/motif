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

type ButtonVariant = 'primary' | 'secondary' | 'textLink' | 'outlined' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

// Light blue bg for secondary (dark-theme tuned)
const SECONDARY_BG = 'rgba(0, 96, 239, 0.20)';

const BG_COLOR: Record<ButtonVariant, string> = {
  primary:   colors.primary,
  secondary: SECONDARY_BG,
  textLink:  colors.transparent,
  outlined:  colors.transparent,
  ghost:     colors.glass.light,
};

const TEXT_COLOR: Record<ButtonVariant, string> = {
  primary:   colors.white,
  secondary: colors.primaryLight,
  textLink:  colors.primaryLight,
  outlined:  colors.primaryLight,
  ghost:     colors.text.primary,
};

const BORDER_COLOR: Record<ButtonVariant, string | undefined> = {
  primary:   undefined,
  secondary: colors.primaryDim,
  textLink:  undefined,
  outlined:  colors.primary,
  ghost:     colors.border,
};

const SIZE_PADDING: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number }> = {
  sm: { paddingVertical: spacing.xs,  paddingHorizontal: spacing.sm },
  md: { paddingVertical: spacing.sm,  paddingHorizontal: spacing.md },
  lg: { paddingVertical: 12,           paddingHorizontal: spacing.lg },
};

const FONT_SIZE: Record<ButtonSize, number> = {
  sm: typography.sizes.sm,
  md: typography.sizes.base,
  lg: typography.sizes.lg,
};

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
  const hasBorder = !!BORDER_COLOR[variant];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        SIZE_PADDING[size],
        {
          backgroundColor: BG_COLOR[variant],
          borderWidth:     hasBorder ? 1 : 0,
          borderColor:     BORDER_COLOR[variant] ?? 'transparent',
          opacity:         disabled ? 0.5 : pressed ? 0.85 : 1,
          width:           fullWidth ? '100%' : undefined,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={1}
    >
      {loading && (
        <ActivityIndicator color={TEXT_COLOR[variant]} size="small" style={styles.spinner} />
      )}
      <RNText
        style={[
          styles.label,
          { color: TEXT_COLOR[variant], fontSize: FONT_SIZE[size] },
          variant === 'textLink' && styles.underline,
          textStyle,
        ]}
      >
        {label}
      </RNText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  label: {
    fontWeight: '700',
    textAlign: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  spinner: {
    marginRight: spacing.xs,
  },
});
