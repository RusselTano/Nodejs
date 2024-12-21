const path = require("path");
const express = require("express");
const app = express();
const routing = require("./routes");
const port = 3300;

exports.app = app;
require("./config/session.config");
require("./config/passport.config");

require("./database"); // Connexion à la base de données MongoDB

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routing);

app.listen(port).on("listening", () => {
  console.log(`Server listening on port ${port} http://localhost:${port}`);
});
