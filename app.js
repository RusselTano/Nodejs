const path = require("path");
const express = require("express");
const app = express();
const api = require("./routes/api");
const index = require("./routes/index");
const port = 3300;

require("./database"); // Connexion à la base de données MongoDB

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);
app.use("/", index);

app.listen(port).on("listening", () => {
  console.log(`Server listening on port ${port} http://localhost:${port}`);
});
