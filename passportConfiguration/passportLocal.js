const userModel = require("../models/user.model");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (userName, password, done) => {
    try {
      const user = await userModel.findOne({ userName: userName });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "incorrect userName" });
      }
      if (!bcrypt.compare(password, user.password)) {
        return done(null, false, { message: "incorrect password" });
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

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
