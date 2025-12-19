<<<<<<< HEAD
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
=======
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
>>>>>>> upstream/main

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailConfirmed: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ needsConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithMetaMask: () => Promise<void>;
  signInWithOAuth: (provider: 'google' | 'github' | 'discord') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  confirmPassword: (token: string) => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
  getErrorMessage: (error: AuthError | Error | string) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

<<<<<<< HEAD
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Computed auth state
  const isAuthenticated = !!(session && user && user.email_confirmed_at);
  const isEmailConfirmed = !!(user && user.email_confirmed_at);
=======
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
>>>>>>> upstream/main

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
<<<<<<< HEAD
      setLoading(false);
=======
>>>>>>> upstream/main
    });

    return () => subscription.unsubscribe();
  }, []);

<<<<<<< HEAD
  const getErrorMessage = (error: AuthError | Error | string): string => {
    if (typeof error === 'string') return error;
    
    const message = error.message?.toLowerCase() || '';
    
    // Handle OAuth specific errors
    if (message.includes('popup closed') || message.includes('user closed popup')) {
      return 'Authentication was cancelled. Please try again.';
    }
    
    if (message.includes('access denied') || message.includes('permission denied')) {
      return 'You denied access to your account. Please try again and allow the required permissions.';
    }
    
    if (message.includes('invalid oauth state')) {
      return 'Authentication state is invalid. Please try again.';
    }
    
    if (message.includes('provider not supported')) {
      return 'This sign-in method is not available. Please try another option.';
    }
    
    // Handle specific Supabase errors with user-friendly messages
    if (message.includes('email not confirmed')) {
      return 'Please confirm your email address before signing in. Check your inbox for the confirmation link.';
    }
    
    if (message.includes('invalid login credentials') || message.includes('invalid credentials')) {
      return 'Invalid email or password. Please check your credentials and try again.';
    }
    
    if (message.includes('user already registered')) {
      return 'An account with this email already exists. Please sign in instead.';
    }
    
    if (message.includes('password should be at least')) {
      return 'Password must be at least 6 characters long.';
    }
    
    if (message.includes('signup is disabled')) {
      return 'Account registration is currently disabled. Please contact support.';
    }
    
    if (message.includes('email rate limit exceeded')) {
      return 'Too many requests. Please wait a moment before trying again.';
    }
    
    if (message.includes('invalid email')) {
      return 'Please enter a valid email address.';
    }
    
    if (message.includes('weak password')) {
      return 'Password is too weak. Please choose a stronger password.';
    }
    
    if (message.includes('token expired')) {
      return 'This confirmation link has expired. Please request a new one.';
    }
    
    if (message.includes('invalid token')) {
      return 'This confirmation link is invalid. Please check your email for the correct link.';
    }
    
    if (message.includes('email address not authorized')) {
      return 'This email address is not authorized to create an account.';
    }
    
    // Default fallback
    return error.message || 'An unexpected error occurred. Please try again.';
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`
        },
      });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      
      // Success - user needs to confirm email
      // Don't set loading to false here - let the user navigate away
      return { needsConfirmation: true };
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error as AuthError));
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      
      // Success - user will be automatically signed in
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error as AuthError));
    }
  };

  const signInWithMetaMask = async () => {
    try {
      setLoading(true);
      
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please connect your MetaMask wallet.');
      }
      
      const walletAddress = accounts[0];
      
      if (!walletAddress) {
        throw new Error('No wallet address found.');
      }

      // Sign a message to prove ownership
      const timestamp = Date.now();
      const message = `Sign this message to authenticate with Truce Wallet: ${timestamp}`;
      
      let signature: string;
      try {
        signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, walletAddress],
        }) as string;
      } catch (signError: unknown) {
        if (signError && typeof signError === 'object' && 'code' in signError && signError.code === 4001) {
          throw new Error('Please sign the message in MetaMask to continue.');
        }
        throw new Error('Failed to sign message. Please try again.');
      }
      
      if (!signature) {
        throw new Error('No signature received from MetaMask.');
      }

      // Use the signature as password and wallet address as pseudo-email
      const pseudoEmail = `${walletAddress}@metamask.temp`;
      const pseudoPassword = signature;

      // First, try to sign in with existing account
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: pseudoEmail,
        password: pseudoPassword,
=======
  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    navigate('/dashboard');
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    navigate('/dashboard');
  };

  const signInWithMetaMask = async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      const walletAddress = accounts[0];

      // Sign a message to prove ownership
      const message = `Sign this message to authenticate with Truce Wallet: ${Date.now()}`;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress],
      });

      // Try to sign in with the wallet address
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: `${walletAddress}@metamask.temp`,
        password: signature,
>>>>>>> upstream/main
      });

      if (signInError) {
        // If sign in fails, create a new account
        const { error: signUpError } = await supabase.auth.signUp({
<<<<<<< HEAD
          email: pseudoEmail,
          password: pseudoPassword,
=======
          email: `${walletAddress}@metamask.temp`,
          password: signature,
>>>>>>> upstream/main
          options: {
            data: {
              wallet_address: walletAddress,
              full_name: `User ${walletAddress.slice(0, 6)}`,
<<<<<<< HEAD
              login_method: 'metamask',
            },
          },
        });
        
        if (signUpError) {
          throw new Error(getErrorMessage(signUpError));
        }
      }

      // Success - user will be automatically signed in
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error as AuthError));
    }
  };

  const signInWithOAuth = async (provider: 'google' | 'github' | 'discord') => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as 'google' | 'github' | 'discord',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      
      // Success - user will be automatically redirected and signed in
      // The auth state change will be handled by the onAuthStateChange listener
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error as AuthError));
=======
            },
          },
        });
        if (signUpError) throw signUpError;
      }

      navigate('/dashboard');
    } catch (error) {
      throw error;
>>>>>>> upstream/main
    }
  };

  const signOut = async () => {
<<<<<<< HEAD
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      
      // Clear local state immediately
      setUser(null);
      setSession(null);
    } catch (error) {
      // Even if there's an error, we should still clear local state
      setUser(null);
      setSession(null);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error as AuthError));
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      );
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
      
      // Success - email sent, don't set loading to false
      // User will navigate away
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error as AuthError));
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error as AuthError));
    }
  };

  const confirmPassword = async (token: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'signup'
      });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error as AuthError));
    }
  };

  const resendConfirmation = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`
        }
      });
      
      if (error) {
        throw new Error(getErrorMessage(error));
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(getErrorMessage(error as AuthError));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isAuthenticated,
      isEmailConfirmed,
      signUp,
      signIn,
      signInWithMetaMask,
      signInWithOAuth,
      signOut,
      resetPassword,
      updatePassword,
      confirmPassword,
      resendConfirmation,
      getErrorMessage
    }}>
=======
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithMetaMask, signOut }}>
>>>>>>> upstream/main
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

declare global {
  interface Window {
<<<<<<< HEAD
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      isMetaMask?: boolean;
    };
  }
}

=======
    ethereum?: any;
  }
}
>>>>>>> upstream/main
