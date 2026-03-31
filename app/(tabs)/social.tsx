import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSocial } from '../../src/context/SocialContext';
import { PostComponent } from '../../src/components/Social/PostComponent';
import { colors, spacing, borderRadius, typography, shadows } from '../../src/styles/theme';
import { Post } from '../../src/types';

// Mock posts for demonstration
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      id: 'u1',
      email: 'alex@motif.com',
      username: 'alexmusic',
      displayName: 'Alex Music',
      bio: 'Independent Artist',
      role: 'artist',
      followers: 5420,
      following: 342,
      isVerified: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    content: 'Just dropped my new single "Midnight Dreams"! Available on all platforms now 🎵',
    likes: 342,
    comments: 28,
    shares: 15,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    author: {
      id: 'u2',
      email: 'musiclover@motif.com',
      username: 'musiclover',
      displayName: 'Music Lover',
      role: 'listener',
      followers: 120,
      following: 340,
      isVerified: false,
      createdAt: '2024-02-01',
      updatedAt: '2024-02-01',
    },
    content: 'This playlist has been my mood all week! 🎧✨',
    likes: 89,
    comments: 12,
    shares: 5,
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '3',
    author: {
      id: 'u3',
      email: 'djecho@motif.com',
      username: 'djecho',
      displayName: 'DJ Echo',
      bio: 'Electronic Music Producer',
      role: 'artist',
      followers: 8900,
      following: 423,
      isVerified: true,
      createdAt: '2023-12-01',
      updatedAt: '2024-01-15',
    },
    content: 'Live set tonight at 8PM on our channel! Join us 🎵🎧',
    likes: 256,
    comments: 42,
    shares: 89,
    createdAt: '2024-01-15T06:00:00Z',
    updatedAt: '2024-01-15T06:00:00Z',
  },
];

export default function SocialFeedScreen() {
  const { feed, isLoadingFeed, refreshFeed, likePost, createPost } = useSocial();
  const [refreshing, setRefreshing] = useState(false);
  const [postText, setPostText] = useState('');
  const [isComposingPost, setIsComposingPost] = useState(false);

  useEffect(() => {
    // Load feed on mount
    refreshFeed();
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshFeed();
    } finally {
      setRefreshing(false);
    }
  }, [refreshFeed]);

  const handleCreatePost = useCallback(async () => {
    if (postText.trim()) {
      try {
        await createPost(postText.trim());
        setPostText('');
        setIsComposingPost(false);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  }, [postText, createPost]);

  const handleLikePost = useCallback(
    (postId: string) => {
      likePost(postId);
    },
    [likePost]
  );

  const renderHeader = () => (
    <View>
      {/* Header Title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>

      {/* Post Composer */}
      <View style={styles.composerContainer}>
        <View style={styles.composerInput}>
          <View style={styles.composerAvatar} />
          <TextInput
            style={styles.composerField}
            placeholder="Share your thoughts about music..."
            placeholderTextColor={colors.primary[400]}
            value={postText}
            onChangeText={setPostText}
            onFocus={() => setIsComposingPost(true)}
            multiline
          />
        </View>

        {isComposingPost && (
          <View style={styles.composerActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setPostText('');
                setIsComposingPost(false);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.postButton, !postText.trim() && styles.postButtonDisabled]}
              onPress={handleCreatePost}
              disabled={!postText.trim()}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.divider} />
    </View>
  );

  const renderPost = ({ item, index }: { item: Post; index: number }) => (
    <PostComponent
      key={item.id}
      id={item.id}
      authorName={item.author.displayName}
      authorBadge={item.author.role === 'artist' ? 'artist' : item.author.isVerified ? 'verified' : undefined}
      timeAgo={new Date(item.createdAt).toLocaleDateString()}
      content={item.content}
      likes={item.likes}
      comments={item.comments}
      shares={item.shares}
      linkedSong={
        item.linkedSong
          ? {
              title: item.linkedSong.title,
              artist: item.linkedSong.artist.name,
              cover: item.linkedSong.coverArt as any,
            }
          : undefined
      }
      onLike={() => handleLikePost(item.id)}
      style={index === MOCK_POSTS.length - 1 ? styles.lastPost : undefined}
    />
  );

  const displayPosts = feed.length > 0 ? feed : MOCK_POSTS;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={displayPosts}
        renderItem={renderPost}
        keyExtractor={(item: Post) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          !isLoadingFeed ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No posts yet. Follow friends to see their updates!</Text>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent.sage}
          />
        }
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary[100],
  },
  headerTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary[900],
  },
  composerContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  composerInput: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  composerAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[200],
    marginTop: spacing.sm,
  },
  composerField: {
    flex: 1,
    minHeight: 44,
    color: colors.primary[900],
    fontSize: typography.sizes.base,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary[200],
    flexWrap: 'wrap',
  },
  composerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary[100],
  },
  cancelButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.primary[700],
  },
  postButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent.sage,
    ...shadows.sm,
  },
  postButtonText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.white,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.primary[100],
  },
  lastPost: {
    marginBottom: spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxxl,
  },
  emptyStateText: {
    fontSize: typography.sizes.base,
    color: colors.primary[400],
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
});
