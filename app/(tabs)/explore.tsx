import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, elevation } from '../../src/styles/theme';
import { GENRES, TRENDING_TRACKS, BILLBOARD_TRACKS, formatPlays } from '../../src/data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_W = (SCREEN_WIDTH - spacing.lg * 2 - spacing.sm) / 2;

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filteredTracks = activeGenre
    ? TRENDING_TRACKS.filter(t => t.genre?.toLowerCase() === activeGenre.toLowerCase())
    : TRENDING_TRACKS;

  const filteredBillboard = activeGenre
    ? BILLBOARD_TRACKS.filter(t => t.genre?.toLowerCase() === activeGenre.toLowerCase())
    : BILLBOARD_TRACKS.slice(0, 20);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={18} color={colors.text.secondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Artists, songs, podcasts"
              placeholderTextColor={colors.text.secondary}
              value={query}
              onChangeText={setQuery}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={18} color={colors.text.secondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Genres */}
        <Text style={styles.sectionTitle}>Browse by Genre</Text>
        <View style={styles.genreGrid}>
          {GENRES.map((g) => (
            <TouchableOpacity
              key={g.id}
              style={[styles.genreCard, activeGenre === g.label && styles.genreCardActive]}
              activeOpacity={0.8}
              onPress={() => setActiveGenre(activeGenre === g.label ? null : g.label)}
            >
              <LinearGradient colors={[g.color1, g.color2]} style={styles.genreGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Ionicons name="musical-notes-outline" size={22} color="rgba(255,255,255,0.85)" />
                <Text style={styles.genreLabel}>{g.label}</Text>
                {activeGenre === g.label && (
                  <View style={styles.genreCheckmark}>
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trending */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>
            {activeGenre ? `${activeGenre} Tracks` : 'Trending Now'}
          </Text>
          {activeGenre && (
            <TouchableOpacity onPress={() => setActiveGenre(null)}>
              <Text style={styles.clearFilter}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.trendingList}>
          {(filteredTracks.length > 0 ? filteredTracks : TRENDING_TRACKS).slice(0, 15).map((track, i) => (
            <TouchableOpacity key={track.id} style={styles.trendingRow} activeOpacity={0.7}>
              <Text style={styles.trendingRank}>{i + 1}</Text>
              <View style={styles.trendingThumb}>
                <LinearGradient
                  colors={[track.color1, track.color2]}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <Ionicons name="musical-note" size={16} color="#fff" />
              </View>
              <View style={styles.trendingMeta}>
                <Text style={styles.trendingTitle}>{track.title}</Text>
                <Text style={styles.trendingArtist}>{track.artist}</Text>
              </View>
              <View style={styles.trendingRight}>
                <Text style={styles.trendingPlays}>{formatPlays(track.plays)}</Text>
                <Ionicons name="play" size={12} color={colors.text.secondary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Billboard Hot 100 */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>
          {activeGenre ? `Billboard: ${activeGenre}` : 'Billboard Hot 100 (2020–2025)'}
        </Text>
        <View style={styles.trendingList}>
          {filteredBillboard.slice(0, 20).map((track, i) => (
            <TouchableOpacity key={track.id} style={styles.trendingRow} activeOpacity={0.7}>
              <View style={styles.billboardRankWrap}>
                <Text style={styles.billboardRank}>#{track.peakPosition}</Text>
              </View>
              <View style={styles.trendingThumb}>
                <LinearGradient
                  colors={[track.color1, track.color2]}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <Ionicons name="trophy-outline" size={14} color="#fff" />
              </View>
              <View style={styles.trendingMeta}>
                <Text style={styles.trendingTitle}>{track.title}</Text>
                <Text style={styles.trendingArtist}>{track.artist} · {track.chartYear}</Text>
              </View>
              <View style={styles.trendingRight}>
                <Text style={styles.trendingPlays}>{track.weeksOnChart}w</Text>
                <Ionicons name="time-outline" size={12} color={colors.text.secondary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.lg },
  title: { ...typography.h1, color: colors.text.primary, marginBottom: spacing.md },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    gap: spacing.sm,
    ...elevation[1],
  },
  searchInput: {
    flex: 1,
    ...typography.body1,
    color: colors.text.primary,
    paddingVertical: 0,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  genreCard: {
    width: CARD_W,
    height: 90,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  genreCardActive: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  genreGrad: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  genreLabel: {
    ...typography.button,
    color: '#fff',
  },
  genreCheckmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.40)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  clearFilter: {
    ...typography.body2,
    color: colors.primary,
  },
  billboardRankWrap: {
    width: 36,
    alignItems: 'center',
  },
  billboardRank: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  trendingList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  trendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  trendingRank: {
    ...typography.body2,
    color: colors.text.secondary,
    width: 20,
    textAlign: 'center',
  },
  trendingThumb: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingMeta: { flex: 1 },
  trendingTitle: { ...typography.body1, color: colors.text.primary },
  trendingArtist: { ...typography.body2, color: colors.text.secondary, marginTop: 2 },
  trendingRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  trendingPlays: { ...typography.caption, color: colors.text.secondary },
});
