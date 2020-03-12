const express = require("express");
const authRoute = require("./routes/auth-routes");
const app = express();
const passportAuth = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("dotenv").config();
app.set("view engine", "ejs");
mongoose.connect(
  keys.mongodb.uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected");
  }
);
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/auth", authRoute);
app.listen(3000, () => {});
