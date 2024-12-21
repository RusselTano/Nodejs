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