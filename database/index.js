const mongoose = require("mongoose");
const schema = mongoose.Schema;

mongoose
  .connect("mongodb://didicode:123@127.0.0.1:27017/devDB")
  .then(() => {
    console.log("✅ Connecté à MongoDB avec succès!");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB:", err.message);
  });
