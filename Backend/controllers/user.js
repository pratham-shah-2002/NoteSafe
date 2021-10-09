const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    user = await User(req.body);
    await user.save();
    res.send(req.body);
  } catch (error) {
    res.status(400).send({ error: error.messege });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user.password !== req.body.password) {
      return res
        .status(400)
        .json({ error: "Please enter with correct credentials" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.send("Internal server error");
  }
};

module.exports = { createUser, login };
