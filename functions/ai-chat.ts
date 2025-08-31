export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const { query, context, language } = await request.json();
    const data = {
      response: `(${language}) Tutoo AI stub — you asked: "${query}"`,
      suggestions: ["Voir un exemple ?", "Autre question ?", "Leçon liée ?"],
    };
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e?.message || "Server error" }), { status: 500 });
  }
};
