const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    name: String,
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
  NoteModel,
};
