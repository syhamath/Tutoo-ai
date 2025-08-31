// src/utils/supabase/info.ts

// 1) Your Supabase project values injected at build time
export const supabaseUrl   = import.meta.env.VITE_SUPABASE_URL as string;
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// 2) Handy derived project id (e.g. https://abcd1234.supabase.co -> "abcd1234")
export const projectId = supabaseUrl
  ? new URL(supabaseUrl).hostname.split(".")[0]
  : "";

// 3) Single, canonical server base for your app’s API calls
//    - If VITE_API_BASE is set (e.g. "/api"), we call Cloudflare Pages Functions.
//    - Otherwise we fall back to Supabase Edge Functions.
export const serverBase: string =
  (import.meta.env.VITE_API_BASE as string) ||
  `https://${projectId}.supabase.co/functions/v1`;

// 4) Optional helpers you can use elsewhere
export const endpoints = {
  health:  `${serverBase}/health`,
  aiChat:  `${serverBase}/ai-chat`,
};

export const api = (path = "") =>
  `${serverBase}${path.startsWith("/") ? "" : "/"}${path}`;
