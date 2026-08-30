export default function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "POST required" });
  }

  const body = request.body || {};
  if (!body.imageDataUrl) {
    return response.status(400).json({ error: "imageDataUrl is required" });
  }

  return response.status(200).json({
    status: "preview-only",
    message: "Connect a trusted image-tracing provider here for production SVG conversion.",
    inputType: typeof body.imageDataUrl === "string" && body.imageDataUrl.startsWith("data:image/") ? "data-url" : "unknown"
  });
}
