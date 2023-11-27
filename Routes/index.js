const express = require("express");
const bcrypt = require("bcrypt");
const _ = express.Router();
const passport = require("passport");
const userModel = require("../models/user.model");
require("../passportConfiguration/passportLocal");
_.get("/home", (req, res) => {
  res.render("index");
});

_.get("/registration", (req, res) => {
  res.render("registration");
});

_.get("/login", (req, res) => {
  res.render("login");
});

_.post("/registration", async (req, res) => {
  try {
    const { userName, password } = req.body;

    //make password more secure
    bcrypt.hash(password, 10, async function (err, hash) {
      const AfterSendingData = await new userModel({
        userName,
        password: hash,
      }).save();
      console.log(AfterSendingData);
      res.redirect("login");
    });
  } catch (error) {
    res.status(500).json("User not created");
  }
});

_.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/profile");
  }
);

_.get("/profile", (req, res) => {
  res.render("profile");
});

_.get("/logout", (req, res) => {
  res.redirect("/home");
});

_.get("/*", (req, res) => {
  res.send("error / path not found");
});

module.exports = _;
