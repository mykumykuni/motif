import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../../src/styles/theme';

const FEATURED_CONTENT = [
  {
    id: '1',
    title: 'New Releases',
    subtitle: 'This Week\'s Top Tracks',
    icon: '🆕',
  },
  {
    id: '2',
    title: 'Trending',
    subtitle: 'What\'s hot right now',
    icon: '🔥',
  },
  {
    id: '3',
    title: 'Discovery',
    subtitle: 'New music for you',
    icon: '🎵',
  },
  {
    id: '4',
    title: 'Artist Hub',
    subtitle: 'Follow your favorites',
    icon: '🎤',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover new music & connect</Text>
        </View>

        {/* Featured Grid */}
        <View style={styles.grid}>
          {FEATURED_CONTENT.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              activeOpacity={0.7}
              onPress={() => console.log('Explore', item.title)}
            >
              <View style={styles.gridIconContainer}>
                <Text style={styles.gridIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.gridTitle}>{item.title}</Text>
              <Text style={styles.gridSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.categoryList}>
            {['Pop', 'Hip-Hop', 'Rock', 'R&B', 'Electronic', 'Jazz'].map((genre) => (
              <TouchableOpacity key={genre} style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2.5M</Text>
            <Text style={styles.statLabel}>Songs Available</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500K</Text>
            <Text style={styles.statLabel}>Active Artists</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1M+</Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.primary[500],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  gridItem: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  gridIconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.glass.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  gridIcon: {
    fontSize: 32,
  },
  gridTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.primary[900],
    marginBottom: spacing.xs,
  },
  gridSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.primary[500],
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.primary[900],
    marginBottom: spacing.md,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryTag: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary[200],
    ...shadows.sm,
  },
  categoryTagText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.primary[700],
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  statNumber: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.accent.sage,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.primary[600],
    fontWeight: typography.weights.regular,
    textAlign: 'center',
  },
});
