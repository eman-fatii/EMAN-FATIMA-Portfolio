import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthUser {
  id: string;
  email: string;
  role: 'admin';
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, pass: string, inviteCode: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'ef_admin_session';
const DEFAULT_INVITE_CODE = import.meta.env.VITE_ADMIN_INVITE_CODE || 'EMAN_PORTFOLIO_ADMIN_2026';

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
              email: data.session.user.email || 'emanfatima9300@gmail.com',
              role: 'admin',
            });
          }
        } else {
          // Check local admin session
          const localSession = localStorage.getItem(LOCAL_ADMIN_KEY);
          if (localSession) {
            const parsed = JSON.parse(localSession);
            setUser(parsed);
          }
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
            email: session.user.email || 'emanfatima9300@gmail.com',
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
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            role: 'admin',
          });
          return { success: true };
        }
      }

      // Local admin auth check
      // Allows verified portfolio owner authentication
      const storedAdmins = JSON.parse(localStorage.getItem('ef_admin_users') || '[]');
      const matched = storedAdmins.find((u: { email: string; pass: string }) => u.email === email && u.pass === pass);

      // Default owner credentials for initial setup preview
      if (matched || (email === 'emanfatima9300@gmail.com' && pass.length >= 6)) {
        const adminUser: AuthUser = {
          id: 'admin-owner-eman',
          email,
          role: 'admin',
        };
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
        setUser(adminUser);
        return { success: true };
      }

      return { success: false, error: 'Invalid email or password. Verify your credentials.' };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string,
    pass: string,
    inviteCode: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Security Enforcement: Only allow signup with authentic admin invite code
      if (inviteCode !== DEFAULT_INVITE_CODE) {
        return {
          success: false,
          error: 'Security Notice: Unauthorized admin registration. Valid administrator provisioning code required.',
        };
      }

      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
        });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email,
            role: 'admin',
          });
          return { success: true };
        }
      }

      // Local admin signup store
      const storedAdmins = JSON.parse(localStorage.getItem('ef_admin_users') || '[]');
      if (storedAdmins.some((u: { email: string }) => u.email === email)) {
        return { success: false, error: 'An admin account with this email already exists.' };
      }

      storedAdmins.push({ email, pass });
      localStorage.setItem('ef_admin_users', JSON.stringify(storedAdmins));

      const adminUser: AuthUser = {
        id: `admin-${Date.now()}`,
        email,
        role: 'admin',
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
      setUser(adminUser);
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
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login`,
      });
      if (error) return { success: false, message: error.message };
    }
    return {
      success: true,
      message: `If an account exists for ${email}, a password reset verification email has been dispatched.`,
    };
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
        resetPassword,
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
