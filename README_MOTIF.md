# Motif - Music Streaming + Social Media App

## Overview

**Motif** is a React Native app that combines the best of both worlds: a music streaming platform (like Spotify/Apple Music) with social media features (inspired by Instagram). It's designed for both listeners and artists to discover, share, and connect around music.

## Core Features

### 🎵 Music Streaming
- **Browse & Search**: Find music, artists, albums, and playlists
- **Play Music**: Full playback controls (play, pause, skip, seek)
- **Playlists**: Create, manage, and share playlists
- **Library**: Save tracks, albums, and playlists
- **Recommendations**: Personalized music suggestions
- **Trending**: Discover what's popular

### 👥 Social Features
- **Artist Announcements**: Artists can post news and updates
- **Community Posts**: Listeners can share their thoughts and music discoveries
- **Feed**: Personalized feed of posts from followed artists and users
- **Profiles**: User profiles with followers/following
- **Likes & Comments**: Engage with content
- **Follow System**: Follow artists and listeners

### 👤 User Management
- **Authentication**: Email/Password, Google, Apple Sign-In
- **User Roles**: Listener, Artist, Admin
- **Profiles**: Customizable user profiles with bios and images

## Tech Stack

- **Frontend**: React Native (Expo)
- **Navigation**: Expo Router with Bottom Tab Navigation
- **Backend**: Firebase (or Node.js/Express)
- **Database**: Firestore (or PostgreSQL)
- **Authentication**: Firebase Auth (or Auth0)
- **Storage**: Firebase Storage (or AWS S3)
- **State Management**: Context API + Zustand (for complex state)
- **Styling**: Muted palette with liquid-glass aesthetic

## Project Structure

```
motif-app/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx             # Home screen
│   │   ├── explore.tsx           # Discover screen
│   │   ├── library.tsx           # Library screen
│   │   ├── social.tsx            # Social feed
│   │   ├── profile.tsx           # User profile
│   │   └── _layout.tsx           # Tab navigation layout
│   └── _layout.tsx               # Root layout with providers
│
├── src/
│   ├── components/               # Reusable components
│   │   ├── UI/                   # Design system components
│   │   │   ├── Text.tsx          # Typography
│   │   │   ├── Card.tsx          # Card & Glass components
│   │   │   ├── Button.tsx        # Button component
│   │   │   └── index.ts          # Export all UI components
│   │   ├── MusicPlayer/          # Music player components
│   │   └── SocialFeed/           # Social feed components
│   │
│   ├── screens/                  # Screen implementations
│   │   ├── Music/                # Music-related screens
│   │   ├── Social/               # Social-related screens
│   │   ├── Profile/              # Profile screens
│   │   └── Auth/                 # Authentication screens
│   │
│   ├── context/                  # React Context providers
│   │   ├── AuthContext.tsx       # Authentication state
│   │   └── MusicPlayerContext.tsx # Music player state
│   │
│   ├── services/                 # Business logic & API calls
│   │   ├── api/                  # API client
│   │   ├── auth/                 # Authentication service
│   │   ├── music/                # Music service
│   │   └── social/               # Social service
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # All type definitions
│   │
│   ├── styles/                   # Global styles & theme
│   │   └── theme.ts              # Design tokens & theme
│   │
│   ├── utils/                    # Utility functions
│   ├── hooks/                    # Custom React hooks
│   └── context/
│
├── config/                       # Configuration files
│   └── firebase.ts               # Firebase setup
│
├── package.json                  # Dependencies
├── app.json                      # Expo configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode) or Android Studio for emulator

### Installation

```bash
# Navigate to the project
cd motif-app

# Install dependencies
npm install
# or
yarn install
```

### Configuration

1. **Firebase Setup**:
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Get your credentials
   - Create `.env` file in the root:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_API_BASE_URL=http://localhost:5000/api
   ```

### Running the App

```bash
# Start development server
npm start
# or for specific platform
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

Press:
- `i` for iOS
- `a` for Android
- `w` for Web
- `j` to open debugger

## Design System

### Color Palette
- **Primary**: Warm, muted neutrals (primary-50 to primary-900)
- **Accents**: Sage, Blush, Clay, Stone, Dust, Twilight, Bronze
- **Semantic**: Success (green), Warning (amber), Error (red), Info (blue)

### Components
- **Text**: Heading, Title, Subtitle, Body, Caption, Label
- **Cards**: GlassCard (with liquid-glass effect), Surface, Container
- **Buttons**: Primary, Secondary, Ghost variants with sizes

### Animations
- Fast: 200ms
- Normal: 300ms
- Slow: 500ms
- Slower: 800ms

## Development

### Creating New Screens

1. Add component in `src/screens/`
2. Add route in `app/(tabs)/_layout.tsx`
3. Create corresponding tab screen file

### Using Context Hooks

```tsx
import { useAuth } from '@/src/context/AuthContext';
import { useMusicPlayer } from '@/src/context/MusicPlayerContext';

const MyComponent = () => {
  const { user, signOut } = useAuth();
  const { playerState, play, pause } = useMusicPlayer();
  // Use auth and music player state
};
```

### Adding UI Components

```tsx
import { Heading, Button, GlassCard } from '@/src/components/UI';

const MyScreen = () => (
  <GlassCard>
    <Heading>My Content</Heading>
    <Button label="Click Me" onPress={() => {}} />
  </GlassCard>
);
```

## Next Steps

- [ ] Set up Firebase backend
- [ ] Implement authentication screens
- [ ] Build music player component
- [ ] Create music search functionality
- [ ] Build social feed
- [ ] Implement user profiles
- [ ] Add music playback service
- [ ] Create backend API
- [ ] Test on iOS and Android
- [ ] Deploy to App Store/Play Store

## Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=

# API
EXPO_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For questions or issues, please open an issue on the project repository.
