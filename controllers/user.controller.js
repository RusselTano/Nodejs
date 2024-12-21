const User = require("../database/models/user.model");

exports.userNew = (req, res, next) => {
  res.render("signup");
}

exports.userCreate = async (req, res, next) => {
  res.end();
}