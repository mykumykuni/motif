import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Title, Body, GlassCard, Button } from '@/src/components/UI';
import { colors, spacing } from '@/src/styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[50],
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.md,
  },
  card: {
    padding: spacing.lg,
    gap: spacing.md,
  },
});

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.section}>
          <Heading color={colors.primary[900]}>
            Welcome to Motif
          </Heading>
          <Body color={colors.primary[700]}>
            Your music, your social circle, your vibe
          </Body>
        </View>

        {/* Featured Playlist */}
        <GlassCard style={styles.card}>
          <Title color={colors.primary[900]}>Featured Today</Title>
          <Body color={colors.primary[700]}>
            Discover curated playlists handpicked by our team
          </Body>
          <Button
            label="Explore Now"
            onPress={() => console.log('Navigate to featured')}
            variant="primary"
            size="md"
          />
        </GlassCard>

        {/* Social Feed Teaser */}
        <GlassCard style={styles.card} variant="secondary">
          <Title color={colors.primary[900]}>What's New</Title>
          <Body color={colors.primary[700]}>
            Check out announcements and posts from artists you follow
          </Body>
          <Button
            label="View Feed"
            onPress={() => console.log('Navigate to social')}
            variant="secondary"
            size="md"
          />
        </GlassCard>

        {/* Quick Access */}
        <View style={styles.section}>
          <Title color={colors.primary[900]}>Quick Access</Title>
          <Button
            label="Search Music"
            onPress={() => console.log('Open search')}
            variant="ghost"
            size="md"
            fullWidth
          />
          <Button
            label="Your Playlists"
            onPress={() => console.log('Go to library')}
            variant="ghost"
            size="md"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
