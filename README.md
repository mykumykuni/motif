# Motif

A social music discovery app built with React Native + Expo. Users can explore tracks, follow artists, share posts, and upload their own music.

---

## Features

- **Home** — Personalized feed with featured track hero, curated playlists, and trending tracks
- **Explore** — Genre filter chips, trending tracks, and Billboard Hot 100 data (2020–2025)
- **Library** — Personal music collection with Liked, Uploaded, Albums, and Artists tabs
- **Social** — Post feed with likes, comments, and sharing
- **Profile** — User stats, upload history, settings
- **Now Playing** — Full-screen player with progress bar, queue, and controls
- **Upload** — Pick audio + cover art, set genre, publish to your library

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) SDK 54 + [Expo Router](https://expo.github.io/router) v4 |
| Language | TypeScript |
| UI | React Native + custom design system |
| Navigation | Expo Router (file-based) |
| Audio | `expo-audio` |
| Auth | Local AsyncStorage (mock) |
| Storage | Local in-memory store |
| Animations | `react-native-reanimated` 4.x |
| Gradients | `expo-linear-gradient` |
| Blur | `expo-blur` |
| Icons | `@expo/vector-icons` (Ionicons) |

---

## Design System

Dark-first UI with a consistent token system:

| Token | Value | Usage |
|---|---|---|
| Primary | `#0060EF` | Actions, active states, branding |
| Background | `#0A0A0F` | App background |
| Surface | `#16161F` | Cards, sheets |
| Text Primary | `#FFFFFF` | Headings, body |
| Text Secondary | `#8A888C` | Metadata, labels |

**Spacing:** 4px grid (`xs:4` `sm:8` `md:16` `lg:24` `xl:32` `xxl:48`)  
**Radius:** `none:0` `sm:4` `md:8` `lg:16` `full:9999`  
**Elevation:** 4 levels (0–3)

---

## Project Structure

```
motif-app/
├── app/                    # Expo Router screens
│   ├── (auth)/             # Login + signup
│   ├── (tabs)/             # Main tab screens
│   ├── _layout.tsx         # Root layout + auth gate
│   ├── index.tsx           # Entry redirect
│   ├── modal.tsx           # Now playing full screen
│   └── upload.tsx          # Upload screen
├── src/
│   ├── components/
│   │   ├── UI/             # Design system components
│   │   ├── MusicPlayer/    # MiniPlayer bar
│   │   └── Social/         # Post component
│   ├── context/            # Auth, Music, MusicPlayer, Social
│   ├── data/
│   │   └── mockData.ts     # 315 tracks + artists + posts
│   ├── services/
│   │   └── music/          # Track store + upload service
│   ├── styles/
│   │   └── theme.ts        # Design tokens
│   └── types/              # TypeScript types
└── config/
    └── firebase.ts         # Firebase config (disabled)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI — `npm install -g expo-cli`
- Expo Go app on your phone **or** Android emulator

### Install

```bash
git clone https://github.com/mykumykuni/motif.git
cd motif/motif-app
npm install
```

### Run

```bash
npx expo start --clear
```

Press `a` for Android emulator, `i` for iOS simulator, or scan the QR code with Expo Go.

---

## Mock Data

`src/data/mockData.ts` ships with:

- **315 tracks** — 200 original + 115 real Billboard Hot 100 songs (2020–2025)
- **60 artists/users**
- **50+ social posts**
- **8 genres** with color palettes
- Filterable by genre, year, chart position

---

## Screens

| Screen | Route |
|---|---|
| Login | `/(auth)` |
| Sign Up | `/(auth)/signup` |
| Home | `/(tabs)` |
| Explore | `/(tabs)/explore` |
| Library | `/(tabs)/library` |
| Social | `/(tabs)/social` |
| Profile | `/(tabs)/profile` |
| Now Playing | `/modal` |
| Upload | `/upload` |

---

## Roadmap

- [ ] Firebase backend (Firestore + Storage + Auth)
- [ ] Real audio streaming
- [ ] Search with full-text query
- [ ] Push notifications
- [ ] EAS Build + Play Store release

---

## License

MIT
