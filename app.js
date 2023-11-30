const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const app = express();
require("./passportConfiguration/passportLocal");
require("dotenv").configDotenv();
const dbConnection = require("./Connections/databaseConnection");
const userModel = require("./models/user.model");
const bcrypt = require("bcrypt");

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

dbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");

// session builder with mongodb store
app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGOURL,
      collectionName: "sessions",
    }),
    // cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/registration", (req, res) => {
  res.render("registration");
});

app.post("/registration", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await userModel.findOne({ userName: userName });
    if (user) return res.status(400).send("user already exists");

    //make password more secure
    bcrypt.hash(password, 10, async (err, hash) => {
      const newUser = await new userModel({
        userName,
        password: hash,
      }).save();

      res.redirect("login");
    });
  } catch (error) {
    res.status(500).json("User not created");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  })
);

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.get("/logout", (req, res) => {
  res.redirect("/home");
});

app.get("/*", (req, res) => {
  res.send("error / path not found");
});

module.exports = app;
