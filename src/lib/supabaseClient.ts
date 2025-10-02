// src/lib/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// The check for missing keys helps log the 400/ERR_CERT error source
if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    "FATAL ERROR: Supabase credentials not loaded. Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY"
  );
  // eslint-disable-next-line no-console
  console.error("Example .env file:");
  // eslint-disable-next-line no-console
  console.error("VITE_SUPABASE_URL=https://your-project-ref.supabase.co");
  // eslint-disable-next-line no-console
  console.error("VITE_SUPABASE_ANON_KEY=your_anon_key_here");
}

// Create a dummy client if credentials are missing to prevent crashes
const dummyUrl = supabaseUrl || "https://placeholder.supabase.co";
const dummyKey = supabaseAnonKey || "placeholder-key";

export const supabase = createClient(dummyUrl, dummyKey);
