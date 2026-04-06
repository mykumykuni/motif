import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMusicPlayer } from '../src/context/MusicPlayerContext';
import { colors, spacing, borderRadius, typography, gradients } from '../src/styles/theme';

const { width } = Dimensions.get('window');
const ART_SIZE = width * 0.68;

const MOCK_LYRICS = [
  'Whispers in the midnight breeze,',
  'Carrying dreams across the seas,',
  'I close my eyes, let go, and drift away.',
];

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PlayerScreen() {
  const router = useRouter();
  const { playerState, duration, pause, resume, next, previous, seek, toggleRepeat, toggleShuffle } =
    useMusicPlayer();
  const { currentTrack, isPlaying, playbackPosition, repeatMode, isShuffle } = playerState;

  if (!currentTrack) {
    router.back();
    return null;
  }

  const progress = duration > 0 ? playbackPosition / duration : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['rgba(80,0,180,0.60)', 'rgba(0,96,239,0.18)', colors.background]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerLabel}>Now Playing</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons name="heart-outline" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Album Art — circular */}
      <View style={styles.artContainer}>
        <View style={styles.artShadow}>
          <View style={styles.artCircle}>
            {currentTrack.coverArt ? (
              <Image source={{ uri: currentTrack.coverArt }} style={styles.art} />
            ) : (
              <LinearGradient colors={['#7C3AED', '#0060EF']} style={styles.art}>
                <View style={styles.artInner}>
                  <MaterialCommunityIcons name="music" size={56} color="rgba(255,255,255,0.85)" />
                </View>
              </LinearGradient>
            )}
          </View>
        </View>
      </View>

      {/* Track Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.artist}>{currentTrack.artist.name}</Text>
      </View>

      {/* Lyrics strip */}
      <View style={styles.lyricsWrap}>
        {MOCK_LYRICS.map((line, i) => (
          <Text key={i} style={[styles.lyricLine, i === 1 && styles.lyricActive]} numberOfLines={1}>
            {line}
          </Text>
        ))}
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <TouchableOpacity
          style={styles.progressTrack}
          activeOpacity={1}
          onPress={e => {
            const { locationX } = e.nativeEvent;
            seek((locationX / (width - spacing.lg * 2)) * duration);
          }}
        >
          <View style={styles.progressBg} />
          <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
          <View style={[styles.thumb, { left: `${progress * 100}%` as any }]} />
        </TouchableOpacity>
        <View style={styles.timeRow}>
          <Text style={styles.time}>{formatTime(playbackPosition)}</Text>
          <Text style={styles.time}>-{formatTime(Math.max(0, duration - playbackPosition))}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleShuffle} style={styles.sideBtn}>
          <MaterialCommunityIcons
            name="shuffle"
            size={22}
            color={isShuffle ? colors.primary : colors.text.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={previous} style={styles.skipBtn}>
          <MaterialCommunityIcons name="skip-previous" size={40} color={colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playBtnWrap} onPress={isPlaying ? pause : resume}>
          <LinearGradient
            colors={gradients.playBtn}
            style={styles.playBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialCommunityIcons name={isPlaying ? 'pause' : 'play'} size={36} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={next} style={styles.skipBtn}>
          <MaterialCommunityIcons name="skip-next" size={40} color={colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleRepeat} style={styles.sideBtn}>
          <MaterialCommunityIcons
            name={repeatMode === 'one' ? 'repeat-once' : 'repeat'}
            size={22}
            color={repeatMode !== 'off' ? colors.primary : colors.text.secondary}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  headerLabel: {
    ...typography.subtitle,
    color: colors.text.primary,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  artShadow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.55,
    shadowRadius: 32,
    elevation: 16,
  },
  artCircle: {
    width: ART_SIZE,
    height: ART_SIZE,
    borderRadius: ART_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  art: {
    width: '100%',
    height: '100%',
  },
  artInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  artist: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  lyricsWrap: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: 6,
  },
  lyricLine: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
  },
  lyricActive: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
  },
  progressSection: {
    marginBottom: spacing.lg,
  },
  progressTrack: {
    height: 28,
    justifyContent: 'center',
  },
  progressBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.full,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  thumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 7,
    marginLeft: -7,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  time: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: {
    padding: spacing.xs,
  },
  playBtnWrap: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 16,
    elevation: 10,
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

