import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
  role: 'admin';
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'ef_admin_session';
const REGISTERED_USERS_KEY = 'ef_registered_users';

// Master Administrator Credentials
const MASTER_ADMIN_EMAIL = 'emanfatima9300@gmail.com';
const MASTER_ADMIN_PASS = 'eman9300';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured() && supabase) {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            setUser({
              id: data.session.user.id,
              name: data.session.user.user_metadata?.full_name || 'Eman Fatima',
              email: data.session.user.email || MASTER_ADMIN_EMAIL,
              role: 'admin',
            });
            setIsLoading(false);
            return;
          }
        }

        // Check local admin session
        const localSession = localStorage.getItem(LOCAL_ADMIN_KEY);
        if (localSession) {
          const parsed = JSON.parse(localSession);
          setUser(parsed);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    if (isSupabaseConfigured() && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || 'Eman Fatima',
            email: session.user.email || MASTER_ADMIN_EMAIL,
            role: 'admin',
          });
        } else {
          setUser(null);
        }
      });
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const signIn = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. Direct check for Master Admin Credentials
      if (cleanEmail === MASTER_ADMIN_EMAIL.toLowerCase() && pass === MASTER_ADMIN_PASS) {
        const masterAdminUser: AuthUser = {
          id: 'admin-master-eman',
          name: 'Eman Fatima',
          email: MASTER_ADMIN_EMAIL,
          role: 'admin',
        };
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(masterAdminUser));
        setUser(masterAdminUser);
        return { success: true };
      }

      // 2. Check registered users store
      const storedUsers = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
      const matched = storedUsers.find(
        (u: { email: string; pass: string }) => u.email.toLowerCase() === cleanEmail && u.pass === pass
      );

      if (matched) {
        const adminUser: AuthUser = {
          id: matched.id || `user-${Date.now()}`,
          name: matched.name || 'Admin User',
          email: matched.email,
          role: 'admin',
        };
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
        setUser(adminUser);
        return { success: true };
      }

      // 3. Fallback check for Supabase Auth if configured
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: pass,
        });
        if (!error && data.user) {
          const authUser: AuthUser = {
            id: data.user.id,
            name: data.user.user_metadata?.full_name || 'Eman Fatima',
            email: data.user.email || cleanEmail,
            role: 'admin',
          };
          localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(authUser));
          setUser(authUser);
          return { success: true };
        }
      }

      return {
        success: false,
        error: 'Invalid email or password. Please verify your credentials and try again.',
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    try {
      if (!cleanName) {
        return { success: false, error: 'Full Name is required.' };
      }
      if (!cleanEmail) {
        return { success: false, error: 'Email address is required.' };
      }
      if (!pass || pass.length < 4) {
        return { success: false, error: 'Password is required and must be at least 4 characters.' };
      }

      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '[]');
      if (
        cleanEmail === MASTER_ADMIN_EMAIL.toLowerCase() ||
        storedUsers.some((u: { email: string }) => u.email.toLowerCase() === cleanEmail)
      ) {
        return { success: false, error: 'An account with this email address already exists. Please log in.' };
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        pass,
        role: 'admin' as const,
      };

      storedUsers.push(newUser);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(storedUsers));

      // Attempt Supabase signup if configured
      if (isSupabaseConfigured() && supabase) {
        try {
          await supabase.auth.signUp({
            email: cleanEmail,
            password: pass,
            options: {
              data: {
                full_name: cleanName,
              },
            },
          });
        } catch (supaErr) {
          console.warn('Supabase signup fallback notice:', supaErr);
        }
      }

      // Auto login user upon creation
      const loggedInUser: AuthUser = {
        id: newUser.id,
        name: cleanName,
        email: cleanEmail,
        role: 'admin',
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signout notice:', err);
      }
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: Boolean(user && user.role === 'admin'),
        isLoading,
        signIn,
        signUp,
        signOut,
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
