/**
 * Core Type Definitions for Motif App
 */

// User Types
export type UserRole = 'listener' | 'artist' | 'admin';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  role: UserRole;
  followers: number;
  following: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Music Types
export interface Track {
  id: string;
  title: string;
  artist: Artist;
  album: Album;
  duration: number; // in seconds
  coverArt?: string;
  audioUrl: string;
  releaseDate: string;
  genre: string;
  playCount: number;
  likes: number;
  isLiked?: boolean;
  createdAt: string;
}

export interface Artist {
  id: string;
  name: string;
  image?: string;
  bio?: string;
  followers: number;
  isFollowing?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  coverArt?: string;
  releaseDate: string;
  tracks: Track[];
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  coverArt?: string;
  owner: User;
  tracks: Track[];
  isPublic: boolean;
  followers: number;
  createdAt: string;
  updatedAt: string;
}

// Social Types
export interface Post {
  id: string;
  author: User;
  content: string;
  images?: string[];
  tags?: string[];
  linkedSong?: Track;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  artist: Artist;
  title: string;
  content: string;
  images?: string[];
  links?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  likes: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  userId: string;
  targetId: string; // Post, Comment, or Track id
  targetType: 'post' | 'comment' | 'track';
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

// Player Types
export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  playbackPosition: number;
  queue: Track[];
  queueIndex: number;
  repeatMode: 'off' | 'one' | 'all';
  isShuffle: boolean;
}

// Search Types
export type SearchResult = {
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
  users: User[];
};

export type SearchType = 'all' | 'track' | 'artist' | 'album' | 'playlist' | 'user';
