exports.sessionNew = (req, res, next) => {
  res.render("signin", {
    error: req.query.error,
  });
};

exports.sessionCreate = (req, res, next) => {};

exports.sessionDelete = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
  });
  res.redirect("/auth/signin/form");
};
