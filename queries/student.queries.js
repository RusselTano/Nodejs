const Student = require("../database/models/student.model");

exports.getStudents = () => {
  return Student.find();
};

exports.createStudent =  student => {
  const newStudent = new Student({...student});
  return newStudent.save();
};
