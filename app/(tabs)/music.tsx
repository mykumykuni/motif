import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMusic } from '../../src/context/MusicContext';
import { colors, spacing, borderRadius, typography, elevation } from '../../src/styles/theme';

const FEATURED_PLAYLISTS = [
  { id: '1', name: 'Chill Vibes', songs: 42 },
  { id: '2', name: 'Workout Mix', songs: 28 },
  { id: '3', name: 'Focus Music', songs: 35 },
  { id: '4', name: 'Late Night', songs: 51 },
];

const PLAYLIST_GRADIENTS: [string, string][] = [
  ['#0060EF', '#003380'],
  ['#30D158', '#1A7A32'],
  ['#FF453A', '#8B1A15'],
  ['#BF5AF2', '#6B2FA0'],
];

const RECENT_TRACKS = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', duration: 200 },
  { id: '2', title: 'Levitating', artist: 'Dua Lipa', duration: 203 },
  { id: '3', title: 'Anti-Hero', artist: 'Taylor Swift', duration: 213 },
];

export default function MusicBrowseScreen() {
  const { playTrack, currentTrack, isPlaying } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'browse' | 'search'>('browse');
  const [focused, setFocused] = useState(false);

  const handlePlayTrack = useCallback((track: any) => {
    playTrack({
      id: track.id,
      title: track.title,
      artist: { id: '1', name: track.artist, followers: 0 },
      album: { id: '1', title: 'Album', artist: track.artist, releaseDate: '2024-01-01', tracks: [] },
      duration: track.duration,
      audioUrl: '',
      releaseDate: '',
      genre: 'Pop',
      playCount: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
    });
  }, [playTrack]);

  const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(0,96,239,0.20)', 'transparent']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Music</Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, focused && styles.searchBarFocused]}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Songs, artists, playlists..."
            placeholderTextColor={colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['browse', 'search'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'browse' ? 'Browse' : 'Search'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'browse' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Featured Playlists */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Playlists</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.playlistsScroll}
            >
              {FEATURED_PLAYLISTS.map((playlist, i) => (
                <TouchableOpacity key={playlist.id} style={styles.playlistCard} activeOpacity={0.75}>
                  <LinearGradient
                    colors={PLAYLIST_GRADIENTS[i % PLAYLIST_GRADIENTS.length]}
                    style={styles.playlistCover}
                  >
                    <MaterialCommunityIcons name="music" size={36} color="rgba(255,255,255,0.55)" />
                  </LinearGradient>
                  <Text style={styles.playlistName} numberOfLines={2}>{playlist.name}</Text>
                  <Text style={styles.playlistCount}>{playlist.songs} songs</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recently Played */}
          <View style={[styles.section, styles.sectionLast]}>
            <Text style={styles.sectionTitle}>Recently Played</Text>
            {RECENT_TRACKS.map((track) => {
              const isActive = currentTrack?.id === track.id;
              return (
                <TouchableOpacity
                  key={track.id}
                  style={[styles.trackItem, isActive && styles.trackItemActive]}
                  onPress={() => handlePlayTrack(track)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.trackThumbnail, isActive && styles.trackThumbnailActive]}>
                    <MaterialCommunityIcons
                      name={isActive && isPlaying ? 'pause' : 'play'}
                      size={20}
                      color={isActive ? colors.primary : colors.text.secondary}
                    />
                  </View>
                  <View style={styles.trackInfo}>
                    <Text style={[styles.trackTitle, isActive && styles.trackTitleActive]} numberOfLines={1}>
                      {track.title}
                    </Text>
                    <Text style={styles.trackArtist} numberOfLines={1}>{track.artist}</Text>
                  </View>
                  <Text style={styles.trackDuration}>{formatDuration(track.duration)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="magnify" size={48} color={colors.text.tertiary} />
          <Text style={styles.emptyText}>Search for songs, artists, or playlists</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.glass.light,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchBarFocused: {
    borderColor: colors.primary,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    marginBottom: spacing.md,
  },
  tab: {
    paddingVertical: spacing.sm,
    marginRight: spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionLast: {
    paddingBottom: spacing.xxl + spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  playlistsScroll: {
    paddingRight: spacing.lg,
    gap: spacing.md,
  },
  playlistCard: {
    width: 140,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
    ...elevation[2],
  },
  playlistCover: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    padding: spacing.sm,
  },
  playlistCount: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.backgroundElevated,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...elevation[1],
  },
  trackItemActive: {
    backgroundColor: colors.primaryDim,
    borderColor: colors.primaryDim,
  },
  trackThumbnail: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.glass.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  trackThumbnailActive: {
    backgroundColor: colors.primaryDim,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  trackTitleActive: {
    color: colors.primaryLight,
  },
  trackArtist: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  trackDuration: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
    minWidth: 36,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  emptyText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

