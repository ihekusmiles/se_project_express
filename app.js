const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const PORT = 3001;

app.use(express.json());
// This middleware adds a user object to each request:
// Before middleware: req = { body: {...}, params: {...} }
// After middleware:  req = { body: {...}, params: {...}, user: { _id: '...' } }
app.use((req, res, next) => {
  req.user = {
    _id: "69a9d77c00ae180eb21dddf4",
  };
  next();
});
app.use("/", mainRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
