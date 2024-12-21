const router = require("express").Router();
const api = require("./api");
const Student = require("../database/models/student.model");

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);


router.use("/api", api);

// Page d'accueil
router.get("/", (req, res) => {
  Student.find()
    .then(students => {
      res.cookie("name", "John");
      res.render("index", { students });
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

// register page
router.get("/register", (req, res) => {
  res.render("register");
});

// router.post("/register", (req, res) => {
//   const body = req.body;
//   const student = new Student({
//     name: body.name,
//     email: body.email,
//     password: body.password
//   });
//   student.save()
//     .then(() => {
//       res.redirect("/login");
//     })
//     .catch(err => {
//       res.status(500).render("error", { error: err.message });
//     });
// });

// login page
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Student.findOne({ email: email })
    .then(student => {
      if (!student || student.password !== password) {
        return res.status(400).render("login", {
          error: "Email ou mot de passe incorrect"
        });
      }
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).render("login", {
        error: "Une erreur est survenue"
      });
    });
});

module.exports = router;

// Le module Util de Node.js est un ensemble d'utilitaires utiles pour le développement.
// console.log(util.inspect(errors, { compact: true, depth: 5, breakLength: 80, colors: true }));