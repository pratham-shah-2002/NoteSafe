const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  let success = false;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: pass,
    });
    // await user.save();
    console.log({ user });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, `${process.env.JwT_SECRET}`);
    success = true;
    res.status(200).json({ success, authtoken });
  } catch (error) {
    res
      .status(500)
      .json({ success, error: "Please fill the details correctly" });
  }
};

const login = async (req, res) => {
  let success = false;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success, error: "Please enter correct credentials" });
    }
    const userPass = await bcrypt.compare(req.body.password, user.password);
    if (!userPass) {
      return res
        .status(400)
        .json({ success, error: "Please enter correct credentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, `${process.env.JwT_SECRET}`);
    success = true;
    res.status(200).json({ success, authtoken, userPass });
  } catch (error) {
    res.status(500).json({ success, error: "Internal Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = { createUser, login, getUser };
