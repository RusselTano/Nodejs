const path = require("path");
const express = require("express");
const multer = require("multer");
// const upload = multer({ dest: path.join(__dirname, "upload") });

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/upload"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const routing = require("./routes");
const app = express();
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

app.post("/file", upload.single("avatar"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.end();
});

app.listen(port).on("listening", () => {
  console.log(`Server listening on port ${port} http://localhost:${port}`);
});
