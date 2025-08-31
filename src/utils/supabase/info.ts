// src/utils/supabase/info.ts

// Read from Vite env (set these in Cloudflare Pages → Settings → Environment variables)
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Derive project id from URL (e.g., https://abcd1234.supabase.co -> "abcd1234")
export const projectId = supabaseUrl
  ? new URL(supabaseUrl).hostname.split(".")[0]
  : "";

// Base for your API server:
// - If you set VITE_API_BASE=/api, you can use Cloudflare Pages Functions at /api/*
// - Otherwise it falls back to Supabase Edge Functions
export const serverBase =
  (import.meta.env.VITE_API_BASE as string) ||
  `https://${projectId}.supabase.co/functions/v1`;
