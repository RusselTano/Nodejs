const path = require("path");
const fs = require("fs");
const express = require("express");
const { error } = require("console");
const app = express();
const initialPort = 3500;

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'toto');
app.engine("toto", (filePath, options, callback) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      callback(error);
    }
    const template = data.toString().replace("%NodeJS", options.name);
    callback(null, template);
  });
});
app.get("/", (req, res) => {
  res.render("index", {
    name: "Tano",
  });
});
function startServer(port) {
  // app.get('/', (req, res) => {
  //   res.render('index.toto', {
  //     name: 'NodeJS',
  //   });
  //   // res.status(200);
  //   // res.set({
  //   //   'Content-Type': 'text/html',
  //   //   'x-my-header': '123',
  //   //   'x-header-2': '1234',
  //   // });
  //   // res.send(
  //   //   `<!DOCTYPE html>
  //   //   <html lang="en">
  //   //     <head>
  //   //       <meta charset="UTF-8">
  //   //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   //       <title>NodeJS</title>
  //   //     </head>
  //   //     <body>
  //   //       <h1>NodeJS</h1>
  //   //     </body>
  //   //   </html>`
  //   // );
  // });

  const server = app
    .listen(port)
    .on("error", (e) => {
      if (e.code === "EADDRINUSE") {
        console.log(`Port ${port} is busy, trying port ${port + 1}`);
        server.close();
        startServer(port + 1);
      } else {
        console.error("Server error:", e);
      }
    })
    .on("listening", () => {
      console.log(`Server listening on port ${port} http://localhost:${port}`);
    });
}

startServer(initialPort);
