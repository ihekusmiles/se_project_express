const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");

const express = require("express");

// To be specific about each type of router:
router.use("/users", userRouter);
router.use("/items", itemRouter);

// POST handlers for signin and signup routes
router.post("/signin", login);
router.post("/signup", createUser);

// If user tries to access a non-existent router:
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
