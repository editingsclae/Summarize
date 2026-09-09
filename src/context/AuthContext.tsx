import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, logOut, testConnection } from '../services/firebase';

export interface LocalDevUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isGuest?: boolean;
}

export type AuthUser = User | LocalDevUser;

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signInAsGuest: (name?: string, email?: string) => void;
  signOut: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const LOCAL_USER_STORAGE_KEY = 'vidbrief_local_guest_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as LocalDevUser;
      }
    } catch {}
    return null;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Validate Firestore connection on boot
    testConnection();

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          try {
            localStorage.removeItem(LOCAL_USER_STORAGE_KEY);
          } catch {}
        } else {
          // Keep local guest user if one was previously selected
          try {
            const stored = localStorage.getItem(LOCAL_USER_STORAGE_KEY);
            if (stored) {
              setUser(JSON.parse(stored) as LocalDevUser);
              setLoading(false);
              return;
            }
          } catch {}
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Auth state change error:', error);
        setAuthError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      console.error('Sign in error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to sign in with Google';
      // User closed popup or cancelled
      if (!msg.includes('popup-closed-by-user')) {
        setAuthError(msg);
      }
    }
  };

  const handleSignInAsGuest = (name: string = 'Firas (Local Dev)', email: string = 'firas@localhost') => {
    const guestUser: LocalDevUser = {
      uid: 'guest_local_user',
      displayName: name,
      email: email,
      photoURL: '',
      isGuest: true,
    };
    try {
      localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(guestUser));
    } catch {}
    setUser(guestUser);
    setAuthError(null);
  };

  const handleSignOut = async () => {
    setAuthError(null);
    try {
      localStorage.removeItem(LOCAL_USER_STORAGE_KEY);
      setUser(null);
      await logOut();
    } catch (err: unknown) {
      console.error('Sign out error:', err);
      setAuthError(err instanceof Error ? err.message : 'Failed to sign out');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signInAsGuest: handleSignInAsGuest,
        signOut: handleSignOut,
        authError,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
