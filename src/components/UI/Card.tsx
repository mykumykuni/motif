import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, borderRadius, shadows, spacing } from '../../styles/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary';
  pressable?: boolean;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  primary: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  variant = 'primary',
  pressable = false,
  onPress,
}: GlassCardProps) => {
  const variantStyle = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <View
      style={[
        styles.container,
        variantStyle,
        shadows.md,
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface SurfaceProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const surfaceStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
  },
});

export const Surface: React.FC<SurfaceProps> = ({ children, style }: SurfaceProps) => (
  <View style={[surfaceStyles.container, shadows.sm, style]}>
    {children}
  </View>
);

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
}

const containerStyles = StyleSheet.create({
  base: {
    flex: 1,
  },
});

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  padding = 'lg',
}: ContainerProps) => (
  <View style={[containerStyles.base, { padding: spacing[padding as keyof typeof spacing] }, style]}>
    {children}
  </View>
);
