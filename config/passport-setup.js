const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/user-model");

passport.use(
  new googleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },

    (accessToken, requestToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          console.log("user already registered");
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(res => {
              console.log(res);
            });
        }
      });
    }
  )
);
