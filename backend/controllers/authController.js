const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
exports.signup = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hasPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hasPassword,
    });
    res.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      res.status(200).json({
        status: "Login Successfull",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "username or password is incorrect",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
