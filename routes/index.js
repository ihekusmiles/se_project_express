const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/not-found-err");
const {
  validateAuthentication,
  validateUserInfoBody,
} = require("../middlewares/validation");

// To be specific about each type of router:
router.use("/users", userRouter);
router.use("/items", itemRouter);

// POST handlers for signin and signup routes, using celebrate validators
// Note: signin/signup have no 'auth' middleware as they are public routes
router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserInfoBody, createUser);

// If user tries to access a non-existent router:
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
