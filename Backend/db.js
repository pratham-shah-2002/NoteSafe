const mongoose = require("mongoose");

const CONNECTION_URL =
  "mongodb://localhost:27017/Google-keep?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connecttoDB = () => {
  mongoose.connect(CONNECTION_URL, () => {
    console.log("Connected to server successfully");
  });
};

module.exports = connecttoDB;
