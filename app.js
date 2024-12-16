const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  // res.write("Hello World");
  res.end(`
      <!DOCTYPE html>
      <html>

        <head>
          <title>My First Node Server</title>
        </head>

        <body>
          <h1>Hello World</h1>
          <p>This is a Node.js server</p>
        </body>

      </html>
    `);
});
server.listen(3000);
