const express = require("express");
const connecttoDB = require("./db");
const cors = require("cors");
const app = express();

connecttoDB();
app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.json("Home page");
});

app.listen(5000, () => {
  console.log("Server is listening at port 5000...");
});
