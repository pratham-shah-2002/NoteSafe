const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    })
  )
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("NoteSafe Api");
});
