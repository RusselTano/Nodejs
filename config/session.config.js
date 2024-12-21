const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const { app } = require("../app");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/mydatabase",
      ttl: 60 * 60 * 24,
    }),
  })
);
