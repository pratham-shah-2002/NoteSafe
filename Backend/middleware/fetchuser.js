const jwt = require("jsonwebtoken");
const JwT_SECRET = "Prathamisequivalenttozoro";

const fetchuser = async (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    res.status(400).json({ error: "Please enter valid token" });
  }
  try {
    const data = jwt.verify(token, JwT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Please enter valid token" });
  }
};

module.exports = fetchuser;
