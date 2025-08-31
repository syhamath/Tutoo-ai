export const onRequest: PagesFunction = async (ctx) => {
  if (ctx.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "https://tutoo-ai.pages.dev",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const res = await ctx.next();
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", "https://tutoo-ai.pages.dev");
  headers.set("Vary", "Origin");
  return new Response(res.body, { status: res.status, headers });
};
