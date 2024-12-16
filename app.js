const http = require("http");
const fs = require("fs");
const port = 3100;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html", "utf-8");

  if (req.url === "/style.css") {
    const css = fs.readFileSync("style.css", "utf-8");
    res.setHeader("Content-Type", "text/css");
    res.end(css);
  }

  const fileContent = fs.readFileSync("index.html", "utf-8");
  const template = fileContent
    .replace("{{name}}", "John Doe")
    .replace("{{framework}}", "Node.js");
  res.end(template);
});

server.listen(port, () => {
  console.log(
    `Server is running on port ${port} you can access it at http://localhost:${port}`
  );
});
