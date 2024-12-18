const mongoose = require("mongoose");
const schema = mongoose.Schema;

const studentSchema = new schema({
  name: String,
  age: Number,
  email: String
});

const Student = mongoose.model("student", studentSchema, "student");
module.exports = Student;

