const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy((userName, password, done) => {
    try {
      const user = userModel.findOne({ userName: userName });
      if (!user) {
        return done(null, false, { message: "incorrect message" });
      }
      if (!bcrypt.compare(password, user.password)) {
        return done(null, false, { message: "incorrect message" });
      }
    } catch (err) {
      if (err) {
        return done(err);
      }
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
