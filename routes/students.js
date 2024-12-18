const router = require("express").Router();

router.post("/", (req, res) => {
  res.end("ok");
});

module.exports = router;
// const Student = require("../database/models/student.model");
