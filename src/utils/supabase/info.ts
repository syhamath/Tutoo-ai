// src/utils/supabase/info.ts
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// If VITE_API_BASE is set to "/api", we’ll hit Cloudflare Functions.
// Fallback keeps Supabase edge path for local/dev if needed.
export const serverBase =
  (import.meta.env.VITE_API_BASE as string) ||
  `${supabaseUrl.replace(/\/$/, "")}/functions/v1`;
