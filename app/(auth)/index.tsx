import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius, typography } from '@/src/styles/theme';
import { Button } from '@/src/components/UI/Button';
import { Text } from '@/src/components/UI/Text';
import { useAuth } from '@/src/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, error, clearError } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) { setLocalError('Please enter email and password.'); return; }
    setLocalError(null);
    clearError();
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setLocalError(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(0,96,239,0.18)', 'transparent']}
        style={[styles.gradientOverlay, { pointerEvents: 'none' }]}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoBlock}>
          <Text variant="h1" color={colors.primary} style={styles.logoText}>Motif</Text>
          <Text variant="body2" color={colors.text.secondary}>Share your rhythm</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text variant="caption" color={colors.text.secondary} style={styles.label}>EMAIL</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor={colors.text.tertiary}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text variant="caption" color={colors.text.secondary} style={styles.label}>PASSWORD</Text>
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor={colors.text.tertiary}
            />
          </View>

          {localError ? (
            <Text variant="caption" color={colors.error} style={{ textAlign: 'center', marginBottom: spacing.sm }}>{localError}</Text>
          ) : null}
          <Button
            onPress={handleLogin}
            label="Sign In"
            loading={loading}
            fullWidth
            style={styles.submitBtn}
          />

          <View style={styles.switchRow}>
            <Text variant="body2" color={colors.text.secondary}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')} hitSlop={8}>
              <Text variant="body2" color={colors.primary} style={styles.switchLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  logoBlock: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    gap: spacing.xs,
  },
  logoText: {
    letterSpacing: -1,
  },
  form: {
    gap: spacing.md,
  },
  fieldGroup: {
    gap: spacing.xs,
  },
  label: {
    letterSpacing: 0.8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    color: colors.text.primary,
    fontSize: typography.sizes.base,
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  switchLink: {
    fontWeight: '600',
  },
});
