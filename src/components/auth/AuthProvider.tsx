"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthUser = {
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
};

type AuthContextType = {
  user: AuthUser;
  isLoggedIn: boolean;
  login: () => void;
  loginWithEmail: (email: string, password: string, isSignUp?: boolean) => Promise<void>; // Login manual
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
const EMPTY_USER: AuthUser = { name: null, email: null, avatarUrl: null };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(EMPTY_USER);
  const isLoggedIn = user.name !== null;
  
  const supabase = createClient(); 

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata.full_name || session.user.user_metadata.user_name || session.user.email,
          email: session.user.email!,
          avatarUrl: session.user.user_metadata.avatar_url || null,
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          name: session.user.user_metadata.full_name || session.user.user_metadata.user_name || session.user.email,
          email: session.user.email!,
          avatarUrl: session.user.user_metadata.avatar_url || null,
        });
      } else {
        setUser(EMPTY_USER);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const login = useCallback(async () => {
    if (!supabase) {
      alert("Supabase belum dikonfigurasi. Cek file .env.local lu!");
      return;
    }
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
    
    if (error) {
      console.error("Gagal login Github:", error.message);
      alert("Gagal konek ke Github!");
    }
  }, [supabase]);

  const loginWithEmail = useCallback(async (email: string, password: string, isSignUp = false) => {
    if (!supabase) return;

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert("Gagal daftar: " + error.message);
      } else {
        alert("Pendaftaran berhasil! Silakan cek email untuk verifikasi (jika diaktifkan di Supabase).");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Gagal login: " + error.message);
      }
    }
  }, [supabase]);

  const logout = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(EMPTY_USER);
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}