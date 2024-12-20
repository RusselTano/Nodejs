const router = require("express").Router();
const {
  listStudentsController,
  createStudentController,
  searchStudentsController
} = require("../controllers/student.controller");

/**
 * Routes pour la gestion des étudiants
 * @module routes/students
 */

/**
 * POST /api/students
 * Crée un nouvel étudiant
 */
router.post("/", createStudentController);

/**
 * GET /api/students
 * Récupère la liste des étudiants
 */
router.get("/", listStudentsController);

/**
 * GET /api/students/search
 * Recherche des étudiants par leur nom
 * @query {string} search - Terme de recherche
 */
router.get("/search", searchStudentsController);

module.exports = router;
