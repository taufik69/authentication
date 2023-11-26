require("dotenv").configDotenv();
const express = require("express");
const dbConnection = require("./Connections/databaseConnection");
const cors = require("cors");
const ejs = require("ejs");
const Routes = require("./Routes");
const app = express();
dbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");
app.use(Routes);

app.listen(process.env.PORT, () => {
  console.log(`Port/server running on http://localhost:${process.env.PORT}`);
});
