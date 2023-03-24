const express = require("express");
const noteRouter = express.Router();
noteRouter.use(express.json());
const { NoteModel } = require("../model/note.mode");
const jwt = require("jsonwebtoken");
require("dotenv");
const { auth } = require("../middlewares/auth.middleware");
noteRouter.use(auth); // middleware is checking that user is loged in or not

//
noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "masai");

  let query = req.query;
  let notes = await NoteModel.find({ userID: decoded.userID });
  res.status(200).send(notes);
});

noteRouter.get("/:noteId", async (req, res) => {
  let { noteId } = req.params;
  let notes = await NoteModel.findById({ _id: noteId });
  res.status(200).send(notes);
});

noteRouter.post("/add", async (req, res) => {
  let payload = req.body;
  let notes = await NoteModel(payload);
  await notes.save();
  res.status(200).send(notes);
});

noteRouter.delete("/delete/:noteId", async (req, res) => {
  let { noteId } = req.params;
  try {
    await NoteModel.findByIdAndDelete({ _id: noteId });
    res.status(200).send({ msg: "Note has been deleted successfully" });
  } catch (err) {
    res.status(200).send({ msg: "SOmething went wrong" });
  }
});

noteRouter.patch("/update/:noteId", async (req, res) => {
  let { noteId } = req.params;
  let payload = req.body;
  try {
    await NoteModel.findByIdAndUpdate({ _id: noteId }, payload);
    res.status(200).send({ msg: "Note has been Updated successfully" });
  } catch (err) {
    res.status(200).send({ msg: "SOmething went wrong" });
  }
});

module.exports = { noteRouter };
