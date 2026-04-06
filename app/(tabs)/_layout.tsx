import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { StyleSheet, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/src/styles/theme';

const TAB_BAR_HEIGHT = 64;
const BG = '#0D0D14';

function IOSBlurBackground() {
  return (
    <BlurView
      intensity={80}
      tint="dark"
      style={StyleSheet.absoluteFill}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(13,13,20,0.72)' }} />
    </BlurView>
  );
}

function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);
  const isAndroid = Platform.OS === 'android';

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.38)',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: bottomInset + 10,
          left: 28,
          right: 28,
          height: TAB_BAR_HEIGHT,
          borderRadius: TAB_BAR_HEIGHT / 2,
          backgroundColor: BG,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          borderWidth: 0,
          elevation: isAndroid ? 20 : 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.55,
          shadowRadius: 24,
        },
        // iOS only: replace solid bg with blur. Android: tabBarBackground omitted
        // so React Navigation never renders its own white view underneath.
        ...(isAndroid ? {} : { tabBarBackground: () => <IOSBlurBackground /> }),
        tabBarIcon: ({ color, focused }) => {
          const icons: Record<string, [string, string]> = {
            index:   ['home', 'home-outline'],
            explore: ['compass', 'compass-outline'],
            library: ['music-box-multiple', 'music-box-multiple-outline'],
            social:  ['heart', 'heart-outline'],
            profile: ['account-circle', 'account-circle-outline'],
          };
          const [active, inactive] = icons[route.name] ?? ['circle', 'circle-outline'];
          return (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <MaterialCommunityIcons
                name={(focused ? active : inactive) as any}
                size={24}
                color={color}
              />
            </View>
          );
        },
        sceneStyle: { paddingBottom: TAB_BAR_HEIGHT + bottomInset + 28 },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="library" />
      <Tabs.Screen name="social" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="music" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.primary,
  },
});

export default TabLayout;
