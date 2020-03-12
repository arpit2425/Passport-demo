const router = require("express").Router();
const passport = require("passport");
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/logout", (req, res) => {
  res.send("loging out");
});
router.get("/google/redirect", (req, res) => {
  res.send("received information");
});
module.exports = router;
