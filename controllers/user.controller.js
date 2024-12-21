const User = require("../database/models/user.model");

exports.userNew = (req, res, next) => {
  res.render("signup");
}

exports.userCreate = async (req, res, next) => {
  try{
    const body = req.body;
    const user = await User.createUser(body);
    res.redirect("/login");
    console.log(user);
  } catch (err) {
    next(err);
  }
}