const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/user-model");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

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
          done(null, user);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
            photo: profile.photos[0].value
          })
            .save()
            .then(res => {
              console.log(res);
              done(null, res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  )
);
