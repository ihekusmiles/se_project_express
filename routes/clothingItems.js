const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// To manage data in a database or API
//CRUD: CREATE, READ, UPDATE, DELETE
// Existing clothing item routes
// CREATE
router.post("/", auth, createItem);
// READ
router.get("/", getItems); // No auth required because anyone can view items (public catalog)
// DELETE
router.delete("/:itemId", auth, deleteItem);

// Like/Unlike routes
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
