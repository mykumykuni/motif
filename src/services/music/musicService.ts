import AsyncStorage from "@react-native-async-storage/async-storage";
import { Track, Artist, Album } from "../../types";

const TRACKS_KEY = "@motif_tracks";

const mkArtist = (id: string, name: string): Artist => ({ id, name, followers: Math.floor(Math.random() * 50000) });
const mkAlbum = (id: string, title: string, artist: Artist): Album => ({ id, title, artist, releaseDate: "2024-01-01", tracks: [] });

const SEED_TRACKS: Track[] = [
  { id: "1", title: "Midnight Drive", artist: mkArtist("a1", "Neon Pulse"), album: mkAlbum("al1", "City Lights", mkArtist("a1", "Neon Pulse")), audioUrl: "", genre: "Electronic", duration: 214, playCount: 12400, likes: 843, releaseDate: "2024-03-15", createdAt: "2024-03-15" },
  { id: "2", title: "Golden Hour", artist: mkArtist("a2", "Solar Keys"), album: mkAlbum("al2", "Warmth", mkArtist("a2", "Solar Keys")), audioUrl: "", genre: "R&B", duration: 187, playCount: 9200, likes: 612, releaseDate: "2024-02-10", createdAt: "2024-02-10" },
  { id: "3", title: "Echoes", artist: mkArtist("a3", "Drift"), album: mkAlbum("al3", "Solitude", mkArtist("a3", "Drift")), audioUrl: "", genre: "Indie", duration: 243, playCount: 7800, likes: 501, releaseDate: "2024-01-22", createdAt: "2024-01-22" },
  { id: "4", title: "Up All Night", artist: mkArtist("a4", "The Lux"), album: mkAlbum("al4", "Overtime", mkArtist("a4", "The Lux")), audioUrl: "", genre: "Hip-Hop", duration: 198, playCount: 21000, likes: 1340, releaseDate: "2024-04-01", createdAt: "2024-04-01" },
  { id: "5", title: "Slow Burn", artist: mkArtist("a5", "Velvet Room"), album: mkAlbum("al5", "Amber", mkArtist("a5", "Velvet Room")), audioUrl: "", genre: "Jazz", duration: 276, playCount: 5400, likes: 389, releaseDate: "2024-03-30", createdAt: "2024-03-30" },
  { id: "6", title: "Frequency", artist: mkArtist("a1", "Neon Pulse"), album: mkAlbum("al1", "City Lights", mkArtist("a1", "Neon Pulse")), audioUrl: "", genre: "Electronic", duration: 222, playCount: 8900, likes: 720, releaseDate: "2024-03-15", createdAt: "2024-03-15" },
];

async function getAllTracks(): Promise<Track[]> {
  const raw = await AsyncStorage.getItem(TRACKS_KEY);
  const user: Track[] = raw ? JSON.parse(raw) : [];
  return [...SEED_TRACKS, ...user];
}

async function getStoredUserTracks(): Promise<Track[]> {
  const raw = await AsyncStorage.getItem(TRACKS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export interface UploadTrackParams {
  title: string; genre: string; audioUri: string; coverArtUri?: string;
  artistName: string; userId: string; onProgress?: (pct: number) => void;
}

export async function uploadTrack(params: UploadTrackParams): Promise<Track> {
  const { title, genre, audioUri, coverArtUri, artistName, userId, onProgress } = params;
  for (let i = 10; i <= 100; i += 10) { await new Promise(r => setTimeout(r, 80)); onProgress?.(i); }
  const artist = mkArtist(userId, artistName);
  const track: Track = { id: Date.now().toString(), title, artist, album: mkAlbum(Date.now().toString(), title, artist), audioUrl: audioUri, coverArt: coverArtUri, genre, duration: 0, playCount: 0, likes: 0, releaseDate: new Date().toISOString(), createdAt: new Date().toISOString() };
  const existing = await getStoredUserTracks();
  await AsyncStorage.setItem(TRACKS_KEY, JSON.stringify([track, ...existing]));
  return track;
}

export async function fetchTracks(genre?: string): Promise<Track[]> {
  const all = await getAllTracks();
  if (!genre || genre === "All") return all;
  return all.filter(t => t.genre === genre);
}

export async function fetchUserTracks(userId: string): Promise<Track[]> {
  const stored = await getStoredUserTracks();
  return stored.filter(t => t.artist.id === userId);
}

export async function fetchLikedTracks(userId: string): Promise<Track[]> {
  const raw = await AsyncStorage.getItem(`@motif_liked_${userId}`);
  const ids: string[] = raw ? JSON.parse(raw) : [];
  const all = await getAllTracks();
  return all.filter(t => ids.includes(t.id));
}

export async function likeTrack(trackId: string, userId: string): Promise<void> {
  const key = `@motif_liked_${userId}`;
  const raw = await AsyncStorage.getItem(key);
  const liked: string[] = raw ? JSON.parse(raw) : [];
  if (!liked.includes(trackId)) await AsyncStorage.setItem(key, JSON.stringify([...liked, trackId]));
}

export async function unlikeTrack(trackId: string, userId: string): Promise<void> {
  const key = `@motif_liked_${userId}`;
  const raw = await AsyncStorage.getItem(key);
  const liked: string[] = raw ? JSON.parse(raw) : [];
  await AsyncStorage.setItem(key, JSON.stringify(liked.filter(id => id !== trackId)));
}
