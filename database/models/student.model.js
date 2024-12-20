const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {Object} Course
 * @property {string} name - Nom du cours
 * @property {string} description - Description du cours
 */

/**
 * Schéma pour les cours suivis par les étudiants
 * @type {mongoose.Schema}
 */
const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

/**
 * @typedef {Object} Student
 * @property {string} name - Nom de l'étudiant
 * @property {string} email - Email de l'étudiant
 * @property {string} password - Mot de passe de l'étudiant
 * @property {Course[]} courses - Liste des cours suivis
 * @property {Date} createdAt - Date de création
 * @property {Date} updatedAt - Date de dernière modification
 */

/**
 * Schéma principal pour les étudiants
 * @type {mongoose.Schema}
 */
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  courses: {
    type: [CourseSchema],
    default: [{ name: "JavaScript", description: "Cours de JavaScript" }]
  }
}, {
  timestamps: true
});

/**
 * Modèle Mongoose pour les étudiants
 * @type {mongoose.Model}
 */
module.exports = mongoose.model("student", StudentSchema);
