const router = require("express").Router();
const students = require("./api.students");

router.use("/students", students);


module.exports = router;