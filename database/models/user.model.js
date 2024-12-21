const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  username: { type: String },
});

UserSchema.static.hashPassword = async (password) => {
  try{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.error('Erreur lors de la hachage du mot de passe:', err);
  }
};

UserSchema.static.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
