const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// To manage data in a database or API
//CRUD: CREATE, READ, UPDATE, DELETE
// Existing clothing item routes
// CREATE
router.post("/", createItem);
// READ
router.get("/", getItems);
// DELETE
router.delete("/:itemId", deleteItem);

// Like/Unlike routes
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
