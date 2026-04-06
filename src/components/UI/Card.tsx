import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, spacing, borderRadius, elevation } from '../../styles/theme';
import { Text } from './Text';
import { Button } from './Button';
import { Chip } from './Chip';

// ─── Content Card ─────────────────────────────────────────────────────────────

interface ContentCardProps {
  image?: ImageSourcePropType;
  title: string;
  description?: string;
  style?: ViewStyle;
  onPress?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  image,
  title,
  description,
  style,
  onPress,
}) => (
  <TouchableOpacity
    style={[contentStyles.card, elevation[2], style]}
    onPress={onPress}
    activeOpacity={onPress ? 0.8 : 1}
    disabled={!onPress}
  >
    {image ? (
      <Image source={image} style={contentStyles.image} />
    ) : (
      <View style={contentStyles.imagePlaceholder} />
    )}
    <View style={contentStyles.body}>
      <Text variant="h2" style={contentStyles.title}>{title}</Text>
      {description && (
        <Text variant="body1" color={colors.text.secondary}>{description}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const contentStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: colors.glass.medium,
  },
  body: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  title: {
    marginBottom: spacing.xs,
  },
});

// ─── Interactive Card ─────────────────────────────────────────────────────────

interface DataPoint {
  label: string;
  value: string;
}

interface InteractiveCardProps {
  headerTitle: string;
  dataPoints?: DataPoint[];
  status?: string;
  onCancel?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  style?: ViewStyle;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  headerTitle,
  dataPoints = [],
  status,
  onCancel,
  onAction,
  actionLabel = 'Actions',
  style,
}) => (
  <View style={[interactiveStyles.card, elevation[2], style]}>
    <View style={interactiveStyles.header}>
      <Text variant="h2" color={colors.white}>{headerTitle}</Text>
    </View>
    <View style={interactiveStyles.body}>
      {dataPoints.length > 0 && (
        <View style={interactiveStyles.dataRow}>
          {dataPoints.map((dp) => (
            <View key={dp.label} style={interactiveStyles.dataPoint}>
              <Text variant="caption" color={colors.text.secondary}>{dp.label}</Text>
              <Text variant="body1" weight="semibold">{dp.value}</Text>
            </View>
          ))}
        </View>
      )}
      {status && (
        <View style={interactiveStyles.statusRow}>
          <Text variant="body2" color={colors.text.secondary}>Status</Text>
          <Chip label={status} variant="action" />
        </View>
      )}
    </View>
    {(onCancel || onAction) && (
      <View style={interactiveStyles.footer}>
        {onCancel && (
          <Button label="Cancel" variant="outlined" size="sm" onPress={onCancel} />
        )}
        {onAction && (
          <Button label={actionLabel} variant="primary" size="sm" onPress={onAction} />
        )}
      </View>
    )}
  </View>
);

const interactiveStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    backgroundColor: colors.primaryDim,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  body: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  dataRow: {
    flexDirection: 'row',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  dataPoint: {
    gap: 2,
    minWidth: 60,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});

// ─── Legacy: GlassCard / Surface / Container ─────────────────────────────────

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary';
  pressable?: boolean;
  onPress?: () => void;
}

const glassStyles = StyleSheet.create({
  outer: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  blur: {
    flex: 1,
  },
  overlay: {
    backgroundColor: colors.glass.light,
  },
  secondaryOverlay: {
    backgroundColor: colors.glass.subtle,
  },
});

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  variant = 'primary',
  onPress,
}) => {
  const inner = (
    <BlurView intensity={30} tint="dark" style={glassStyles.blur}>
      <View style={variant === 'primary' ? glassStyles.overlay : glassStyles.secondaryOverlay}>
        {children}
      </View>
    </BlurView>
  );

  return onPress ? (
    <TouchableOpacity style={[glassStyles.outer, elevation[2], style]} onPress={onPress} activeOpacity={0.8}>
      {inner}
    </TouchableOpacity>
  ) : (
    <View style={[glassStyles.outer, elevation[2], style]}>
      {inner}
    </View>
  );
};

interface SurfaceProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Surface: React.FC<SurfaceProps> = ({ children, style }) => (
  <View
    style={[
      {
        backgroundColor: colors.backgroundElevated,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border,
      },
      elevation[1],
      style,
    ]}
  >
    {children}
  </View>
);

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  padding = 'lg',
}) => (
  <View style={[{ flex: 1, padding: spacing[padding] }, style]}>
    {children}
  </View>
);
