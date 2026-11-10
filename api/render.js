// Renders every page of the site on the server so Google sees full HTML.
const engine = require("../public/app.js");
const crypto = require("crypto"), fs = require("fs"), path = require("path");
// A new version tag on every deploy, so browsers always load the latest app.js / styles.css
let VER = process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || "";
try { VER = VER || crypto.createHash("md5").update(fs.readFileSync(path.join(__dirname, "../public/app.js"))).digest("hex"); } catch (e) {}
VER = (VER || String(Date.now())).slice(0, 10);

const SB_URL = process.env.SUPABASE_URL || "https://xqwqkeyhaeinlixswcnn.supabase.co";
// Public (anon) key: safe to ship, the database security rules protect private data.
const SB_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxd3FrZXloYWVpbmxpeHN3Y25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4MTQ0NzksImV4cCI6MjEwOTM5MDQ3OX0.5EPWic4n9r4OC8ybu0DzyL3KU_hZ6k3ZglDu1gcvF6Q";
const VERIFY = process.env.GOOGLE_SITE_VERIFICATION || "";

async function getRows() {
  if (!SB_URL || !SB_KEY) return [];
  try {
    const r = await fetch(`${SB_URL}/rest/v1/docs?select=path,data&collection=in.(site,products,posts)`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    });
    if (!r.ok) return [];
    return await r.json();
  } catch (e) {
    return [];
  }
}
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const safeJson = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

module.exports = async (req, res) => {
  const u = new URL(req.url, "http://localhost");
  const path = (u.searchParams.get("p") || u.pathname || "/").replace(/\/+$/, "") || "/";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const proto = req.headers["x-forwarded-proto"] || "https";
  const origin = process.env.SITE_URL || `${proto}://${host}`;
  const rows = await getRows();

  if (path === "/sitemap.xml") {
    const urls = engine.urls(rows);
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "s-maxage=3600");
    return res.end(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((x) => `<url><loc>${origin}${x === "/" ? "" : x}</loc></url>`).join("\n")}\n</urlset>`);
  }
  if (path === "/robots.txt") {
    res.setHeader("Content-Type", "text/plain");
    return res.end(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /account\nDisallow: /cart\n\nSitemap: ${origin}/sitemap.xml\n`);
  }

  const query = Object.fromEntries(u.searchParams);
  const m = engine.meta(path, rows);
  const html = engine.renderRoute(path, rows, query);
  const ld = [engine.org(rows), engine.product(path, rows)].filter(Boolean);
  const canonical = origin + (path === "/" ? "" : path);

  const page = `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.description)}">
<link rel="canonical" href="${esc(canonical)}">
${m.noindex || !m.exists ? '<meta name="robots" content="noindex">' : ""}
${VERIFY ? `<meta name="google-site-verification" content="${esc(VERIFY)}">` : ""}
<meta property="og:type" content="website"><meta property="og:site_name" content="ORRA Industries">
<meta property="og:title" content="${esc(m.title)}"><meta property="og:description" content="${esc(m.description)}">
<meta property="og:url" content="${esc(canonical)}">${m.image ? `<meta property="og:image" content="${esc(m.image)}">` : ""}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,600;0,700;0,800;1,800;1,900&family=Barlow+Condensed:wght@500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/styles.css?v=${VER}">
${ld.map((x) => `<script type="application/ld+json">${safeJson(x)}</script>`).join("")}
<script defer src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js"></script>
<script defer src="/app.js?v=${VER}"></script>
</head><body>
<div id="app">${html}</div><div id="modal-root"></div>
<script>window.__BOOT__=${safeJson({ rows, url: SB_URL, key: SB_KEY })}</script>
</body></html>`;
  res.statusCode = m.exists ? 200 : 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
  res.end(page);
};
