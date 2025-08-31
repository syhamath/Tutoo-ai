// Cloudflare Pages Function: generic proxy with CORS to Supabase Edge Functions
// Map /api/* -> https://<project>.supabase.co/functions/v1/*

const ALLOWED_ORIGINS = [
  "https://tutoo-ai.pages.dev",
  "https://d739daa4.tutoo-ai.pages.dev", // preview
  // add your custom domain here later, e.g. "https://app.tutoo.ai"
];

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : "*";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
      "authorization,content-type,x-client-info,x-supabase-api,accept",
    "Access-Control-Allow-Credentials": "true",
  };
}

export const onRequest: PagesFunction<{
  UPSTREAM_BASE: string; // e.g. https://pdzephiufkfjuybcniqv.supabase.co/functions/v1
}> = async ({ request, env }) => {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");

  // Handle preflight first
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(origin) });
  }

  // Strip leading /api from the path when forwarding
  const upstreamUrl = new URL(env.UPSTREAM_BASE);
  const forwardPath = url.pathname.replace(/^\/api/, "");
  upstreamUrl.pathname = `${upstreamUrl.pathname.replace(/\/$/, "")}${forwardPath}`;
  upstreamUrl.search = url.search;

  // Clone headers but drop the browser's Origin when proxying
  const headers = new Headers(request.headers);
  headers.delete("origin");

  const init: RequestInit = {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.blob(),
  };

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstreamUrl.toString(), init);
  } catch (err) {
    return new Response("Upstream fetch failed", {
      status: 502,
      headers: corsHeaders(origin),
    });
  }

  // Return upstream body + status with CORS headers merged
  const respHeaders = new Headers(upstreamRes.headers);
  const cors = corsHeaders(origin);
  Object.entries(cors).forEach(([k, v]) => respHeaders.set(k, v));

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    headers: respHeaders,
  });
};
