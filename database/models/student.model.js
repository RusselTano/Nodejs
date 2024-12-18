const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Définition du sous-schéma pour les cours
const courseSchema = new schema({
  name: String,
  description: String
});

const studentSchema = new schema({
  name: String,
  age: Number,
  email: String,
  courses: [courseSchema]  // Embarquer directement le schéma des cours
},{
  timestamps: true
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;

