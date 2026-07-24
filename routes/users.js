const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUpdateUserInfo } = require("../middlewares/validation");

// GET -> client requesting data from server so no validation needed
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdateUserInfo, updateUser);
module.exports = router;
