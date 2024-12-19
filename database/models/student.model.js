const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Définition du sous-schéma pour les cours
const courseSchema = new schema({
  name: String,
  description: String
});

const studentSchema = new schema({
  name: String,
  email: String,
  password: String,
  courses: {
    type: [courseSchema],
    default: [{ name: "JavaScript", description: "Cours de JavaScript" }]
  }
},{
  timestamps: true
});

module.exports = mongoose.model("student", studentSchema);
