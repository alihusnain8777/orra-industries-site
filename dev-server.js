// Local preview: node dev-server.js  ->  http://localhost:3000
const http = require("http"), fs = require("fs"), path = require("path");
const render = require("./api/render.js");
http.createServer((req, res) => {
  const f = path.join(__dirname, "public", decodeURIComponent(req.url.split("?")[0]));
  if (req.url !== "/" && fs.existsSync(f) && fs.statSync(f).isFile()) {
    const t = { ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" }[path.extname(f)] || "application/octet-stream";
    res.setHeader("Content-Type", t); return fs.createReadStream(f).pipe(res);
  }
  res.status = (c) => { res.statusCode = c; return res; };
  render(req, res);
}).listen(process.env.PORT || 3000, () => console.log("http://localhost:" + (process.env.PORT || 3000)));
