const route = require("express").Router();
function checkAuth(req, res, next) {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}
route.get("/", checkAuth, (req, res) => {
  res.render("profile", { user: req.user });
});
module.exports = route;
