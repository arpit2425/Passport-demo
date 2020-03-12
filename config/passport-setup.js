const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

passport.use(
  new googleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },

    (accessToken, requestToken, profile, done) => {
      console.log("Pasport complete");
      console.log(profile);
    }
  )
);
