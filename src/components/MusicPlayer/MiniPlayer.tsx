import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMusicPlayer } from '../../context/MusicPlayerContext';
import { colors, spacing, borderRadius } from '../../styles/theme';

const MINI_PLAYER_HEIGHT = 64;

export default function MiniPlayer() {
  const { playerState, duration, pause, resume, next } = useMusicPlayer();
  const { currentTrack, isPlaying, playbackPosition } = playerState;
  const router = useRouter();

  if (!currentTrack) return null;

  const progress = duration > 0 ? playbackPosition / duration : 0;

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push('/modal')}
    >
      <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.inner}>
        {currentTrack.coverArt ? (
          <Image source={{ uri: currentTrack.coverArt }} style={styles.art} />
        ) : (
          <View style={styles.artPlaceholder}>
            <MaterialCommunityIcons name="music" size={20} color={colors.primary} />
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist.name}</Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={e => { e.stopPropagation(); isPlaying ? pause() : resume(); }}
        >
          <MaterialCommunityIcons
            name={isPlaying ? 'pause' : 'play'}
            size={26}
            color={colors.text.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={e => { e.stopPropagation(); next(); }}
        >
          <MaterialCommunityIcons name="skip-next" size={26} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: MINI_PLAYER_HEIGHT,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    overflow: 'hidden',
  },
  progressBar: {
    height: 2,
    backgroundColor: `${colors.primary}33`,
  },
  progressFill: {
    height: 2,
    backgroundColor: colors.primary,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  art: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
  },
  artPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: `${colors.primary}22`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  artist: {
    color: colors.text.secondary,
    fontSize: 12,
    marginTop: 1,
  },
  btn: {
    padding: spacing.xs,
  },
});
