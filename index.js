require("dotenv").configDotenv();
const passport = require("passport");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dbConnection = require("./Connections/databaseConnection");
const cors = require("cors");
const ejs = require("ejs");
const Routes = require("./Routes");
const app = express();
dbConnection();


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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");
app.use(Routes);

app.listen(process.env.PORT, () => {
  console.log(
    `Port/server running on http://localhost:${process.env.PORT}/home`
  );
});
