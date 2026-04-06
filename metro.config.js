const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure Metro resolves the React Native build of Firebase (not the browser build).
// Without this, firebase/auth loads the browser bundle which uses localStorage
// and crashes on Android/iOS with "Component auth has not been registered yet".
config.resolver.unstable_conditionNames = [
  'require',
  'default',
  'react-native',
];

module.exports = config;
