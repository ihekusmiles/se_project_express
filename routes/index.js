const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

// To be specific about each typer of router:
router.use("/users", userRouter);
router.use("/items", itemRouter);

// If user tries to access a non-existent router:
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
