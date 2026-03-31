import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '../../styles/theme';

interface PostComponentProps {
  id: string;
  authorName: string;
  authorAvatar?: ImageSourcePropType;
  authorBadge?: 'artist' | 'verified';
  timeAgo: string;
  content: string;
  images?: ImageSourcePropType[];
  linkedSong?: {
    title: string;
    artist: string;
    cover?: ImageSourcePropType;
  };
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onAuthorPress?: () => void;
  style?: ViewStyle;
}

export const PostComponent: React.FC<PostComponentProps> = ({
  id,
  authorName,
  authorAvatar,
  authorBadge,
  timeAgo,
  content,
  images,
  linkedSong,
  likes,
  comments,
  shares,
  isLiked = false,
  onLike,
  onComment,
  onShare,
  onAuthorPress,
  style,
}) => {
  const [showMoreComments, setShowMoreComments] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.authorInfo} onPress={onAuthorPress} activeOpacity={0.7}>
          {authorAvatar ? (
            <Image source={authorAvatar} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholderAvatar]} />
          )}

          <View style={styles.authorMeta}>
            <View style={styles.authorNameRow}>
              <Text style={styles.authorName}>{authorName}</Text>
              {authorBadge === 'verified' && <Text style={styles.badge}>✓</Text>}
              {authorBadge === 'artist' && <Text style={styles.artistBadge}>🎤</Text>}
            </View>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('More options')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.moreIcon}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text style={styles.content}>{content}</Text>

      {/* Images */}
      {images && images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}
          scrollEventThrottle={16}
        >
          {images.map((image, idx) => (
            <Image
              key={idx}
              source={image}
              style={[
                styles.contentImage,
                { marginRight: idx < images.length - 1 ? spacing.sm : 0 },
              ]}
            />
          ))}
        </ScrollView>
      )}

      {/* Linked Song Card */}
      {linkedSong && (
        <TouchableOpacity style={styles.songCard} activeOpacity={0.7}>
          {linkedSong.cover ? (
            <Image source={linkedSong.cover} style={styles.songCover} />
          ) : (
            <View style={[styles.songCover, styles.placeholderCover]} />
          )}

          <View style={styles.songInfo}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {linkedSong.title}
            </Text>
            <Text style={styles.songArtist} numberOfLines={1}>
              {linkedSong.artist}
            </Text>
          </View>

          <Text style={styles.playIcon}>▶</Text>
        </TouchableOpacity>
      )}

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.statText}>{likes} likes</Text>
        <Text style={styles.statDot}>•</Text>
        <Text style={styles.statText}>{comments} comments</Text>
        <Text style={styles.statDot}>•</Text>
        <Text style={styles.statText}>{shares} shares</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, isLiked && styles.actionButtonActive]}
          onPress={onLike}
        >
          <Text style={[styles.actionIcon, isLiked && styles.actionIconActive]}>♥</Text>
          <Text style={styles.actionLabel}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onComment}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionLabel}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <Text style={styles.actionIcon}>↗</Text>
          <Text style={styles.actionLabel}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  authorInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  placeholderAvatar: {
    backgroundColor: colors.primary[200],
  },
  authorMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  authorName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.primary[900],
  },
  badge: {
    fontSize: typography.sizes.sm,
    color: colors.info,
  },
  artistBadge: {
    fontSize: typography.sizes.sm,
  },
  timeAgo: {
    fontSize: typography.sizes.sm,
    color: colors.primary[500],
  },
  moreIcon: {
    fontSize: typography.sizes.lg,
    color: colors.primary[400],
    paddingLeft: spacing.md,
  },
  content: {
    fontSize: typography.sizes.base,
    lineHeight: typography.lineHeights.normal,
    color: colors.primary[900],
    marginBottom: spacing.md,
    fontWeight: typography.weights.regular,
  },
  imagesContainer: {
    marginBottom: spacing.md,
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  contentImage: {
    width: 240,
    height: 240,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary[100],
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glass.light,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  songCover: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  placeholderCover: {
    backgroundColor: colors.primary[200],
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary[900],
    marginBottom: spacing.xs,
  },
  songArtist: {
    fontSize: typography.sizes.xs,
    color: colors.primary[600],
  },
  playIcon: {
    fontSize: typography.sizes.lg,
    color: colors.accent.sage,
    marginLeft: spacing.md,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderColor: colors.primary[100],
    marginBottom: spacing.md,
  },
  statText: {
    fontSize: typography.sizes.sm,
    color: colors.primary[600],
  },
  statDot: {
    color: colors.primary[300],
    marginHorizontal: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: colors.primary[100],
    paddingVertical: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  actionButtonActive: {
    backgroundColor: colors.glass.light,
    borderRadius: borderRadius.md,
  },
  actionIcon: {
    fontSize: typography.sizes.lg,
    color: colors.primary[500],
  },
  actionIconActive: {
    color: colors.accent.blush,
  },
  actionLabel: {
    fontSize: typography.sizes.sm,
    color: colors.primary[700],
    fontWeight: typography.weights.medium,
  },
});
