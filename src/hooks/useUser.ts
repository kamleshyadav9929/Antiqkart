// src/hooks/useUser.ts

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

// Check if credentials are available at module level
const hasCredentials = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(supabaseUrl && supabaseAnonKey);
};

export const useUser = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let subscription: any = null;

    // If credentials are missing, immediately set loading to false
    if (!hasCredentials()) {
      if (isMounted) {
        setSession(null);
        setUser(null);
        setLoading(false);
      }
      return;
    }

    const initializeAuth = async () => {
      try {
        // Fetch the initial session state
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        if (isMounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          setLoading(false);
        }

        // Set up the real-time listener for auth state changes
        const authListener = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (isMounted) {
              setSession(session);
              setUser(session?.user ?? null);
            }
          }
        );
        subscription = authListener.data.subscription;
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (isMounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch (error) {
          console.error("Error unsubscribing from auth listener:", error);
        }
      }
    };
  }, []);

  return { session, user, loading };
};
