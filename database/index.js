const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/devBD")
  .then(async () => {
    console.log("Connexion à la base de données etablie");
  })
  .catch((err) => {
    console.log("Connexion à la base de données echouée");
    console.log(err);
  });
