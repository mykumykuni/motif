import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement Firebase authentication check
      // const currentUser = await auth.currentUser;
      // if (currentUser) {
      //   setUser(await fetchUserData(currentUser.id));
      // }
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setError(null);
      // TODO: Implement Firebase signUp
      // const result = await auth.createUserWithEmailAndPassword(email, password);
      // await createUserProfile(result.user.uid, { email, username });
      console.log('Sign up:', { email, username });
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      // TODO: Implement Firebase signIn
      // const result = await auth.signInWithEmailAndPassword(email, password);
      // const userData = await fetchUserData(result.user.uid);
      // setUser(userData);
      console.log('Sign in:', { email });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      // TODO: Implement Firebase signOut
      // await auth.signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      // TODO: Implement Google Sign-In
      console.log('Google sign in initiated');
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
      throw err;
    }
  };

  const signInWithApple = async () => {
    try {
      setError(null);
      // TODO: Implement Apple Sign-In
      console.log('Apple sign in initiated');
    } catch (err: any) {
      setError(err.message || 'Apple sign in failed');
      throw err;
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
