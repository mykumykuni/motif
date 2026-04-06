import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet, View, TouchableOpacity,
  FlatList, ActivityIndicator, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '@/src/components/UI';
import { colors, spacing, borderRadius, typography } from '@/src/styles/theme';
import { useAuth } from '@/src/context/AuthContext';
import { useMusicPlayer } from '@/src/context/MusicPlayerContext';
import { fetchUserTracks, fetchLikedTracks } from '@/src/services/music/musicService';
import type { Track } from '@/src/types';

const FILTERS = ['All', 'Playlists', 'Liked Songs', 'Downloads'] as const;
type LibFilter = typeof FILTERS[number];

const MOCK_TRACKS: Track[] = [
  { id: '1', title: 'Starlit Reverie',      artist: { id: 'a1', name: 'Budiarti', username: 'budiarti' }, duration: 210, genre: 'Chill', likes: 0, uploadedBy: '', createdAt: new Date() },
  { id: '2', title: 'Midnight Confessions', artist: { id: 'a2', name: 'Alexiao',  username: 'alexiao' },  duration: 198, genre: 'Pop',   likes: 0, uploadedBy: '', createdAt: new Date() },
  { id: '3', title: 'Lost in the Echo',     artist: { id: 'a2', name: 'Alexiao',  username: 'alexiao' },  duration: 223, genre: 'Indie', likes: 0, uploadedBy: '', createdAt: new Date() },
  { id: '4', title: 'Letters I Never Sent', artist: { id: 'a2', name: 'Alexiao',  username: 'alexiao' },  duration: 185, genre: 'Pop',   likes: 0, uploadedBy: '', createdAt: new Date() },
  { id: '5', title: 'Breaking the Silence', artist: { id: 'a2', name: 'Alexiao',  username: 'alexiao' },  duration: 241, genre: 'Rock',  likes: 0, uploadedBy: '', createdAt: new Date() },
  { id: '6', title: 'Tears on the Vinyl',   artist: { id: 'a2', name: 'Alexiao',  username: 'alexiao' },  duration: 207, genre: 'Soul',  likes: 0, uploadedBy: '', createdAt: new Date() },
  { id: '7', title: 'Lost in Reverie',      artist: { id: 'a2', name: 'Alexiao',  username: 'alexiao' },  duration: 193, genre: 'Chill', likes: 0, uploadedBy: '', createdAt: new Date() },
];

const THUMB_COLORS = [
  ['#7C3AED', '#DB2777'],
  ['#1D4ED8', '#0891B2'],
  ['#065F46', '#0284C7'],
  ['#92400E', '#B45309'],
  ['#831843', '#9D174D'],
  ['#1E3A5F', '#7C3AED'],
  ['#0C4A6E', '#065F46'],
];

function formatDuration(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export default function LibraryScreen() {
  const [activeFilter, setActiveFilter] = useState<LibFilter>('All');
  const { user } = useAuth();
  const { play, setQueue } = useMusicPlayer();
  const router = useRouter();
  const [tracks, setTracks] = useState<Track[]>(MOCK_TRACKS);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (silent = false) => {
    if (!user) return;
    if (!silent) setLoading(true);
    try {
      const [uploads, liked] = await Promise.all([
        fetchUserTracks(user.id),
        fetchLikedTracks(user.id),
      ]);
      const merged = [...uploads, ...liked];
      if (merged.length > 0) setTracks(merged);
    } catch { /* use mock data */ } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const onRefresh = () => { setRefreshing(true); load(true); };

  const handlePlay = (track: Track, index: number) => {
    setQueue(tracks, index);
    play(track);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['rgba(0,96,239,0.22)', 'transparent']}
        style={StyleSheet.absoluteFill}
        style={{ pointerEvents: 'none' }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <MaterialCommunityIcons name="chevron-left" size={26} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Music</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons name="dots-horizontal" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <FlatList
        data={FILTERS as unknown as LibFilter[]}
        keyExtractor={f => f}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersRow}
        style={styles.filterScroll}
        renderItem={({ item: f }) => (
          <TouchableOpacity
            style={[styles.chip, activeFilter === f && styles.chipActive]}
            onPress={() => setActiveFilter(f)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Track list */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={t => t.id}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.trackRow}
              onPress={() => handlePlay(item, index)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={THUMB_COLORS[index % THUMB_COLORS.length] as [string, string]}
                style={styles.thumb}
              >
                <MaterialCommunityIcons name="music" size={20} color="rgba(255,255,255,0.85)" />
              </LinearGradient>

              <View style={styles.trackMeta}>
                <Text style={styles.trackTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.trackSub}>By {item.artist.name} · {formatDuration(item.duration)}</Text>
              </View>

              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => handlePlay(item, index)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <View style={styles.playBtnCircle}>
                  <MaterialCommunityIcons name="play" size={16} color={colors.text.primary} />
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Upload FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/upload')}
        activeOpacity={0.85}
      >
        <LinearGradient colors={['#0060EF', '#004EC2']} style={styles.fabGrad}>
          <MaterialCommunityIcons name="plus" size={26} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterScroll: {
    marginBottom: spacing.xs,
  },
  filtersRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  chipTextActive: {
    color: colors.white,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: spacing.xxl + spacing.xl,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    gap: spacing.md,
  },
  thumb: {
    width: 54,
    height: 54,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  trackMeta: {
    flex: 1,
    gap: 4,
  },
  trackTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
  },
  trackSub: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  playBtn: {
    padding: 4,
    flexShrink: 0,
  },
  playBtnCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xxl + spacing.lg,
    right: spacing.lg,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
  fabGrad: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

