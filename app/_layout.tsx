import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { LogBox, Platform, View } from 'react-native';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import * as NavigationBar from 'expo-navigation-bar';
import { AuthProvider } from '../src/context/AuthContext';
import { MusicProvider } from '../src/context/MusicContext';
import { MusicPlayerProvider } from '../src/context/MusicPlayerContext';
import { SocialProvider } from '../src/context/SocialContext';
import MiniPlayer from '../src/components/MusicPlayer/MiniPlayer';

LogBox.ignoreLogs([
  'props.pointerEvents is deprecated',
  '"shadow*" style props are deprecated',
]);

const TAB_BAR_HEIGHT = 60;
const MINI_PLAYER_HEIGHT = 64;

enableScreens();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({});

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#0D0D14');
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0D0D14' }}>
      <AuthProvider>
        <MusicPlayerProvider>
          <MusicProvider>
            <SocialProvider>
              <View style={{ flex: 1, backgroundColor: '#0D0D14' }}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
                  <Stack.Screen name="upload" options={{ presentation: 'modal', headerShown: false }} />
                </Stack>
                <View pointerEvents="box-none" style={{ position: 'absolute', bottom: TAB_BAR_HEIGHT, left: 0, right: 0, height: MINI_PLAYER_HEIGHT, zIndex: 99 }}>
                  <MiniPlayer />
                </View>
              </View>
              <StatusBar style="light" />
            </SocialProvider>
          </MusicProvider>
        </MusicPlayerProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
