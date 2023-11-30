require("dotenv").configDotenv();
const app = require("./app");
app.listen(process.env.PORT, () => {
  console.log(
    `Port/server running on http://localhost:${process.env.PORT}/home`
  );
});
