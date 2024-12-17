const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port).on("listening", () => {
  console.log(`Server listening on port ${port} http://localhost:${port}`);
});
