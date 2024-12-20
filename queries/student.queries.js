const Student = require("../database/models/student.model");

/**
 * Récupère tous les étudiants de la base de données
 * @returns {Promise<Array<Student>>} Liste des étudiants
 */
exports.getStudents = () => {
  return Student.find({}).select('-password');
};

/**
 * Crée un nouvel étudiant
 * @param {Object} studentData - Données de l'étudiant
 * @param {string} studentData.name - Nom de l'étudiant
 * @param {string} studentData.email - Email de l'étudiant
 * @param {string} studentData.password - Mot de passe de l'étudiant
 * @returns {Promise<Student>} Étudiant créé
 */
exports.createStudent = studentData => {
  const newStudent = new Student(studentData);
  return newStudent.save();
};

/**
 * Recherche des étudiants par leur nom
 * @param {string} search - Terme de recherche
 * @returns {Promise<Array<Student>>} Liste des étudiants correspondants
 */
exports.searchStudents = search => {
  return Student
    .find({ name: new RegExp(search, "i") })
    .select('-password')
    .exec();
};