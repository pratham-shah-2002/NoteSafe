const express = require("express");
const router = express.Router();
const { createUser, login, getUser } = require("../controllers/user");
const fetchuser = require("../middleware/fetchuser.js");

router.post("/createuser", createUser);

router.post("/login", login);

router.post("/getuser", fetchuser, getUser);

module.exports = router;
