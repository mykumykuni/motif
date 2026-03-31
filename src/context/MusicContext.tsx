import React, { createContext, useContext, useState } from 'react';
import { Track, Playlist } from '../types';

interface MusicContextType {
  // Playback
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  queueIndex: number;
  playbackPosition: number;
  repeatMode: 'off' | 'one' | 'all';
  isShuffle: boolean;

  // Methods
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setQueue: (tracks: Track[]) => void;
  setRepeatMode: (mode: 'off' | 'one' | 'all') => void;
  toggleShuffle: () => void;
  seekTo: (position: number) => void;

  // User music data
  likedSongs: Track[];
  playlists: Playlist[];
  likeTrack: (track: Track) => Promise<void>;
  unlikeTrack: (trackId: string) => Promise<void>;
  createPlaylist: (name: string, description?: string) => Promise<Playlist>;
  addToPlaylist: (playlistId: string, trackId: string) => Promise<void>;
  removeFromPlaylist: (playlistId: string, trackId: string) => Promise<void>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Playback state
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [isShuffle, setIsShuffle] = useState(false);

  // User music data
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setPlaybackPosition(0);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    if (currentTrack) {
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (queue.length === 0) return;

    let nextIndex = queueIndex + 1;
    if (repeatMode === 'all' || nextIndex < queue.length) {
      if (nextIndex >= queue.length) {
        nextIndex = 0;
      }
      setQueueIndex(nextIndex);
      setCurrentTrack(queue[nextIndex]);
      setPlaybackPosition(0);
    } else if (repeatMode === 'one') {
      setPlaybackPosition(0);
    }
  };

  const previousTrack = () => {
    if (queue.length === 0) return;

    const prevIndex = queueIndex - 1;
    if (prevIndex >= 0) {
      setQueueIndex(prevIndex);
      setCurrentTrack(queue[prevIndex]);
      setPlaybackPosition(0);
    } else if (repeatMode === 'all') {
      setQueueIndex(queue.length - 1);
      setCurrentTrack(queue[queue.length - 1]);
    }
  };

  const seekTo = (position: number) => {
    setPlaybackPosition(position);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const likeTrack = async (track: Track) => {
    // TODO: Implement API call to like track
    setLikedSongs([...likedSongs, track]);
  };

  const unlikeTrack = async (trackId: string) => {
    // TODO: Implement API call to unlike track
    setLikedSongs(likedSongs.filter((t) => t.id !== trackId));
  };

  const createPlaylist = async (name: string, description?: string) => {
    // TODO: Implement API call to create playlist
    const mockPlaylist: Playlist = {
      id: Date.now().toString(),
      title: name,
      description,
      owner: {} as any, // TODO: get current user
      tracks: [],
      isPublic: false,
      followers: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPlaylists([...playlists, mockPlaylist]);
    return mockPlaylist;
  };

  const addToPlaylist = async (playlistId: string, trackId: string) => {
    // TODO: Implement API call
    const playlist = playlists.find((p) => p.id === playlistId);
    if (playlist) {
      const track = likedSongs.find((t) => t.id === trackId);
      if (track) {
        playlist.tracks.push(track);
      }
    }
  };

  const removeFromPlaylist = async (playlistId: string, trackId: string) => {
    // TODO: Implement API call
    const playlist = playlists.find((p) => p.id === playlistId);
    if (playlist) {
      playlist.tracks = playlist.tracks.filter((t) => t.id !== trackId);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        queue,
        queueIndex,
        playbackPosition,
        repeatMode,
        isShuffle,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        setQueue,
        setRepeatMode,
        toggleShuffle,
        seekTo,
        likedSongs,
        playlists,
        likeTrack,
        unlikeTrack,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
};
