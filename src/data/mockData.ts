/**
 * MOTIF — Hardcoded mock data
 * ~1 000 records across all entity types.
 * Import from here rather than scattering inline arrays across screens.
 */

// ─── Helpers ─────────────────────────────────────────────────────────────────

const rnd = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

// ─── Users (60) ──────────────────────────────────────────────────────────────

export interface MockUser {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
  tracks: number;
  isVerified: boolean;
  avatarColor: [string, string];
  initials: string;
}

const AVATAR_PAIRS: [string, string][] = [
  ['#7C3AED', '#0060EF'], ['#BE185D', '#7C3AED'], ['#0284C7', '#0D9488'],
  ['#B45309', '#D97706'], ['#065F46', '#0284C7'], ['#831843', '#9D174D'],
  ['#1D4ED8', '#0891B2'], ['#6D28D9', '#DB2777'], ['#0F766E', '#0369A1'],
  ['#92400E', '#78350F'], ['#4338CA', '#7C3AED'], ['#0E7490', '#0284C7'],
];

const RAW_USERS = [
  { name: 'Neon Pulse',      bio: 'Electronic producer. Midnight sounds.' },
  { name: 'Solar Keys',      bio: 'Keys, synths, and soul.' },
  { name: 'Drift',           bio: 'Lo-fi beats to study and relax.' },
  { name: 'The Lux',         bio: 'R&B vibes, velvet production.' },
  { name: 'Velvet Room',     bio: 'Bedroom pop and cinematic textures.' },
  { name: 'Axel Morrow',     bio: 'Singer-songwriter from Austin, TX.' },
  { name: 'Coda',            bio: 'Post-rock and ambient soundscapes.' },
  { name: 'Haze Theory',     bio: 'Hip-hop production for the culture.' },
  { name: 'Luna Byte',       bio: 'Techno and industrial electronics.' },
  { name: 'Petal',           bio: 'Folk with an indie twist.' },
  { name: 'Circuit Brown',   bio: 'Jazz-infused electronic fusion.' },
  { name: 'Sunken City',     bio: 'Dark ambient and experimental.' },
  { name: 'Raye',            bio: 'Pop hooks, real lyrics.' },
  { name: 'Milo Strange',    bio: 'Indie rock and post-punk revival.' },
  { name: 'Cipher Six',      bio: 'Underground rap. No features.' },
  { name: 'Lena Shore',      bio: 'Ocean-inspired ambient pop.' },
  { name: 'Theo Black',      bio: 'Dark R&B and alternative.' },
  { name: 'Jade Circuit',    bio: 'Psychedelic synth-pop.' },
  { name: 'Vera Nox',        bio: 'Classical meets electronic.' },
  { name: 'Fox Hollow',      bio: 'Country rock hybrid.' },
  { name: 'GRND',            bio: 'Bass music and club bangers.' },
  { name: 'Kira Waves',      bio: 'Dream pop with reverb layers.' },
  { name: 'Sable',           bio: 'Minimal techno and deep house.' },
  { name: 'Tundra',          bio: 'Arctic-inspired atmospheric IDM.' },
  { name: 'Mara Voss',       bio: 'Neo-soul and jazz vocals.' },
  { name: 'Static Kind',     bio: 'Noise rock and shoegaze.' },
  { name: 'Prism Road',      bio: 'Alternative indie with pop sensibility.' },
  { name: 'Elec Noir',       bio: 'Darksynth and retrowave.' },
  { name: 'Bloom District',  bio: 'Indie folk collective.' },
  { name: 'Kestrel',         bio: 'Introspective hip-hop.' },
  { name: 'Nova Shade',      bio: 'Alt-pop and bedroom production.' },
  { name: 'Ruin Boy',        bio: 'Trap beats and melodic rap.' },
  { name: 'Cosmo Laine',     bio: 'Funk revival and groove.' },
  { name: 'Elio',            bio: 'Piano-driven emotional ballads.' },
  { name: 'Ash Circuit',     bio: 'Industrial and EBM.' },
  { name: 'Pearl Drive',     bio: 'Smooth jazz fusion.' },
  { name: 'Fern Signal',     bio: 'Ambient and new age.' },
  { name: 'Zero Day',        bio: 'Metalcore and djent.' },
  { name: 'Cara Soleil',     bio: 'Bossa nova meets indie.' },
  { name: 'Nyx',             bio: 'Dark pop and goth-adjacent.' },
  { name: 'Reed State',      bio: 'Electronic punk hybrid.' },
  { name: 'Solstice',        bio: 'Seasonal ambient collections.' },
  { name: 'Pale Mirror',     bio: 'Shoegaze and dream pop.' },
  { name: 'Malik Crest',     bio: 'Conscious rap and spoken word.' },
  { name: 'Fauna',           bio: 'Nature-inspired folk music.' },
  { name: 'Hex Grid',        bio: 'Chiptune and retro game sounds.' },
  { name: 'Lola Reve',       bio: 'Cabaret and neo-noir jazz.' },
  { name: 'Dense Fog',       bio: 'Experimental and avant-garde.' },
  { name: 'Sorrow Index',    bio: 'Post-metal and doom.' },
  { name: 'Tempo Shift',     bio: 'Drum and bass production.' },
  { name: 'Ivy Lane',        bio: 'Acoustic and soft indie.' },
  { name: 'Phantom Gear',    bio: 'Synthwave and 80s retro.' },
  { name: 'Rook',            bio: 'Jazz rap and sample-heavy beats.' },
  { name: 'Mirage Cult',     bio: 'Psychedelic rock revival.' },
  { name: 'Opal Sound',      bio: 'Meditative and healing music.' },
  { name: 'Stray Volt',      bio: 'Garage punk and lo-fi rock.' },
  { name: 'Dune Walker',     bio: 'Desert blues and world fusion.' },
  { name: 'Cassidy Moon',    bio: 'Indie pop singer-songwriter.' },
  { name: 'WRAITH',          bio: 'Dark trap and cloud rap.' },
];

export const USERS: MockUser[] = RAW_USERS.map((u, i) => ({
  id: `user_${i + 1}`,
  username: u.name.toLowerCase().replace(/\s+/g, '_'),
  displayName: u.name,
  bio: u.bio,
  followers: rnd(200, 120_000),
  following: rnd(20, 2_000),
  tracks: rnd(2, 80),
  isVerified: i < 15,
  avatarColor: AVATAR_PAIRS[i % AVATAR_PAIRS.length],
  initials: u.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
}));

// ─── Genres ──────────────────────────────────────────────────────────────────

export interface Genre {
  id: string;
  label: string;
  color1: string;
  color2: string;
  icon: string;
  trackCount: number;
}

export const GENRES: Genre[] = [
  { id: 'g1',  label: 'Electronic',  color1: '#4338CA', color2: '#0060EF', icon: 'lightning-bolt',     trackCount: 2840 },
  { id: 'g2',  label: 'Hip-Hop',     color1: '#BE185D', color2: '#7C3AED', icon: 'microphone',         trackCount: 3120 },
  { id: 'g3',  label: 'Lo-Fi',       color1: '#065F46', color2: '#0284C7', icon: 'coffee',             trackCount: 1560 },
  { id: 'g4',  label: 'R&B',         color1: '#831843', color2: '#BE185D', icon: 'heart',              trackCount: 1980 },
  { id: 'g5',  label: 'Indie',       color1: '#92400E', color2: '#B45309', icon: 'guitar-acoustic',    trackCount: 2200 },
  { id: 'g6',  label: 'Pop',         color1: '#0E7490', color2: '#0284C7', icon: 'music-note',         trackCount: 4100 },
  { id: 'g7',  label: 'Jazz',        color1: '#1D4ED8', color2: '#0891B2', icon: 'saxophone',          trackCount: 980  },
  { id: 'g8',  label: 'Ambient',     color1: '#0F766E', color2: '#0369A1', icon: 'weather-night',      trackCount: 1200 },
  { id: 'g9',  label: 'Rock',        color1: '#7F1D1D', color2: '#991B1B', icon: 'guitar-electric',    trackCount: 2650 },
  { id: 'g10', label: 'Classical',   color1: '#3B0764', color2: '#6D28D9', icon: 'piano',              trackCount: 760  },
  { id: 'g11', label: 'Techno',      color1: '#0A0A0F', color2: '#1D4ED8', icon: 'metronome',          trackCount: 1440 },
  { id: 'g12', label: 'Folk',        color1: '#78350F', color2: '#92400E', icon: 'nature',             trackCount: 890  },
];

// ─── Tracks (200) ────────────────────────────────────────────────────────────

export interface MockTrack {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  genre: string;
  duration: number; // seconds
  plays: number;
  likes: number;
  color1: string;
  color2: string;
  bpm: number;
  isLiked: boolean;
  uploadedAt: string;
}

const TRACK_TITLES = [
  'Midnight Drive', 'Starlit Reverie', 'Lost in the Echo', 'Neon Rainfall',
  'Pulse', 'Gravity Well', 'Cold Harbor', 'After Hours', 'Lucid',
  'Frequency', 'Signal Lost', 'Hollow Ground', 'Retrograde', 'Phase Shift',
  'Carbon Blue', 'Glass Tower', 'Velvet Crush', 'Drift State', 'Aurora',
  'Infinite Room', 'Dawn Protocol', 'Deep Current', 'Fracture', 'The Edge',
  'Void Walker', 'Electric Garden', 'Night Protocol', 'Cascade', 'Tremor',
  'Broken Signal', 'Surface Tension', 'Parallel Lines', 'Resonance',
  'Thermal', 'Static Dream', 'Undertow', 'Haze', 'Phantom Circuit',
  'Slow Burn', 'Radio Dark', 'Collapse', 'Elevation', 'Tidal Force',
  'Copper Rain', 'Event Horizon', 'Liminal Space', 'Override', 'Decay',
  'Synthesis', 'Open Circuit', 'Blank Canvas', 'Undertone', 'Wavelength',
  'The Narrow Path', 'Deep Blue', 'Midnight Protocol', 'Solar Wind',
  'Obsidian', 'Pulse Wave', 'Ghost Light', 'Mirror World', 'Echo Chamber',
  'Lowlight', 'Red Noise', 'Skyline', 'Freefall', 'Lost Transmission',
  'Signal Fire', 'Static Field', 'Hollow Echo', 'Dreamstate', 'Cold Light',
  'Neon Sky', 'Warp Drive', 'Distant Shore', 'Rift', 'Undertow II',
  'Dark Matter', 'Satellite', 'Open Loop', 'Dissolve', 'Apex',
  'Terminal', 'Last Light', 'Invisible Hand', 'Ground Zero', 'Current',
  'Blackout', 'Phase', 'Blueprint', 'Afterglow', 'Momentum',
  'Reverb City', 'Slow Wave', 'The Fade', 'Control Room', 'Impact',
  'First Light', 'Low Signal', 'Empty Space', 'Crossroads', 'Orbit',
];

const ALBUMS = [
  'Synthetic Nights', 'Deep Blue Vol.1', 'After Midnight', 'Pulse EP', 'Signal',
  'The Quiet Hours', 'Neon Archives', 'Hollow Ground', 'Phase One', 'Aurora',
  'Static Dreams', 'Carbon Skies', 'Open Source', 'Tremor EP', 'Drift Vol.2',
  'Cold Harbor LP', 'Frequency', 'Last Transmissions', 'Elevation', 'Cascade',
];

const COLOR_PAIRS: [string, string][] = [
  ['#6B21A8', '#0060EF'], ['#BE185D', '#7C3AED'], ['#0284C7', '#0D9488'],
  ['#B45309', '#D97706'], ['#065F46', '#0284C7'], ['#7C3AED', '#DB2777'],
  ['#1D4ED8', '#0891B2'], ['#831843', '#9D174D'], ['#4338CA', '#7C3AED'],
  ['#0E7490', '#0284C7'], ['#92400E', '#78350F'], ['#0F766E', '#0369A1'],
  ['#7F1D1D', '#991B1B'], ['#3B0764', '#6D28D9'], ['#78350F', '#92400E'],
];

const GENRE_LABELS = ['Electronic', 'Hip-Hop', 'Lo-Fi', 'R&B', 'Indie', 'Pop', 'Jazz', 'Ambient', 'Rock'];

export const TRACKS: MockTrack[] = Array.from({ length: 200 }, (_, i) => {
  const user = USERS[i % USERS.length];
  const pair = COLOR_PAIRS[i % COLOR_PAIRS.length];
  return {
    id: `track_${i + 1}`,
    title: TRACK_TITLES[i % TRACK_TITLES.length] + (i >= TRACK_TITLES.length ? ` ${Math.floor(i / TRACK_TITLES.length) + 1}` : ''),
    artist: user.displayName,
    artistId: user.id,
    album: ALBUMS[i % ALBUMS.length],
    genre: GENRE_LABELS[i % GENRE_LABELS.length],
    duration: rnd(120, 360),
    plays: rnd(500, 2_500_000),
    likes: rnd(20, 80_000),
    color1: pair[0],
    color2: pair[1],
    bpm: rnd(70, 175),
    isLiked: i % 7 === 0,
    uploadedAt: new Date(Date.now() - rnd(0, 365) * 86_400_000).toISOString(),
  };
});

// ─── Playlists (40) ──────────────────────────────────────────────────────────

export interface MockPlaylist {
  id: string;
  name: string;
  description: string;
  trackCount: number;
  color1: string;
  color2: string;
  curator: string;
  plays: number;
}

const PLAYLIST_DATA = [
  { name: 'Discover Weekly',        desc: 'Fresh picks based on your taste.' },
  { name: 'Late Night Drive',       desc: 'Smooth beats for night rides.' },
  { name: 'Focus Flow',             desc: 'Deep work and concentration.' },
  { name: 'Chill Vibes',            desc: 'Relax and unwind.' },
  { name: 'Workout Mix',            desc: 'High-energy bangers only.' },
  { name: 'Morning Coffee',         desc: 'Gentle start to your day.' },
  { name: 'Rainy Day',              desc: 'Cozy tunes for grey skies.' },
  { name: 'Party Starter',          desc: 'Turn it up loud.' },
  { name: 'Road Trip',              desc: 'Miles and miles of music.' },
  { name: 'Throwback Jams',         desc: 'Nostalgia hits different.' },
  { name: 'Deep Focus',             desc: 'Binaural and ambient beats.' },
  { name: 'New Releases',           desc: 'Freshest tracks this week.' },
  { name: 'Top Charts',             desc: 'What the world is listening to.' },
  { name: 'Hidden Gems',            desc: 'Under-the-radar bangers.' },
  { name: 'Late Night Coding',      desc: 'Dark beats for dark screens.' },
  { name: 'Sunday Reset',           desc: 'Slow down and recover.' },
  { name: 'Electronic Essentials',  desc: 'The defining electronic tracks.' },
  { name: 'Hip-Hop Heat',           desc: 'Bars and production, no filler.' },
  { name: 'Indie Picks',            desc: 'Best of independent artists.' },
  { name: 'Jazz After Dark',        desc: 'Smooth jazz for late evenings.' },
  { name: 'Ambient Space',          desc: 'Float through the cosmos.' },
  { name: 'Bass Heavy',             desc: 'Sub-woofer required.' },
  { name: 'Acoustic Sessions',      desc: 'Raw and intimate performances.' },
  { name: 'Summer Hits',            desc: 'Sun, sand, and good vibes.' },
  { name: 'Winter Sounds',          desc: 'Cold outside, warm inside.' },
  { name: 'Piano Only',             desc: 'Keys for the soul.' },
  { name: 'Vocal Legends',          desc: 'Voices that move mountains.' },
  { name: 'Collaborative Cuts',     desc: 'Best collab tracks of the year.' },
  { name: 'Rave Classics',          desc: 'The golden age of rave.' },
  { name: 'Soul Food',              desc: 'Soulful R&B and neo-soul.' },
  { name: 'Post-Rock Summit',       desc: 'Instrumental epics.' },
  { name: 'Bedroom Pop',            desc: 'DIY and home recordings.' },
  { name: 'Darksynth',              desc: 'Aggressive retro-futurism.' },
  { name: 'Tropical Vibes',         desc: 'Island sounds and good times.' },
  { name: 'Garage Sessions',        desc: 'Raw rock and punk.' },
  { name: 'Film Scores',            desc: 'Cinematic and sweeping.' },
  { name: 'Global Rhythms',         desc: 'Music from around the world.' },
  { name: 'Drum Machine',           desc: 'Programmed percussion studies.' },
  { name: 'Singer-Songwriter',      desc: 'Stories told through strings.' },
  { name: 'Night Shift',            desc: 'Music for the late-night worker.' },
];

export const PLAYLISTS: MockPlaylist[] = PLAYLIST_DATA.map((p, i) => ({
  id: `playlist_${i + 1}`,
  name: p.name,
  description: p.desc,
  trackCount: rnd(12, 65),
  color1: COLOR_PAIRS[i % COLOR_PAIRS.length][0],
  color2: COLOR_PAIRS[i % COLOR_PAIRS.length][1],
  curator: USERS[i % USERS.length].displayName,
  plays: rnd(1_000, 5_000_000),
}));

// ─── Posts (100) ─────────────────────────────────────────────────────────────

export interface MockPost {
  id: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  authorColor: [string, string];
  isVerified: boolean;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  createdAt: string;
  tags: string[];
}

const POST_CONTENTS = [
  'Just dropped my new single. Been working on this for 6 months. Hope it hits.',
  'Recording session tonight. The vibes are immaculate.',
  'Collab with a legend is finally done. Two worlds colliding.',
  'Just hit 10K plays. You guys are incredible.',
  'What genre defines this decade? Drop your answer below.',
  'New EP in mastering. Almost there.',
  'Live show tomorrow night. Who is coming?',
  'Sometimes the best track comes from a 3 AM session you almost cancelled.',
  'Unpopular opinion: the demo is always better than the final mix.',
  'Just signed to an indie label. Big things are coming.',
  'The synth on this track took me two weeks to get right. Worth it.',
  'Writing session today was fire. Pages full of ideas.',
  'Played this track to 50 people yesterday. The silence after was everything.',
  'Three years of learning production and it finally clicks.',
  'Collaboration requests are open for this month.',
  'The best part of making music is when someone comes up and says they cried to it.',
  'New music video is in production. Going to be something special.',
  'Spent 8 hours on the mix. Then switched to headphones and started over.',
  'Broke my own rule and added a fourth chorus. No regrets.',
  'Acoustic version dropping Friday. Felt different had to keep it.',
  'Tour dates coming this fall. First time outside my city.',
  'If the hook does not grab you in 5 seconds I start again.',
  'Feedback wanted on my new track. Link in bio.',
  'Mastering is the dark art of music that nobody talks about.',
  'Just bought my first piece of hardware. The workflow has changed.',
  'Wrote 12 songs this month. Only 1 survived. That is fine.',
  'The album cover shoot was yesterday. Art direction on point.',
  'Played this to my dad. He said nothing for a whole minute. That is five stars.',
  'Two years of this producer journey. Still learning every single day.',
  'Drum pattern on the new one breaks every grid rule. And it works.',
  'New sample pack out now. 300+ sounds, all original.',
  'Listening to music on the bus and recognising my own influences is wild.',
  'Dropping a freestyle today because the beat was too good to wait.',
  'My studio is a closet and these headphones and this laptop. No excuses.',
  'The verse wrote itself at 4 AM. Barely remember doing it.',
  'Every song I regret releasing later becomes my biggest track. Funny how that works.',
  'Collaboration is the fastest way to grow as an artist. Find your people.',
  'New instrumental EP. No words needed.',
  'First royalty cheque was exactly enough for a pizza. Progress.',
  'Production tip: leave the mix alone for 24 hours then come back. Everything changes.',
  'Two tracks just got placed in a TV show. Cannot say which one yet.',
  'The guitar line on this track was an accident. Keeping all accidents from now on.',
  'Short form content does not do music justice. Listen to the full track.',
  'Genre is a cage. Good music breaks every bar.',
  'Spent this weekend in a cabin with no WiFi and wrote an album.',
  'The feature on my new track is someone you know. Dropping Monday.',
  'Vinyl pressing confirmed. Holding your own record is something else.',
  'What is everyone listening to this week? Drop it below.',
  'Beat tape number seven is done. Sending it out tomorrow.',
  'Every artist you love was once a beginner with bad headphones and big dreams.',
];

const TAG_POOL = [
  '#newmusic', '#producer', '#beatmaker', '#indieartist', '#electronicmusic',
  '#hiphop', '#lofi', '#rnb', '#singerSongwriter', '#ambientmusic',
  '#studiosession', '#newartist', '#musicproduction', '#underground',
  '#streaming', '#collab', '#beatdrop', '#indierock', '#jazz', '#motif',
];

export const POSTS: MockPost[] = Array.from({ length: 100 }, (_, i) => {
  const user = USERS[i % USERS.length];
  const ago = rnd(0, 14) * 86_400_000 + rnd(0, 23) * 3_600_000;
  return {
    id: `post_${i + 1}`,
    authorId: user.id,
    authorName: user.displayName,
    authorInitials: user.initials,
    authorColor: user.avatarColor,
    isVerified: user.isVerified,
    content: POST_CONTENTS[i % POST_CONTENTS.length],
    likes: rnd(5, 8_000),
    comments: rnd(0, 300),
    shares: rnd(0, 150),
    isLiked: i % 9 === 0,
    createdAt: new Date(Date.now() - ago).toISOString(),
    tags: [TAG_POOL[i % TAG_POOL.length], TAG_POOL[(i + 3) % TAG_POOL.length]],
  };
});

// ─── Trending Tracks (top 20 by plays) ───────────────────────────────────────

export const TRENDING_TRACKS: MockTrack[] = [...TRACKS]
  .sort((a, b) => b.plays - a.plays)
  .slice(0, 20);

// ─── Curated playlists shown on Home ─────────────────────────────────────────

export const CURATED_PLAYLISTS: MockPlaylist[] = PLAYLISTS.slice(0, 8);

// ─── Top Daily playlists ──────────────────────────────────────────────────────

export const TOP_DAILY: MockPlaylist[] = PLAYLISTS.slice(8, 18);

// ─── Featured Artists ────────────────────────────────────────────────────────

export const FEATURED_ARTISTS: MockUser[] = USERS.slice(0, 20);

// ─── Recently Played ─────────────────────────────────────────────────────────

export const RECENTLY_PLAYED: MockTrack[] = TRACKS.slice(0, 12);

// ─── New Releases ────────────────────────────────────────────────────────────

export const NEW_RELEASES: MockTrack[] = [...TRACKS]
  .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
  .slice(0, 30);

// ─── Liked Tracks (user's library) ───────────────────────────────────────────

export const LIKED_TRACKS: MockTrack[] = TRACKS.filter(t => t.isLiked);

// ─── Utility formatters ───────────────────────────────────────────────────────

export function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatPlays(n: number): string {
  return fmt(n);
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  const wks = Math.floor(days / 7);
  if (wks < 5) return `${wks}w ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Billboard Hot 100 — 2020-2025 ───────────────────────────────────────────

export interface BillboardTrack extends MockTrack {
  peakPosition: number;
  weeksOnChart: number;
  chartYear: number;
}

const BB_COLOR: Record<string, [string, string]> = {
  'Pop':       ['#0E7490', '#0284C7'],
  'Hip-Hop':   ['#BE185D', '#7C3AED'],
  'R&B':       ['#831843', '#BE185D'],
  'Electronic':['#4338CA', '#0060EF'],
  'Rock':      ['#7F1D1D', '#991B1B'],
  'Indie':     ['#92400E', '#B45309'],
  'Folk':      ['#78350F', '#92400E'],
  'Country':   ['#B45309', '#D97706'],
  'Latin':     ['#065F46', '#0D9488'],
};

const BB_RAW: {
  title: string; artist: string; album: string; genre: string;
  year: number; peak: number; weeks: number; duration: number;
}[] = [
  // ── 2020 ──────────────────────────────────────────────────────────────────
  { title: 'Blinding Lights',            artist: 'The Weeknd',               album: 'After Hours',                  genre: 'Pop',        year: 2020, peak: 1,  weeks: 57, duration: 200 },
  { title: 'The Box',                    artist: 'Roddy Ricch',              album: 'Please Excuse Me for Being Antisocial', genre: 'Hip-Hop', year: 2020, peak: 1, weeks: 32, duration: 197 },
  { title: 'Rockstar',                   artist: 'DaBaby ft. Roddy Ricch',   album: 'Blame It on Baby',             genre: 'Hip-Hop',    year: 2020, peak: 1,  weeks: 28, duration: 178 },
  { title: 'Roses',                      artist: 'SAINt JHN',                album: 'While the World Was Burning',  genre: 'R&B',        year: 2020, peak: 4,  weeks: 25, duration: 176 },
  { title: 'Life Is Good',               artist: 'Future ft. Drake',         album: 'High Off Life',                genre: 'Hip-Hop',    year: 2020, peak: 2,  weeks: 22, duration: 237 },
  { title: 'Toosie Slide',               artist: 'Drake',                    album: 'Dark Lane Demo Tapes',         genre: 'Hip-Hop',    year: 2020, peak: 1,  weeks: 18, duration: 228 },
  { title: 'Mood',                       artist: '24kGoldn ft. Iann Dior',   album: 'El Dorado',                    genre: 'Pop',        year: 2020, peak: 1,  weeks: 33, duration: 140 },
  { title: 'WAP',                        artist: 'Cardi B ft. Megan Thee Stallion', album: 'WAP',               genre: 'Hip-Hop',    year: 2020, peak: 1,  weeks: 15, duration: 202 },
  { title: 'Savage',                     artist: 'Megan Thee Stallion ft. Beyonce', album: 'Suga',              genre: 'Hip-Hop',    year: 2020, peak: 1,  weeks: 20, duration: 211 },
  { title: 'Death Bed',                  artist: 'Powfu ft. beabadoobee',    album: 'Death Bed',                    genre: 'Indie',      year: 2020, peak: 23, weeks: 21, duration: 173 },
  { title: 'Watermelon Sugar',           artist: 'Harry Styles',             album: 'Fine Line',                    genre: 'Pop',        year: 2020, peak: 1,  weeks: 36, duration: 174 },
  { title: 'Rain on Me',                 artist: 'Lady Gaga & Ariana Grande',album: 'Chromatica',                   genre: 'Pop',        year: 2020, peak: 1,  weeks: 14, duration: 212 },
  { title: 'Dynamite',                   artist: 'BTS',                      album: 'BE',                           genre: 'Pop',        year: 2020, peak: 1,  weeks: 32, duration: 199 },
  { title: 'Cardigan',                   artist: 'Taylor Swift',             album: 'Folklore',                     genre: 'Indie',      year: 2020, peak: 1,  weeks: 25, duration: 239 },
  { title: 'Hawai',                      artist: 'Maluma',                   album: 'Papi Juancho',                 genre: 'Latin',      year: 2020, peak: 2,  weeks: 18, duration: 197 },
  { title: 'Intentions',                 artist: 'Justin Bieber ft. Quavo',  album: 'Changes',                      genre: 'Pop',        year: 2020, peak: 4,  weeks: 21, duration: 217 },
  { title: 'Laugh Now Cry Later',        artist: 'Drake ft. Lil Durk',       album: 'Dark Lane Demo Tapes',         genre: 'Hip-Hop',    year: 2020, peak: 2,  weeks: 22, duration: 253 },
  { title: 'Positions',                  artist: 'Ariana Grande',            album: 'Positions',                    genre: 'Pop',        year: 2020, peak: 1,  weeks: 24, duration: 173 },
  { title: 'Whats Poppin',              artist: 'Jack Harlow',               album: 'Thats What They All Say',     genre: 'Hip-Hop',    year: 2020, peak: 2,  weeks: 29, duration: 145 },
  { title: 'Therefore I Am',            artist: 'Billie Eilish',             album: 'Therefore I Am',               genre: 'Pop',        year: 2020, peak: 2,  weeks: 18, duration: 174 },

  // ── 2021 ──────────────────────────────────────────────────────────────────
  { title: 'Drivers License',            artist: 'Olivia Rodrigo',           album: 'SOUR',                         genre: 'Pop',        year: 2021, peak: 1,  weeks: 33, duration: 242 },
  { title: 'Levitating',                 artist: 'Dua Lipa ft. DaBaby',      album: 'Future Nostalgia',             genre: 'Pop',        year: 2021, peak: 2,  weeks: 59, duration: 203 },
  { title: 'Montero',                    artist: 'Lil Nas X',                album: 'MONTERO',                      genre: 'Pop',        year: 2021, peak: 1,  weeks: 30, duration: 137 },
  { title: 'Good 4 U',                   artist: 'Olivia Rodrigo',           album: 'SOUR',                         genre: 'Pop',        year: 2021, peak: 1,  weeks: 26, duration: 178 },
  { title: 'Butter',                     artist: 'BTS',                      album: 'Butter',                       genre: 'Pop',        year: 2021, peak: 1,  weeks: 26, duration: 164 },
  { title: 'Peaches',                    artist: 'Justin Bieber ft. Daniel Caesar & Giveon', album: 'Justice',   genre: 'R&B',        year: 2021, peak: 1,  weeks: 29, duration: 198 },
  { title: 'Leave The Door Open',        artist: 'Silk Sonic',               album: 'An Evening With Silk Sonic',   genre: 'R&B',        year: 2021, peak: 1,  weeks: 29, duration: 243 },
  { title: 'Kiss Me More',               artist: 'Doja Cat ft. SZA',         album: 'Planet Her',                   genre: 'R&B',        year: 2021, peak: 3,  weeks: 28, duration: 208 },
  { title: 'Happier Than Ever',          artist: 'Billie Eilish',            album: 'Happier Than Ever',            genre: 'Pop',        year: 2021, peak: 15, weeks: 16, duration: 295 },
  { title: 'Industry Baby',              artist: 'Lil Nas X ft. Jack Harlow',album: 'MONTERO',                      genre: 'Hip-Hop',    year: 2021, peak: 1,  weeks: 20, duration: 212 },
  { title: 'Astronaut in the Ocean',     artist: 'Masked Wolf',              album: 'Astronomical',                 genre: 'Hip-Hop',    year: 2021, peak: 8,  weeks: 24, duration: 132 },
  { title: 'Deja Vu',                    artist: 'Olivia Rodrigo',           album: 'SOUR',                         genre: 'Pop',        year: 2021, peak: 8,  weeks: 20, duration: 215 },
  { title: 'Need To Know',               artist: 'Doja Cat',                 album: 'Planet Her',                   genre: 'R&B',        year: 2021, peak: 6,  weeks: 19, duration: 216 },
  { title: 'Permission to Dance',        artist: 'BTS',                      album: 'Permission to Dance',          genre: 'Pop',        year: 2021, peak: 1,  weeks: 12, duration: 187 },
  { title: 'Smooth Criminal',            artist: 'Polo G',                   album: 'Hall of Fame',                 genre: 'Hip-Hop',    year: 2021, peak: 3,  weeks: 18, duration: 174 },
  { title: 'Essence',                    artist: 'WizKid ft. Tems',          album: 'Made in Lagos',                genre: 'R&B',        year: 2021, peak: 11, weeks: 22, duration: 252 },
  { title: 'Way 2 Sexy',                 artist: 'Drake ft. Future & Young Thug', album: 'Certified Lover Boy',  genre: 'Hip-Hop',    year: 2021, peak: 1,  weeks: 10, duration: 268 },
  { title: 'Heartbreak Anniversary',     artist: 'Giveon',                   album: 'Take Time',                    genre: 'R&B',        year: 2021, peak: 14, weeks: 25, duration: 198 },
  { title: 'Fancy Like',                 artist: 'Walker Hayes',             album: 'Country Stuff the Album',      genre: 'Country',    year: 2021, peak: 3,  weeks: 44, duration: 152 },
  { title: 'Talking to the Moon',        artist: 'Bruno Mars',               album: 'Doo-Wops and Hooligans',       genre: 'Pop',        year: 2021, peak: 40, weeks: 18, duration: 233 },

  // ── 2022 ──────────────────────────────────────────────────────────────────
  { title: 'As It Was',                  artist: 'Harry Styles',             album: "Harry's House",                genre: 'Pop',        year: 2022, peak: 1,  weeks: 55, duration: 167 },
  { title: 'About Damn Time',            artist: 'Lizzo',                    album: 'Special',                      genre: 'Pop',        year: 2022, peak: 1,  weeks: 31, duration: 193 },
  { title: 'Heat Waves',                 artist: 'Glass Animals',            album: 'Dreamland',                    genre: 'Indie',      year: 2022, peak: 1,  weeks: 91, duration: 238 },
  { title: 'Running Up That Hill',       artist: 'Kate Bush',                album: 'Hounds of Love',               genre: 'Pop',        year: 2022, peak: 3,  weeks: 24, duration: 300 },
  { title: 'Anti-Hero',                  artist: 'Taylor Swift',             album: 'Midnights',                    genre: 'Pop',        year: 2022, peak: 1,  weeks: 45, duration: 200 },
  { title: 'Unholy',                     artist: 'Sam Smith ft. Kim Petras', album: 'Gloria',                       genre: 'Pop',        year: 2022, peak: 1,  weeks: 22, duration: 156 },
  { title: 'Bad Habit',                  artist: 'Steve Lacy',               album: 'Gemini Rights',                genre: 'R&B',        year: 2022, peak: 1,  weeks: 24, duration: 231 },
  { title: 'Easy On Me',                 artist: 'Adele',                    album: '30',                           genre: 'Pop',        year: 2022, peak: 1,  weeks: 30, duration: 224 },
  { title: 'Stay',                       artist: 'The Kid LAROI ft. Justin Bieber', album: 'F*CK LOVE 3',       genre: 'Pop',        year: 2022, peak: 1,  weeks: 31, duration: 141 },
  { title: 'Enemy',                      artist: 'Imagine Dragons ft. JID',  album: 'Arcane',                       genre: 'Rock',       year: 2022, peak: 2,  weeks: 28, duration: 173 },
  { title: 'Die Hard',                   artist: 'Kendrick Lamar ft. Blxst & Amanda Reifer', album: 'Mr. Morale', genre: 'Hip-Hop',  year: 2022, peak: 11, weeks: 18, duration: 268 },
  { title: 'N95',                        artist: 'Kendrick Lamar',           album: 'Mr. Morale & The Big Steppers',genre: 'Hip-Hop',   year: 2022, peak: 5,  weeks: 16, duration: 227 },
  { title: 'Glimpse of Us',              artist: 'Joji',                     album: 'Smithereens',                  genre: 'R&B',        year: 2022, peak: 9,  weeks: 20, duration: 222 },
  { title: 'Super Gremlin',              artist: 'Kodak Black',              album: 'Back for Everything',          genre: 'Hip-Hop',    year: 2022, peak: 2,  weeks: 25, duration: 194 },
  { title: 'jimmy cooks',               artist: 'Drake ft. 21 Savage',       album: 'Honestly, Nevermind',          genre: 'Hip-Hop',    year: 2022, peak: 1,  weeks: 14, duration: 265 },
  { title: 'Wait for U',                 artist: 'Future ft. Drake & Tems',  album: 'I Never Liked You',            genre: 'Hip-Hop',    year: 2022, peak: 1,  weeks: 16, duration: 238 },
  { title: 'Lavender Haze',              artist: 'Taylor Swift',             album: 'Midnights',                    genre: 'Pop',        year: 2022, peak: 2,  weeks: 32, duration: 202 },
  { title: 'Golden Hour',                artist: 'JVKE',                     album: 'this is what heartbreak feels like', genre: 'Pop', year: 2022, peak: 7,  weeks: 30, duration: 209 },
  { title: 'She Had Me at Heads Carolina', artist: 'Cole Swindell',          album: 'She Had Me at Heads Carolina', genre: 'Country',    year: 2022, peak: 6,  weeks: 36, duration: 194 },
  { title: 'Big Energy',                 artist: 'Latto',                    album: '777',                          genre: 'Hip-Hop',    year: 2022, peak: 3,  weeks: 28, duration: 164 },

  // ── 2023 ──────────────────────────────────────────────────────────────────
  { title: 'Flowers',                    artist: 'Miley Cyrus',              album: 'Endless Summer Vacation',      genre: 'Pop',        year: 2023, peak: 1,  weeks: 32, duration: 200 },
  { title: 'Calm Down',                  artist: 'Rema & Selena Gomez',      album: 'Rave & Roses Ultra',           genre: 'R&B',        year: 2023, peak: 4,  weeks: 38, duration: 239 },
  { title: 'Kill Bill',                  artist: 'SZA',                      album: 'SOS',                          genre: 'R&B',        year: 2023, peak: 3,  weeks: 24, duration: 153 },
  { title: 'Cruel Summer',               artist: 'Taylor Swift',             album: 'Lover',                        genre: 'Pop',        year: 2023, peak: 1,  weeks: 50, duration: 178 },
  { title: 'Rich Flex',                  artist: 'Drake & 21 Savage',        album: 'Her Loss',                     genre: 'Hip-Hop',    year: 2023, peak: 1,  weeks: 24, duration: 227 },
  { title: 'Ella Baila Sola',            artist: 'Eslabon Armado & Peso Pluma', album: 'Eslabones de Amor',       genre: 'Latin',      year: 2023, peak: 1,  weeks: 22, duration: 168 },
  { title: 'Vampire',                    artist: 'Olivia Rodrigo',           album: 'GUTS',                         genre: 'Pop',        year: 2023, peak: 1,  weeks: 22, duration: 219 },
  { title: 'Seven',                      artist: 'Jung Kook ft. Latto',      album: 'Golden',                       genre: 'Pop',        year: 2023, peak: 1,  weeks: 18, duration: 188 },
  { title: 'Escapism',                   artist: 'RAYE ft. 070 Shake',       album: 'My 21st Century Blues',        genre: 'R&B',        year: 2023, peak: 7,  weeks: 22, duration: 196 },
  { title: 'Creepin',                    artist: 'Metro Boomin ft. The Weeknd & 21 Savage', album: 'HEROES & VILLAINS', genre: 'Hip-Hop', year: 2023, peak: 3, weeks: 26, duration: 221 },
  { title: 'Shakira: Bzrp Music Sessions Vol. 53', artist: 'Bizarrap & Shakira', album: 'Music Sessions Vol. 53', genre: 'Latin', year: 2023, peak: 9, weeks: 17, duration: 193 },
  { title: 'La Bebe',                    artist: 'Yng Lvcas & Peso Pluma',   album: 'La Bebe',                      genre: 'Latin',      year: 2023, peak: 2,  weeks: 20, duration: 187 },
  { title: 'Snooze',                     artist: 'SZA',                      album: 'SOS',                          genre: 'R&B',        year: 2023, peak: 4,  weeks: 25, duration: 221 },
  { title: 'Tomorrow 2',                 artist: 'GloRilla ft. Cardi B',     album: 'Tomorrow 2',                   genre: 'Hip-Hop',    year: 2023, peak: 7,  weeks: 18, duration: 196 },
  { title: 'Anti-Hero',                  artist: 'Taylor Swift',             album: 'Midnights',                    genre: 'Pop',        year: 2023, peak: 1,  weeks: 45, duration: 200 },
  { title: 'Quedate',                    artist: 'Peso Pluma ft. Carin Leon',album: 'GENESIS',                      genre: 'Latin',      year: 2023, peak: 3,  weeks: 24, duration: 204 },
  { title: 'Cupid',                      artist: 'FIFTY FIFTY',              album: 'The Beginning',                genre: 'Pop',        year: 2023, peak: 7,  weeks: 20, duration: 175 },
  { title: 'Mañana Será Bonito',         artist: 'Karol G',                  album: 'Manana Sera Bonito',           genre: 'Latin',      year: 2023, peak: 12, weeks: 18, duration: 199 },
  { title: 'Players',                    artist: 'Coi Leray',                album: 'Players',                      genre: 'Hip-Hop',    year: 2023, peak: 13, weeks: 22, duration: 120 },
  { title: 'Last Night',                 artist: 'Morgan Wallen',             album: 'One Thing at a Time',          genre: 'Country',    year: 2023, peak: 1,  weeks: 42, duration: 173 },

  // ── 2024 ──────────────────────────────────────────────────────────────────
  { title: 'Espresso',                   artist: 'Sabrina Carpenter',        album: 'Short n Sweet',                genre: 'Pop',        year: 2024, peak: 1,  weeks: 40, duration: 175 },
  { title: 'Too Sweet',                  artist: 'Hozier',                   album: 'Unreal Unearth',               genre: 'Indie',      year: 2024, peak: 1,  weeks: 22, duration: 242 },
  { title: 'Beautiful Things',           artist: 'Benson Boone',             album: 'Fireworks & Rollerblades',     genre: 'Pop',        year: 2024, peak: 2,  weeks: 30, duration: 218 },
  { title: 'Good Luck Babe',            artist: 'Chappell Roan',             album: 'The Rise and Fall of a Midwest Princess', genre: 'Pop', year: 2024, peak: 2, weeks: 28, duration: 218 },
  { title: 'Lose Control',               artist: 'Teddy Swims',              album: 'I\'ve Tried Everything But Changing', genre: 'R&B',  year: 2024, peak: 2,  weeks: 38, duration: 214 },
  { title: 'Taste',                      artist: 'Sabrina Carpenter',        album: 'Short n Sweet',                genre: 'Pop',        year: 2024, peak: 1,  weeks: 28, duration: 153 },
  { title: 'Not Like Us',                artist: 'Kendrick Lamar',           album: 'Not Like Us',                  genre: 'Hip-Hop',    year: 2024, peak: 1,  weeks: 20, duration: 274 },
  { title: 'Please Please Please',       artist: 'Sabrina Carpenter',        album: 'Short n Sweet',                genre: 'Pop',        year: 2024, peak: 1,  weeks: 24, duration: 187 },
  { title: 'Die With A Smile',           artist: 'Lady Gaga & Bruno Mars',   album: 'Die With A Smile',             genre: 'Pop',        year: 2024, peak: 1,  weeks: 26, duration: 251 },
  { title: 'Birds Of A Feather',         artist: 'Billie Eilish',            album: 'HIT ME HARD AND SOFT',         genre: 'Pop',        year: 2024, peak: 2,  weeks: 24, duration: 229 },
  { title: 'Million Dollar Baby',        artist: 'Tommy Richman',            album: 'Million Dollar Baby',          genre: 'R&B',        year: 2024, peak: 1,  weeks: 18, duration: 130 },
  { title: 'A Bar Song',                 artist: 'Shaboozey',                album: 'Where I Come From',            genre: 'Country',    year: 2024, peak: 1,  weeks: 50, duration: 195 },
  { title: 'Lucky',                      artist: 'Twice',                    album: 'With You-th',                  genre: 'Pop',        year: 2024, peak: 20, weeks: 14, duration: 178 },
  { title: 'Harleys in Hawaii',          artist: 'Katy Perry',               album: 'KP5',                          genre: 'Pop',        year: 2024, peak: 11, weeks: 16, duration: 188 },
  { title: "We Can't Be Friends",        artist: 'Ariana Grande',            album: 'Eternal Sunshine',             genre: 'Pop',        year: 2024, peak: 1,  weeks: 20, duration: 218 },
  { title: 'Texas Hold Em',              artist: 'Beyonce',                  album: 'Cowboy Carter',                genre: 'Country',    year: 2024, peak: 1,  weeks: 26, duration: 209 },
  { title: 'Pink Pony Club',             artist: 'Chappell Roan',            album: 'The Rise and Fall of a Midwest Princess', genre: 'Pop', year: 2024, peak: 12, weeks: 22, duration: 247 },
  { title: 'Feather',                    artist: 'Sabrina Carpenter',        album: 'emails i cant send',           genre: 'Pop',        year: 2024, peak: 16, weeks: 20, duration: 171 },
  { title: 'Superman',                   artist: 'Eminem',                   album: 'The Death of Slim Shady',      genre: 'Hip-Hop',    year: 2024, peak: 8,  weeks: 16, duration: 194 },
  { title: 'Stargazing',                 artist: 'Myles Smith',              album: 'This Is What Falling Feels Like', genre: 'Indie',   year: 2024, peak: 8,  weeks: 22, duration: 199 },

  // ── 2025 ──────────────────────────────────────────────────────────────────
  { title: 'luther',                     artist: 'Kendrick Lamar & SZA',     album: 'GNX',                          genre: 'Hip-Hop',    year: 2025, peak: 1,  weeks: 18, duration: 222 },
  { title: 'APT.',                       artist: 'ROSE & Bruno Mars',        album: 'Rosie',                        genre: 'Pop',        year: 2025, peak: 1,  weeks: 22, duration: 174 },
  { title: "That's So True",             artist: 'Gracie Abrams',            album: 'The Secret of Us',             genre: 'Indie',      year: 2025, peak: 3,  weeks: 20, duration: 189 },
  { title: 'Timeless',                   artist: 'The Weeknd ft. Playboi Carti', album: 'Hurry Up Tomorrow',       genre: 'R&B',        year: 2025, peak: 2,  weeks: 16, duration: 244 },
  { title: 'Baptized by Fire',           artist: 'Sabrina Carpenter',        album: 'Short n Sweet',                genre: 'Pop',        year: 2025, peak: 4,  weeks: 14, duration: 163 },
  { title: 'Squabble Up',                artist: 'Kendrick Lamar',           album: 'GNX',                          genre: 'Hip-Hop',    year: 2025, peak: 2,  weeks: 16, duration: 168 },
  { title: 'Nokia',                      artist: 'Drake',                    album: 'Certified Lover Boy',          genre: 'Hip-Hop',    year: 2025, peak: 8,  weeks: 12, duration: 198 },
  { title: 'Beautiful Things',           artist: 'Benson Boone',             album: 'Fireworks & Rollerblades',     genre: 'Pop',        year: 2025, peak: 2,  weeks: 30, duration: 218 },
  { title: 'Abcdefu',                    artist: 'GAYLE',                    album: 'a study of the human experience volume one', genre: 'Pop', year: 2025, peak: 6, weeks: 18, duration: 172 },
  { title: 'Sailor Song',                artist: 'Gigi Perez',               album: 'Sailor Song',                  genre: 'Folk',       year: 2025, peak: 11, weeks: 18, duration: 214 },
  { title: 'Losers',                     artist: 'The Weeknd & Anitta',      album: 'Hurry Up Tomorrow',            genre: 'Pop',        year: 2025, peak: 5,  weeks: 14, duration: 187 },
  { title: 'Heart of Gold',              artist: 'Post Malone',              album: 'F-1 Trillion',                 genre: 'Country',    year: 2025, peak: 4,  weeks: 16, duration: 193 },
  { title: 'Lie to Girls',               artist: 'Chappell Roan',            album: 'The Rise and Fall of a Midwest Princess', genre: 'Pop', year: 2025, peak: 7, weeks: 12, duration: 198 },
  { title: 'What I Want',                artist: 'Sabrina Carpenter',        album: 'Short n Sweet',                genre: 'Pop',        year: 2025, peak: 9,  weeks: 12, duration: 167 },
  { title: 'Manchild',                   artist: 'Chappell Roan',            album: 'The Rise and Fall of a Midwest Princess', genre: 'Pop', year: 2025, peak: 14, weeks: 10, duration: 204 },
];

export const BILLBOARD_TRACKS: BillboardTrack[] = BB_RAW.map((t, i) => {
  const pair = BB_COLOR[t.genre] ?? ['#0060EF', '#4338CA'];
  return {
    id: `bb_${i + 1}`,
    title: t.title,
    artist: t.artist,
    artistId: `bb_artist_${i + 1}`,
    album: t.album,
    genre: t.genre,
    duration: t.duration,
    plays: Math.round((101 - t.peak) * rnd(80_000, 150_000) * (t.weeks / 10)),
    likes: Math.round((101 - t.peak) * rnd(2_000, 8_000)),
    color1: pair[0],
    color2: pair[1],
    bpm: rnd(80, 160),
    isLiked: i % 11 === 0,
    uploadedAt: new Date(`${t.year}-01-01`).toISOString(),
    peakPosition: t.peak,
    weeksOnChart: t.weeks,
    chartYear: t.year,
  };
});

// Convenience slices
export const BILLBOARD_2020 = BILLBOARD_TRACKS.filter(t => t.chartYear === 2020);
export const BILLBOARD_2021 = BILLBOARD_TRACKS.filter(t => t.chartYear === 2021);
export const BILLBOARD_2022 = BILLBOARD_TRACKS.filter(t => t.chartYear === 2022);
export const BILLBOARD_2023 = BILLBOARD_TRACKS.filter(t => t.chartYear === 2023);
export const BILLBOARD_2024 = BILLBOARD_TRACKS.filter(t => t.chartYear === 2024);
export const BILLBOARD_2025 = BILLBOARD_TRACKS.filter(t => t.chartYear === 2025);

export const BILLBOARD_BY_YEAR: Record<number, BillboardTrack[]> = {
  2020: BILLBOARD_2020,
  2021: BILLBOARD_2021,
  2022: BILLBOARD_2022,
  2023: BILLBOARD_2023,
  2024: BILLBOARD_2024,
  2025: BILLBOARD_2025,
};

// All tracks combined (original + billboard) for screens that just need volume
export const ALL_TRACKS: MockTrack[] = [...TRACKS, ...BILLBOARD_TRACKS];
