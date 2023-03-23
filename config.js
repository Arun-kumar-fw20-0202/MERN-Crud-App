const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(
  "mongodb+srv://arun_kumar:katill_boyy@cluster0.hrubn8e.mongodb.net/?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};
