const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  useName: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
