const express = require("express");
const router = express.Router();
const Student = require("../database/models/student.model");

// Page d'accueil
router.get("/", (req, res) => {
  Student.find({})
    .exec()
    .then(students => {
      res.render("index", {
        name: "Dylane",
        authenticated: true,
        students: students,
        friends: ["Alice", "Bob", "Charlie"],
        friendsCount: 3,
        products: [
          { name: "Laptop", price: 1000 },
          { name: "Smartphone", price: 500 },
          { name: "Tablet", price: 300 },
        ],
      });
    })
    .catch(err => {
      res.status(500).render("error", { error: err.message });
    });
});

// Page À propos
router.get("/about", (req, res) => {
  res.render("about");
});

// Page Contact
router.get("/contact", (req, res) => {
  res.render("contact");
});

// Traitement du formulaire de contact
router.post("/contact", (req, res) => {
  console.log("req.body:", req.body);
  res.send("Merci pour votre message");
});

module.exports = router;