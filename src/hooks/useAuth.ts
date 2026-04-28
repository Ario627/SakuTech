"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type AuthState = {
  user: User | null;
  isLoading: boolean;
};

export function useSupabaseAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  const supabase = createClient();

  useEffect(() => {
    if (!supabase) {
      setState({ user: null, isLoading: false });
      return;
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      setState({ user, isLoading: false });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, isLoading: false });
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }, [supabase]);

  const signInWithGitHub = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({ provider: "github" });
  }, [supabase]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setState({ user: null, isLoading: false });
  }, [supabase]);

  return {
    user: state.user,
    isLoading: state.isLoading,
    isLoggedIn: state.user !== null,
    signInWithGoogle,
    signInWithGitHub,
    signOut,
  };
}
