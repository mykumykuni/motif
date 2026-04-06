import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSocial } from '../../src/context/SocialContext';
import { PostComponent } from '../../src/components/Social/PostComponent';
import { colors, spacing, borderRadius, typography, elevation } from '../../src/styles/theme';
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
    content: 'Just dropped my new single "Midnight Dreams"! Available on all platforms now.',
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
    content: 'This playlist has been my mood all week.',
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
    content: 'Live set tonight at 8PM on our channel. Join us.',
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
            placeholderTextColor={colors.text.secondary}
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={displayPosts}
        renderItem={renderPost}
        keyExtractor={(item: Post) => item.id}
        ListHeaderComponent={renderHeader}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: spacing.lg }}
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
            tintColor={colors.primary}
            colors={[colors.primary]}
            progressBackgroundColor={colors.backgroundElevated}
          />
        }
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { ...typography.h1, color: colors.text.primary },
  composerContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  composerInput: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  composerAvatar: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  composerField: {
    flex: 1,
    minHeight: 40,
    color: colors.text.primary,
    ...typography.body1,
    paddingVertical: spacing.sm,
  },
  composerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: { ...typography.button, color: colors.text.secondary },
  postButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
  },
  postButtonText: { ...typography.button, color: colors.white },
  postButtonDisabled: { opacity: 0.45 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginHorizontal: spacing.lg },
  listContent: { paddingBottom: 120 },
  lastPost: { marginBottom: 0 },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    gap: spacing.md,
  },
  emptyStateText: { ...typography.body1, color: colors.text.secondary, textAlign: 'center' },
});
