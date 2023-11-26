const express = require("express");
const _ = express.Router();
// const View = require("../Views.ejs");

_.get("/home", (req, res) => {
  res.render("index");
});

_.get("/registration", (req, res) => {
  try {
   
    res.render("registraion");
  } catch (error) {
    res.status(500).json("User not created");
  }
});

_.get("/login", (req, res) => {
  try {
  
    res.render("login");
  } catch (error) {
    res.status(500).json("User not created");
  }
});

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
