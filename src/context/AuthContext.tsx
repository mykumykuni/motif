import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const AUTH_KEY = '@motif_user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  error: string | null;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple in-memory "database" of users (persisted to AsyncStorage)
const USERS_KEY = '@motif_users';

async function getUsers(): Promise<Record<string, { password: string; user: User }>> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function saveUsers(users: Record<string, { password: string; user: User }>) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(AUTH_KEY).then((raw) => {
      if (raw) setUser(JSON.parse(raw));
      setIsLoading(false);
    });
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setError(null);
      const users = await getUsers();
      if (users[email]) throw new Error('An account with this email already exists.');
      const newUser: User = {
        id: Date.now().toString(),
        email,
        username,
        displayName: username,
        role: 'listener',
        followers: 0,
        following: 0,
        isVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users[email] = { password, user: newUser };
      await saveUsers(users);
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
      setUser(newUser);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const users = await getUsers();
      const record = users[email];
      if (!record) throw new Error('No account found with this email.');
      if (record.password !== password) throw new Error('Incorrect password.');
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(record.user));
      setUser(record.user);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  const signInWithGoogle = async () => {
    setError('Google sign-in coming soon.');
  };

  const signInWithApple = async () => {
    setError('Apple sign-in coming soon.');
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isSignedIn: !!user,
      error,
      signUp,
      signIn,
      signOut,
      signInWithGoogle,
      signInWithApple,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
