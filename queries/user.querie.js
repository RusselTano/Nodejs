const User = require("../database/models/user.model");

exports.createUser = async body => {
  try{  
    const hashedPassword = await User.hashPassword(body.password);
    const user = new User({
      local: {
        email: body.email,
        password: hashedPassword
      },
      name: body.name
    });
    return user.save();
  }
  catch(err){
    console.log(err.message);
  }
};

exports.findUserPerEmail = async (email) => {
  return User.findOne({ 'local.email': email })
};

exports.findUserPerId = async (id) => {
  return User.findOne({ _id: id });
};