const { getStudents, createStudent } = require("../queries/student.queries");

exports.studentList = async (req, res) => {
  try {
    const students = await getStudents();
    res.render("index", { students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.studentcreate = async (req, res) => {
  try {
    await createStudent(req.body);
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    courses: req.body.courses // Tableau de cours { name, description }
  });

  student.save()
    .then(savedStudent => {
      res.json(savedStudent);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
} */
