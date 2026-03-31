import React from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { enableScreens } from 'react-native-screens';
import { AuthProvider } from '../src/context/AuthContext';
import { MusicProvider } from '../src/context/MusicContext';
import { SocialProvider } from '../src/context/SocialContext';

// Enable native screens for better performance
enableScreens();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // You can add custom fonts here
    // Example: 'opensans': require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  if (fontError) throw fontError;

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded) {
    return null;
  }

  // Hide the splash screen after the fonts have loaded
  SplashScreen.hideAsync();

  return (
    <AuthProvider>
      <MusicProvider>
        <SocialProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
          <StatusBar style="light" />
        </SocialProvider>
      </MusicProvider>
    </AuthProvider>
  );
}
