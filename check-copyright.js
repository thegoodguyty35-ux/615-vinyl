export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST required" }), { status: 405, headers: { "content-type": "application/json" } });
  }

  const body = await request.json().catch(() => null);
  const phrase = typeof body?.phrase === "string" ? body.phrase.trim() : "";
  if (!phrase) {
    return new Response(JSON.stringify({ error: "phrase is required" }), { status: 400, headers: { "content-type": "application/json" } });
  }

  return new Response(JSON.stringify({
    status: "review-needed",
    phrase,
    message: "This is not a legal clearance. Connect a trademark and copyright search provider before production use."
  }), { status: 200, headers: { "content-type": "application/json" } });
}
