const express = require("express");
const router = express.Router();

const Students = require("../database/models/student.model");

router.get("/api/students", async (req, res) => {
  const students = await Students.find();
  res.json(students);
});

module.exports = router;