import React, { useState } from 'react';
import {
  StyleSheet, View, ScrollView, TouchableOpacity,
  Image, Dimensions, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '@/src/components/UI';
import { colors, spacing, borderRadius, gradients, typography } from '@/src/styles/theme';
import { useMusicPlayer } from '@/src/context/MusicPlayerContext';
import { useAuth } from '@/src/context/AuthContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.72;
const THUMB_SIZE = 52;

import {
  CURATED_PLAYLISTS, TOP_DAILY as TOP_DAILY_DATA, TRENDING_TRACKS,
  formatPlays, formatDuration,
} from '@/src/data/mockData';

const FILTERS = ['All', 'New Release', 'Trending', 'Top Charts', 'Podcasts'] as const;

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { user } = useAuth();
  const router = useRouter();
  const { play } = useMusicPlayer();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.displayName?.split(' ')[0] ?? 'there';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>

        {/* ── Hero ── */}
        <LinearGradient
          colors={gradients.hero}
          locations={[0, 0.55, 1]}
          style={styles.hero}
        >
          <View style={styles.heroTop}>
            {/* Avatar */}
            <TouchableOpacity style={styles.avatar} onPress={() => router.push('/(tabs)/profile')}>
              <LinearGradient colors={['#7C3AED', '#0060EF']} style={styles.avatarGrad}>
                <MaterialCommunityIcons name="account" size={22} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            {/* Actions */}
            <View style={styles.heroActions}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/explore')}>
                <MaterialCommunityIcons name="magnify" size={22} color={colors.text.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <MaterialCommunityIcons name="heart-outline" size={22} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.greetingText}>
            {greeting()},{'\n'}Hi, {firstName}
          </Text>
        </LinearGradient>

        {/* ── Filter Chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
          style={styles.filtersScroll}
        >
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.7}
            >
              <Text
                style={{ ...styles.chipText, ...(activeFilter === f ? styles.chipTextActive : {}) }}
              >{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Curated & Trending ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Curated &amp; trending</Text>
          <FlatList
            data={CURATED_PLAYLISTS.slice(0, 5)}
            keyExtractor={i => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
            snapToInterval={CARD_WIDTH + spacing.md}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.curatedCard} activeOpacity={0.85}>
                <LinearGradient
                  colors={[item.color1, item.color2]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.curatedGrad}
                >
                  <View style={styles.curatedArtWrap}>
                    <View style={styles.curatedArtCircle}>
                      <MaterialCommunityIcons name="headphones" size={36} color="rgba(255,255,255,0.90)" />
                    </View>
                  </View>
                  <View style={styles.curatedMeta}>
                    <Text style={styles.curatedTitle}>{item.name}</Text>
                    <Text style={styles.curatedSub} numberOfLines={2}>{item.description}</Text>
                  </View>
                  <View style={styles.curatedControls}>
                    <TouchableOpacity style={styles.playCircle}>
                      <MaterialCommunityIcons name="play" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ctrlBtn}>
                      <MaterialCommunityIcons name="heart-outline" size={18} color="rgba(255,255,255,0.75)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ctrlBtn}>
                      <MaterialCommunityIcons name="download-outline" size={18} color="rgba(255,255,255,0.75)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ctrlBtn}>
                      <MaterialCommunityIcons name="dots-horizontal" size={18} color="rgba(255,255,255,0.75)" />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ── Top Daily Playlists ── */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Top daily playlists</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/library')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {TOP_DAILY_DATA.slice(0, 8).map(item => (
            <TouchableOpacity key={item.id} style={styles.trackRow} activeOpacity={0.7}>
              <LinearGradient
                colors={[item.color1, item.color2]}
                style={styles.trackThumb}
              >
                <MaterialCommunityIcons name="music" size={20} color="rgba(255,255,255,0.85)" />
              </LinearGradient>
              <View style={styles.trackMeta}>
                <Text style={styles.trackTitle}>{item.name}</Text>
                <Text style={styles.trackSub}>By {item.curator} · {item.trackCount} Songs</Text>
              </View>
              <TouchableOpacity style={styles.trackPlay}>
                <MaterialCommunityIcons name="play-circle" size={32} color={colors.primary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Hero
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden',
  },
  avatarGrad: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    lineHeight: 40,
  },
  // Filters
  filtersScroll: { marginBottom: spacing.xs },
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
  // Sections
  section: {
    marginBottom: spacing.xl,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  // Curated cards
  cardsRow: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  curatedCard: {
    width: CARD_WIDTH,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  curatedGrad: {
    padding: spacing.lg,
    minHeight: 160,
    justifyContent: 'flex-end',
  },
  curatedArtWrap: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.md,
    bottom: spacing.lg,
    justifyContent: 'center',
  },
  curatedArtCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  curatedMeta: {
    maxWidth: '60%',
    marginBottom: spacing.md,
  },
  curatedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  curatedSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 18,
  },
  curatedControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  playCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctrlBtn: {
    padding: 4,
  },
  // Track rows
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  trackThumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackMeta: {
    flex: 1,
    gap: 3,
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
  trackPlay: {
    padding: 4,
  },
});
