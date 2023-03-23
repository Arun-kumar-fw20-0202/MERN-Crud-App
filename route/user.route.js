const express = require("express");
const userRouter = express.Router();
userRouter.use(express.json());
var jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
require("dotenv");

// adding userRouter
userRouter.post("/register", async (req, res) => {
  const { email, password, location, age } = req.body;
  // console.log(email);
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ email, password: hash, location, age });
      await user.save();
      res
        .status(200)
        .send({ msg: "Registration has been successfully registered" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// adding userRouter
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            mgs: "Login Successful!!",
            token: jwt.sign({ course: "backend" }, "masai"),
          });
        } else {
          res.status(400).send({ msg: "wrong Credentials" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
  // res.status(200).send({ msg: "User Logins" });
});

module.exports = { userRouter };
