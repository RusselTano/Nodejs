const express = require("express");
const router = express.Router();

const Student = require("../database/models/student.model");

router.get("/students", (req, res) => {  
  Student.find({})
    .exec()
    .then(students => {
      res.json(students);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour créer un nouvel étudiant avec des cours
router.post("/students", (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    courses: req.body.courses // Tableau de cours { name, description }
  });

  student.save()
    .then(savedStudent => {
      res.json(savedStudent);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;