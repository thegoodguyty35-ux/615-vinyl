export default function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "POST required" });
  }

  const body = request.body || {};
  const { name, email, cart, total } = body;

  if (!name || !email) {
    return response.status(400).json({ error: "name and email are required" });
  }

  return response.status(200).json({
    status: "queued",
    recipient: email,
    message: "Order notice prepared for a free-tier email relay or mailto fallback.",
    cartCount: Array.isArray(cart) ? cart.length : 0,
    total: total || 0
  });
}
