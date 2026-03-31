import React, { createContext, useContext, useState } from 'react';
import { PlayerState, Track } from '../types';

interface MusicPlayerContextType {
  playerState: PlayerState;
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

  const play = (track: Track) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      playbackPosition: 0,
    }));
  };

  const pause = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: false,
    }));
  };

  const resume = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: true,
    }));
  };

  const stop = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: false,
      playbackPosition: 0,
      currentTrack: null,
    }));
  };

  const next = () => {
    setPlayerState(prev => {
      let nextIndex = prev.queueIndex + 1;
      if (nextIndex >= prev.queue.length) {
        nextIndex = 0;
      }
      return {
        ...prev,
        queueIndex: nextIndex,
        currentTrack: prev.queue[nextIndex] || null,
        playbackPosition: 0,
      };
    });
  };

  const previous = () => {
    setPlayerState(prev => {
      let prevIndex = prev.queueIndex - 1;
      if (prevIndex < 0) {
        prevIndex = prev.queue.length - 1;
      }
      return {
        ...prev,
        queueIndex: prevIndex,
        currentTrack: prev.queue[prevIndex] || null,
        playbackPosition: 0,
      };
    });
  };

  const seek = (position: number) => {
    setPlayerState(prev => ({
      ...prev,
      playbackPosition: position,
    }));
  };

  const setQueue = (tracks: Track[], startIndex = 0) => {
    setPlayerState(prev => ({
      ...prev,
      queue: tracks,
      queueIndex: startIndex,
      currentTrack: tracks[startIndex] || null,
      playbackPosition: 0,
      isPlaying: true,
    }));
  };

  const addToQueue = (track: Track) => {
    setPlayerState(prev => ({
      ...prev,
      queue: [...prev.queue, track],
    }));
  };

  const toggleRepeat = () => {
    setPlayerState(prev => {
      const modes: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all'];
      const currentIndex = modes.indexOf(prev.repeatMode);
      const nextMode = modes[(currentIndex + 1) % modes.length];
      return {
        ...prev,
        repeatMode: nextMode,
      };
    });
  };

  const toggleShuffle = () => {
    setPlayerState(prev => ({
      ...prev,
      isShuffle: !prev.isShuffle,
    }));
  };

  const value: MusicPlayerContextType = {
    playerState,
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

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
