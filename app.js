require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");
const helmet = require("helmet");
const { limiter } = require("./middlewares/rateLimiter");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

// use process.env port, otherwise default to 3001
const { PORT = 3001 } = process.env;
// Enable request logger before all route handlers
app.use(requestLogger);
// Place helmet before cors as a convention
app.use(helmet());
// Enable limiter
app.use(limiter);
// Remember that CORS blocks unauthorized origins immediately
app.use(
  cors({
    origin: [
      "https://weatherwear.twilightparadox.com",
      "https://www.weatherwear.twilightparadox.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
); // CORS middleware should be placed first, but if using 'helmet' place after.

// Setting up server crash testing
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

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
