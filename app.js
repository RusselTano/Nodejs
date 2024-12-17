const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3300;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

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

app.get("/contact", (req, res) => {
  res.render("contact");
});

// app.use(express.urlencoded({ extended: false }));
app.post("/contact", (req, res) => {
  console.log("req.body:", req.body);
  res.send("Merci pour votre message");
});

app.listen(port).on("listening", () => {
  console.log(`Server listening on port ${port} http://localhost:${port}`);
});

// 
// Chapitre 9 : Le routing sur Express