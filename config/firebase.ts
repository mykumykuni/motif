/**
 * Firebase Configuration
 * Add your Firebase credentials from Firebase Console
 */

export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

// Backend API configuration
export const apiConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 30000,
};

// App configuration
export const appConfig = {
  appName: 'Motif',
  appVersion: '1.0.0',
  buildNumber: 1,
};
