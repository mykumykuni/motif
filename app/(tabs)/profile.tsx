import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, Button, GlassCard } from '@/src/components/UI';
import { colors, spacing, borderRadius, elevation } from '@/src/styles/theme';
import { useAuth } from '@/src/context/AuthContext';

const STATS = [
  { label: 'Following', value: '128' },
  { label: 'Followers', value: '342' },
  { label: 'Tracks', value: '24' },
];

const MENU_ITEMS = [
  { icon: 'musical-notes-outline' as const, label: 'My Uploads', sub: "Tracks you've shared" },
  { icon: 'heart-outline' as const, label: 'Liked Songs', sub: '47 tracks' },
  { icon: 'list-outline' as const, label: 'Playlists', sub: '6 playlists' },
  { icon: 'people-outline' as const, label: 'Following', sub: '128 artists' },
  { icon: 'settings-outline' as const, label: 'Settings', sub: 'Account & preferences' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingBottom: spacing.xl, alignItems: 'center', paddingTop: spacing.lg },
  avatarRing: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  avatarInitial: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  statItem: { alignItems: 'center', gap: 2 },
  menuList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl + spacing.xl,
    gap: spacing.sm,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    ...elevation[1],
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.glass.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: { flex: 1 },
  signInCard: { padding: spacing.lg, gap: spacing.md, marginHorizontal: spacing.lg },
});

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const isLoggedIn = !!user;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['rgba(0,96,239,0.20)', 'transparent']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 220 }}
        style={{ pointerEvents: 'none' }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoggedIn ? (
          <>
            <View style={styles.header}>
              <View style={styles.avatarRing}>
                <Text style={styles.avatarInitial}>{user?.displayName?.[0]?.toUpperCase() ?? 'M'}</Text>
              </View>
              <Text variant="h2" color={colors.text.primary}>{user?.displayName ?? 'Your Name'}</Text>
              <Text variant="body2" color={colors.text.secondary}>@{user?.username ?? 'username'}</Text>
              <View style={styles.statsRow}>
                {STATS.map((s) => (
                  <View key={s.label} style={styles.statItem}>
                    <Text variant="subtitle" color={colors.text.primary}>{s.value}</Text>
                    <Text variant="caption" color={colors.text.secondary}>{s.label}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.menuList}>
              {MENU_ITEMS.map((item) => (
                <TouchableOpacity key={item.label} style={styles.menuRow} activeOpacity={0.7}>
                  <View style={styles.menuIcon}>
                    <Ionicons name={item.icon} size={20} color={colors.primary} />
                  </View>
                  <View style={styles.menuText}>
                    <Text variant="body1" color={colors.text.primary}>{item.label}</Text>
                    <Text variant="caption" color={colors.text.secondary}>{item.sub}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
                </TouchableOpacity>
              ))}
            </View>
            <GlassCard style={{ marginHorizontal: spacing.md, marginTop: spacing.sm }}>
              <Button label="Sign Out" onPress={signOut} variant="outlined" size="md" fullWidth />
            </GlassCard>
          </>
        ) : (
          <>
            <View style={[styles.header, { paddingTop: spacing.xxl }]}>
              <View style={styles.avatarRing}>
                <Ionicons name="person-outline" size={40} color={colors.text.secondary} />
              </View>
              <Text variant="h2" color={colors.text.primary}>Your Profile</Text>
              <Text variant="body2" color={colors.text.secondary}>Sign in to access your profile</Text>
            </View>
            <GlassCard style={styles.signInCard}>
              <Button label="Sign In" onPress={() => router.push('/(auth)')} variant="primary" size="md" fullWidth />
              <Button label="Create Account" onPress={() => router.push('/(auth)/signup')} variant="outlined" size="md" fullWidth />
            </GlassCard>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
