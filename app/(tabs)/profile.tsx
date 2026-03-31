import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading, Body, Button, GlassCard } from '@/src/components/UI';
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
  profileHeader: {
    alignItems: 'center',
    gap: spacing.md,
  },
  card: {
    padding: spacing.lg,
    gap: spacing.md,
  },
});

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Heading color={colors.primary[900]}>Your Profile</Heading>
          <Body color={colors.primary[700]}>
            Sign in to see your profile and personalized content
          </Body>
        </View>

        {/* Sign In Options */}
        <GlassCard style={styles.card}>
          <Button
            label="Sign In with Email"
            onPress={() => console.log('Email sign in')}
            variant="primary"
            size="md"
            fullWidth
          />
        </GlassCard>

        <GlassCard style={styles.card}>
          <Button
            label="Sign In with Google"
            onPress={() => console.log('Google sign in')}
            variant="secondary"
            size="md"
            fullWidth
          />
        </GlassCard>

        <GlassCard style={styles.card}>
          <Button
            label="Sign In with Apple"
            onPress={() => console.log('Apple sign in')}
            variant="secondary"
            size="md"
            fullWidth
          />
        </GlassCard>

        {/* Create Account */}
        <Button
          label="Create New Account"
          onPress={() => console.log('Sign up')}
          variant="ghost"
          size="md"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
}
