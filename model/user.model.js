const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    phone: Number,
    gender: String,
    name: String,
    email: String,
    password: String,
    avatar: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
