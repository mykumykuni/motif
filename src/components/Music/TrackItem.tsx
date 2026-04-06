import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/theme';

interface TrackItemProps {
  title: string;
  artist: string;
  coverArt?: ImageSourcePropType;
  duration?: number;
  isPlaying?: boolean;
  onPress?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
  style?: ViewStyle;
}

export const TrackItem: React.FC<TrackItemProps> = ({
  title,
  artist,
  coverArt,
  duration,
  isPlaying = false,
  onPress,
  onLike,
  isLiked = false,
  style,
}) => {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, isPlaying && styles.playing, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {coverArt ? (
        <Image source={coverArt} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.placeholderCover]} />
      )}

      <View style={styles.info}>
        <Text
          style={[
            styles.title,
            { color: isPlaying ? colors.primary : colors.text.primary },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artist}
        </Text>
      </View>

      <View style={styles.actions}>
        <Text style={styles.duration}>{formatDuration(duration)}</Text>
        <TouchableOpacity onPress={onLike} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.likeIcon}>{isLiked ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.backgroundElevated,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  playing: {
    backgroundColor: colors.primaryDim,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  placeholderCover: {
    backgroundColor: colors.glass.medium,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
  },
  artist: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontWeight: typography.weights.regular,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  duration: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    minWidth: 40,
    textAlign: 'right',
  },
  likeIcon: {
    fontSize: 18,
    color: colors.primary,
  },
});
