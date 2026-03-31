import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useMusic } from '../../src/context/MusicContext';
import { colors, spacing, borderRadius, typography, shadows } from '../../src/styles/theme';

// Mock data for demonstration
const FEATURED_PLAYLISTS = [
  { id: '1', name: 'Chill Vibes', songs: 42 },
  { id: '2', name: 'Workout Mix', songs: 28 },
  { id: '3', name: 'Focus Music', songs: 35 },
  { id: '4', name: 'Late Night', songs: 51 },
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Music</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs, artists..."
          placeholderTextColor={colors.primary[400]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'browse' && styles.tabActive]}
          onPress={() => setActiveTab('browse')}
        >
          <Text style={[styles.tabText, activeTab === 'browse' && styles.tabTextActive]}>
            Browse
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'search' && styles.tabActive]}
          onPress={() => setActiveTab('search')}
        >
          <Text style={[styles.tabText, activeTab === 'search' && styles.tabTextActive]}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'browse' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Featured Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Playlists</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.playlistsScroll}
            >
              {FEATURED_PLAYLISTS.map((playlist) => (
                <TouchableOpacity key={playlist.id} style={styles.playlistCard}>
                  <View style={styles.playlistCover} />
                  <Text style={styles.playlistName} numberOfLines={2}>
                    {playlist.name}
                  </Text>
                  <Text style={styles.playlistCount}>{playlist.songs} songs</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recently Played */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Played</Text>
            {RECENT_TRACKS.map((track) => (
              <TouchableOpacity
                key={track.id}
                style={[
                  styles.trackItem,
                  currentTrack?.id === track.id && styles.trackItemActive,
                ]}
                onPress={() => handlePlayTrack(track)}
              >
                <View style={styles.trackThumbnail} />
                <View style={styles.trackInfo}>
                  <Text
                    style={[
                      styles.trackTitle,
                      currentTrack?.id === track.id && {
                        color: colors.accent.sage,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {track.title}
                  </Text>
                  <Text style={styles.trackArtist} numberOfLines={1}>
                    {track.artist}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.playIcon}>{isPlaying && currentTrack?.id === track.id ? '⏸' : '▶'}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.searchEmptyState}>
          <Text style={styles.searchEmptyText}>Search for songs, artists, or playlists</Text>
        </View>
      )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    fontSize: typography.sizes.base,
    color: colors.primary[900],
    borderWidth: 1,
    borderColor: colors.primary[200],
    ...shadows.sm,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent.sage,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  filterIcon: {
    fontSize: 20,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary[100],
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.accent.sage,
  },
  tabText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.primary[400],
  },
  tabTextActive: {
    color: colors.accent.sage,
  },
  content: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.primary[900],
    marginBottom: spacing.md,
  },
  playlistsScroll: {
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  playlistCard: {
    width: 140,
    marginRight: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  playlistCover: {
    width: '100%',
    height: 140,
    backgroundColor: colors.primary[200],
  },
  playlistName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary[900],
    padding: spacing.sm,
  },
  playlistCount: {
    fontSize: typography.sizes.xs,
    color: colors.primary[500],
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  trackItemActive: {
    backgroundColor: colors.glass.light,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent.sage,
    paddingLeft: spacing.lg - 3,
  },
  trackThumbnail: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary[200],
    marginRight: spacing.md,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.primary[900],
    marginBottom: spacing.xs,
  },
  trackArtist: {
    fontSize: typography.sizes.sm,
    color: colors.primary[600],
  },
  playIcon: {
    fontSize: 18,
    color: colors.accent.sage,
  },
  searchEmptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  searchEmptyText: {
    fontSize: typography.sizes.base,
    color: colors.primary[400],
    fontWeight: typography.weights.medium,
  },
});
