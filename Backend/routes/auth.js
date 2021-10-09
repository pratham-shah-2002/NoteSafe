const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/user");

router.post("/createuser", createUser);

router.post("/login", login);

module.exports = router;
