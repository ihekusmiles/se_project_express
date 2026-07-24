const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");

// To manage data in a database or API and using celebrate validators
// CRUD: CREATE, READ, UPDATE, DELETE
// Existing clothing item routes
// CREATE
router.post("/", auth, validateCardBody, createItem);
// READ
router.get("/", getItems); // No auth/validation required because anyone can view items (public catalog)
// DELETE
router.delete("/:itemId", auth, validateId, deleteItem);

// Like/Unlike routes
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
