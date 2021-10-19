const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JwT_SECRET = "Prathamisequivalenttozoro";

const createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: pass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JwT_SECRET);
    res.json({authtoken});
  } catch (error) {
    res.status(500).json({error: "Internal Server error"});
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please enter correct credentials" });
    }
    const userPass = bcrypt.compare(user.password, req.body.password);
    if (!userPass) {
      return res
        .status(400)
        .json({ error: "Please enter correct credentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JwT_SECRET);
    res.status(200).json({ authtoken });
  } catch (error) {
    res.status(500).json({error: "Internal Server error"});
  }
};

const getUser = async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({error: "Internal Server error"});
  }
};

module.exports = { createUser, login, getUser };
