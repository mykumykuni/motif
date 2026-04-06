import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import type { AudioPlayer, AudioStatus } from 'expo-audio';
import { PlayerState, Track } from '../types';
import { incrementPlayCount } from '../services/music/musicService';

interface MusicPlayerContextType {
  playerState: PlayerState;
  duration: number;
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  seek: (position: number) => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  addToQueue: (track: Track) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

const initialPlayerState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  playbackPosition: 0,
  queue: [],
  queueIndex: 0,
  repeatMode: 'off',
  isShuffle: false,
};

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(initialPlayerState);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<AudioPlayer | null>(null);
  const subscriptionRef = useRef<{ remove: () => void } | null>(null);

  // Configure audio session once
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'duckOthers',
    });
  }, []);

  const destroyPlayer = useCallback(() => {
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
    playerRef.current?.remove();
    playerRef.current = null;
  }, []);

  const loadAndPlay = useCallback((track: Track, position = 0) => {
    destroyPlayer();

    const player = createAudioPlayer({ uri: track.audioUrl }, { updateInterval: 500 });
    playerRef.current = player;

    subscriptionRef.current = player.addListener('playbackStatusUpdate', (status: AudioStatus) => {
      setDuration(status.duration ?? 0);
      setPlayerState(prev => ({
        ...prev,
        playbackPosition: status.currentTime ?? 0,
        isPlaying: status.playing,
      }));
      if (status.didJustFinish) {
        setPlayerState(prev => {
          const { queue, queueIndex, repeatMode, isShuffle } = prev;
          if (repeatMode === 'one') {
            loadAndPlay(track, 0);
            return prev;
          }
          let nextIndex = queueIndex + 1;
          if (isShuffle) nextIndex = Math.floor(Math.random() * queue.length);
          if (nextIndex >= queue.length) {
            if (repeatMode === 'all') nextIndex = 0;
            else return { ...prev, isPlaying: false };
          }
          const nextTrack = queue[nextIndex];
          loadAndPlay(nextTrack, 0);
          return { ...prev, queueIndex: nextIndex, currentTrack: nextTrack, playbackPosition: 0 };
        });
      }
    });

    if (position > 0) {
      player.seekTo(position).then(() => player.play());
    } else {
      player.play();
    }

    incrementPlayCount(track.id).catch(() => {});
  }, [destroyPlayer]);

  const play = useCallback((track: Track) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      playbackPosition: 0,
    }));
    loadAndPlay(track, 0);
  }, [loadAndPlay]);

  const pause = useCallback(() => {
    playerRef.current?.pause();
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const resume = useCallback(() => {
    playerRef.current?.play();
    setPlayerState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const stop = useCallback(() => {
    destroyPlayer();
    setPlayerState(initialPlayerState);
    setDuration(0);
  }, [destroyPlayer]);

  const seek = useCallback((position: number) => {
    playerRef.current?.seekTo(position);
    setPlayerState(prev => ({ ...prev, playbackPosition: position }));
  }, []);

  const next = useCallback(() => {
    setPlayerState(prev => {
      const { queue, queueIndex, isShuffle, repeatMode } = prev;
      if (queue.length === 0) return prev;
      let nextIndex = isShuffle
        ? Math.floor(Math.random() * queue.length)
        : queueIndex + 1;
      if (nextIndex >= queue.length) {
        if (repeatMode === 'all') nextIndex = 0;
        else return prev;
      }
      const nextTrack = queue[nextIndex];
      loadAndPlay(nextTrack, 0);
      return { ...prev, queueIndex: nextIndex, currentTrack: nextTrack, playbackPosition: 0, isPlaying: true };
    });
  }, [loadAndPlay]);

  const previous = useCallback(() => {
    setPlayerState(prev => {
      const { queue, queueIndex, playbackPosition } = prev;
      // If more than 3s in, restart current track
      if (playbackPosition > 3) {
        seek(0);
        return prev;
      }
      if (queue.length === 0) return prev;
      const prevIndex = Math.max(0, queueIndex - 1);
      const prevTrack = queue[prevIndex];
      loadAndPlay(prevTrack, 0);
      return { ...prev, queueIndex: prevIndex, currentTrack: prevTrack, playbackPosition: 0, isPlaying: true };
    });
  }, [loadAndPlay, seek]);

  const setQueue = useCallback((tracks: Track[], startIndex = 0) => {
    const track = tracks[startIndex];
    if (!track) return;
    setPlayerState(prev => ({
      ...prev,
      queue: tracks,
      queueIndex: startIndex,
      currentTrack: track,
      playbackPosition: 0,
      isPlaying: true,
    }));
    loadAndPlay(track, 0);
  }, [loadAndPlay]);

  const addToQueue = useCallback((track: Track) => {
    setPlayerState(prev => ({ ...prev, queue: [...prev.queue, track] }));
  }, []);

  const toggleRepeat = useCallback(() => {
    const modes: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all'];
    setPlayerState(prev => {
      const next = modes[(modes.indexOf(prev.repeatMode) + 1) % modes.length];
      return { ...prev, repeatMode: next };
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isShuffle: !prev.isShuffle }));
  }, []);

  // Cleanup on unmount
  useEffect(() => () => { destroyPlayer(); }, [destroyPlayer]);

  const value: MusicPlayerContextType = {
    playerState,
    duration,
    play,
    pause,
    resume,
    stop,
    next,
    previous,
    seek,
    setQueue,
    addToQueue,
    toggleRepeat,
    toggleShuffle,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  return ctx;
}
