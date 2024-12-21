exports.sessionNew = (req, res, next) => {
  res.render("signin", {
    error: req.query.error
  });
}

exports.sessionCreate = (req, res, next) => {
    res.end();
}

exports.sessionDelete = (req, res, next) => {
    res.end();
}