const http = require("http");
const fs = require("fs");
const initialPort = 3000;

function startServer(port) {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html", "utf-8");

    const url = req.url;
    let fileContent;


    if (url === "/" || url === "/index.html" || url === "/home" || url === "/accueil") {
      fileContent = fs.readFileSync("index.html", "utf-8");
      res.end(
        fileContent
          .replace("{{name}}", "John Doe")
          .replace("{{framework}}", "Node.js")
      );
      if (url === "/style.css") {
        const css = fs.readFileSync("style.css", "utf-8");
        res.setHeader("Content-Type", "text/css");
        res.end(css);
      }
    }
    else if (url === "/info.html") {
      const info = fs.readFileSync("info.html", "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.end(info);
    }
    else{
      fileContent = fs.readFileSync("not-found.html", "utf-8");
      res.end(fileContent);
    }

    const template = fileContent;
    res.end(template);
  });

  server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.log(`Port ${port} is busy, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error("Server error:", e);
    }
  });

  server.listen(port, () => {
    console.log(
      `Server is running on port ${port} you can access it at http://localhost:${port}`
    );
  });
}

startServer(initialPort);

// const http = require('http');
// http.createServer((req, res) => {
//   const url = req.url;
//   if (url ==='/home'){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>Page d\'accueil<h1>');
//     res.end();
//   } else if (url ==='/contact'){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>Contactez nous<h1>');
//     res.end();
//   } else {
//     res.writeHead(404, {'Content-Type': 'text/html'});
//     res.end();
//   }
// }).listen(3000);