const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const PORT = 3001;

// Enable request logger before all route handlers
app.use(requestLogger);

// Remember that CORS blocks unauthorized origins immediately
app.use(cors()); // CORS middleware should be placed FIRST.
app.use(express.json()); // Parse the request body SECOND.
app.use("/", mainRouter); // Route to the right handler LAST.

// Enable error logger after route handlers and before error handlers
app.use(errorLogger);
// celebrate error handler
app.use(errors());
// Centralized error handling
app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
