import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../styles/theme';
import { Text } from './Text';

type ChipVariant = 'action' | 'selected' | 'input';

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  onPress?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
}

const CONFIG: Record<ChipVariant, { bg: string; border: string; textColor: string }> = {
  action: {
    bg:        colors.surface,
    border:    colors.text.secondary,
    textColor: colors.text.primary,
  },
  selected: {
    bg:        '#3D3D40',
    border:    '#3D3D40',
    textColor: colors.white,
  },
  input: {
    bg:        colors.surface,
    border:    colors.text.secondary,
    textColor: colors.text.primary,
  },
};

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'action',
  onPress,
  onClose,
  style,
}) => {
  const cfg = CONFIG[variant];
  return (
    <TouchableOpacity
      style={[
        styles.base,
        { backgroundColor: cfg.bg, borderColor: cfg.border },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress && variant !== 'action'}
    >
      <Text variant="body2" color={cfg.textColor} style={styles.label}>
        {label}
      </Text>
      {variant === 'input' && onClose && (
        <Ionicons
          name="close"
          size={14}
          color={cfg.textColor}
          onPress={onClose}
          style={styles.closeIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: '500',
  },
  closeIcon: {
    marginLeft: 4,
  },
});
