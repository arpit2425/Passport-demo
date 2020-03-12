const express = require("express");
const authRoute = require("./routes/auth-routes");
const profileRoute = require("./routes/profile-routes");
const app = express();
const passportAuth = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("dotenv").config();
app.set("view engine", "ejs");
mongoose.connect(
  keys.mongodb.uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected");
  }
);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.sessionKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.listen(3000, () => {});
