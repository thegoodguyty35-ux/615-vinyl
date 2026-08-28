export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST required" }), { status: 405, headers: { "content-type": "application/json" } });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.imageDataUrl) {
    return new Response(JSON.stringify({ error: "imageDataUrl is required" }), { status: 400, headers: { "content-type": "application/json" } });
  }

  return new Response(JSON.stringify({
    status: "preview-only",
    message: "Connect a trusted image-tracing provider here for production SVG conversion.",
    inputType: body.imageDataUrl.startsWith("data:image/") ? "data-url" : "unknown"
  }), { status: 200, headers: { "content-type": "application/json" } });
}
