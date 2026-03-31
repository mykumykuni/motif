import React from 'react';
import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colors } from '@/src/styles/theme';
import { Button } from '@/src/components/UI/Button';
import { Text } from '@/src/components/UI/Text';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual authentication logic
      // For now, navigate to the main app
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1000);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
          paddingVertical: 40,
        }}
      >
        {/* Header */}
        <View style={{ marginBottom: 40, alignItems: 'center' }}>
          <ThemedText
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              marginBottom: 8,
              color: colors.accent.sage,
            }}
          >
            Motif
          </ThemedText>
          <ThemedText type="subtitle" style={{ fontSize: 14 }}>
            Create your account
          </ThemedText>
        </View>

        {/* Email Input */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8, fontWeight: '500' }}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              borderWidth: 1,
              borderColor: colors.primary[200],
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 48,
              backgroundColor: colors.primary[50],
              color: colors.primary[900],
              fontSize: 14,
            }}
            placeholderTextColor={colors.primary[400]}
          />
        </View>

        {/* Password Input */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 8, fontWeight: '500' }}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: colors.primary[200],
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 48,
              backgroundColor: colors.primary[50],
              color: colors.primary[900],
              fontSize: 14,
            }}
            placeholderTextColor={colors.primary[400]}
          />
        </View>

        {/* Confirm Password Input */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ marginBottom: 8, fontWeight: '500' }}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: colors.primary[200],
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 48,
              backgroundColor: colors.primary[50],
              color: colors.primary[900],
              fontSize: 14,
            }}
            placeholderTextColor={colors.primary[400]}
          />
        </View>

        {/* Sign Up Button */}
        <Button
          onPress={handleSignup}
          label="Create Account"
          loading={loading}
          fullWidth
          style={{ marginBottom: 16 }}
        />

        {/* Sign In Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.primary[400] }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: colors.accent.sage, fontWeight: '600' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
