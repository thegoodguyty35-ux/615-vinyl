export default function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "POST required" });
  }

  const body = request.body;
  const phrase = typeof body?.phrase === "string" ? body.phrase.trim() : "";
  if (!phrase) {
    return response.status(400).json({ error: "phrase is required" });
  }

  return response.status(200).json({
    status: "review-needed",
    phrase,
    message: "This is not a legal clearance. Connect a trademark and copyright search provider before production use."
  });
}
