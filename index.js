const express = require("express");
const { connection } = require("./config");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { userRouter } = require("./route/user.route");
const { noteRouter } = require("./route/notes.route");

app.use("/auth", userRouter);

app.use("/note", noteRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Server is running at 8080");
    console.log("DB connected");
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
});
