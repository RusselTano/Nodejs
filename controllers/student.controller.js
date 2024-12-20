const { 
  getStudents, 
  createStudent, 
  searchStudents 
} = require("../queries/student.queries");

/**
 * Contrôleur pour lister tous les étudiants
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.listStudentsController = async (req, res) => {
  try {
    const students = await getStudents();
    res.render("index", { students });
  } catch (err) {
    console.error('Erreur lors de la récupération des étudiants:', err);
    res.status(500).render("error", { 
      error: "Impossible de récupérer la liste des étudiants" 
    });
  }
};

/**
 * Contrôleur pour créer un nouvel étudiant
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.createStudentController = async (req, res) => {
  try {
    await createStudent(req.body);
    res.redirect("/");
  } catch (err) {
    console.error('Erreur lors de la création d\'un étudiant:', err);
    if (err.code === 11000) {
      res.status(400).render("error", { 
        error: "Un étudiant avec cet email existe déjà" 
      });
    } else {
      res.status(500).render("error", { 
        error: "Impossible de créer l'étudiant" 
      });
    }
  }
};

/**
 * Contrôleur pour rechercher des étudiants
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.searchStudentsController = async (req, res, next) => {
  try {
    const students = await searchStudents(req.query.search);
    res.render('partials/student-list', { students });
  } catch (err) {
    console.error('Erreur lors de la recherche d\'étudiants:', err);
    next(err);
  }
};

