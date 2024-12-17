const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    name: "Dylane",
    authenticated: true,
    friends: ["Alice", "Bob", "Charlie"],
    friendsCount: 3,
    products: [
      { name: "Laptop", price: 1000 },
      { name: "Smartphone", price: 500 },
      { name: "Tablet", price: 300 },
    ],
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port).on("listening", () => {
  console.log(`Server listening on port ${port} http://localhost:${port}`);
});
