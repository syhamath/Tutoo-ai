// src/utils/supabase/info.ts
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Force all server calls to go through Cloudflare Pages Functions when VITE_API_BASE="/api"
export const serverBase =
  (import.meta.env.VITE_API_BASE as string) ||
  `${supabaseUrl.replace(/\/$/, "")}/functions/v1`;
