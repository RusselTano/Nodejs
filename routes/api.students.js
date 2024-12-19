const router = require("express").Router();
const {studentList, studentcreate} = require("../controllers/student.controller");

// Route pour créer un nouvel étudiant avec des cours
router.post("/", studentcreate);

// Route pour obtenir la liste des étudiants
router.get("/", studentList);


module.exports = router;

