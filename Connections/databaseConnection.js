const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      console.log(`MongoDB server connection sucessfull `);
    })
    .catch((error) => {
      console.log(`mongodb error ${error}`);
    });
};

module.exports = dbConnection;
