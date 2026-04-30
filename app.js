const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Remember that CORS blocks unauthorized origins immediately
app.use(cors()); //CORS middleware should be placed first.
app.use(express.json()); // Parse the request body second.
app.use("/", mainRouter); // Route to the right handler last.

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
