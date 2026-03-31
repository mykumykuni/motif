import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Body } from '@/src/components/UI';
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
});

export default function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Heading color={colors.primary[900]}>Your Library</Heading>
        <Body color={colors.primary[700]}>
          Your playlists, liked tracks, and saved albums will appear here
        </Body>
      </ScrollView>
    </SafeAreaView>
  );
}
