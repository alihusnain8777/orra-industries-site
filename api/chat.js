// AI assistant endpoint. Needs ANTHROPIC_API_KEY in Vercel environment variables.
// Without a key it answers {reply:""} and the website uses its built-in answers instead.
const engine = require("../public/app.js");
const SB_URL = process.env.SUPABASE_URL || "https://xqwqkeyhaeinlixswcnn.supabase.co";
const SB_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxd3FrZXloYWVpbmxpeHN3Y25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4MTQ0NzksImV4cCI6MjEwOTM5MDQ3OX0.5EPWic4n9r4OC8ybu0DzyL3KU_hZ6k3ZglDu1gcvF6Q";
const API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.AI_MODEL || "claude-haiku-5-5";

let cache = { t: 0, text: "" };
async function knowledge() {
  if (cache.text && Date.now() - cache.t < 5 * 60 * 1000) return cache.text;
  let rows = [];
  try {
    const r = await fetch(`${SB_URL}/rest/v1/docs?select=path,data&collection=in.(site,products,posts)`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } });
    if (r.ok) rows = await r.json();
  } catch (e) {}
  cache = { t: Date.now(), text: engine.knowledge(rows) };
  return cache.text;
}
function readBody(req) {
  return new Promise((res) => {
    if (req.body) return res(typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body);
    let d = ""; req.on("data", (c) => { d += c; if (d.length > 40000) req.destroy(); });
    req.on("end", () => { try { res(JSON.parse(d || "{}")); } catch (e) { res({}); } });
  });
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") { res.statusCode = 405; return res.end(JSON.stringify({ error: "POST only" })); }
  if (!API_KEY) return res.end(JSON.stringify({ reply: "" }));
  const body = await readBody(req);
  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12).map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return res.end(JSON.stringify({ reply: "" }));

  const kb = await knowledge();
  const system = `You are the website assistant for a clothing manufacturer. Answer buyer questions using ONLY the facts below. Be brief (2–5 sentences), friendly and professional. Reply in the customer's language (English, Urdu or Roman Urdu). Never invent prices, certifications, factory sizes or delivery promises beyond the facts. When a buyer is ready, guide them to the production brief at /rfq or WhatsApp. Link pages as markdown like [Production brief](/rfq). Do not discuss topics unrelated to the company.\n\nFACTS:\n${kb}`;
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system, messages }),
    });
    const d = await r.json();
    const reply = (d.content || []).filter((c) => c.type === "text").map((c) => c.text).join("\n").trim();
    res.end(JSON.stringify({ reply }));
  } catch (e) {
    res.end(JSON.stringify({ reply: "" }));
  }
};
