const express = require("express");
const authRoute = require("./routes/auth-routes");
const app = express();
const passportAuth = require("./config/passport-setup");

require("dotenv").config();
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/auth", authRoute);
app.listen(3000, () => {});
