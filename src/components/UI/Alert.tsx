import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../styles/theme';
import { Text } from './Text';

type AlertVariant = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  variant: AlertVariant;
  message: string;
  title?: string;
  onDismiss?: () => void;
  style?: ViewStyle;
}

type IoniconName =
  | 'checkmark-circle'
  | 'information-circle'
  | 'warning'
  | 'close-circle'
  | 'close';

const CONFIG: Record<
  AlertVariant,
  { bg: string; border: string; icon: IoniconName; iconColor: string; textColor: string; titleColor: string }
> = {
  success: {
    bg:         colors.successLight,
    border:     colors.success,
    icon:       'checkmark-circle',
    iconColor:  colors.success,
    textColor:  colors.text.primary,
    titleColor: colors.success,
  },
  info: {
    bg:         colors.infoLight,
    border:     colors.info,
    icon:       'information-circle',
    iconColor:  colors.info,
    textColor:  colors.text.primary,
    titleColor: colors.info,
  },
  warning: {
    bg:         colors.warningLight,
    border:     colors.warning,
    icon:       'warning',
    iconColor:  colors.warning,
    textColor:  colors.text.primary,
    titleColor: colors.warning,
  },
  error: {
    bg:         colors.errorLight,
    border:     colors.error,
    icon:       'close-circle',
    iconColor:  colors.error,
    textColor:  colors.text.primary,
    titleColor: colors.error,
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant,
  message,
  title,
  onDismiss,
  style,
}) => {
  const cfg = CONFIG[variant];
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cfg.bg, borderLeftColor: cfg.border },
        style,
      ]}
    >
      <Ionicons name={cfg.icon} size={20} color={cfg.iconColor} style={styles.icon} />
      <View style={styles.content}>
        {title && (
          <Text variant="body1" weight="semibold" color={cfg.titleColor}>
            {title}
          </Text>
        )}
        <Text variant="body2" color={cfg.textColor}>{message}</Text>
      </View>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="close" size={18} color={cfg.textColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  icon: {
    marginTop: 1,
  },
  content: {
    flex: 1,
    gap: 2,
  },
});
