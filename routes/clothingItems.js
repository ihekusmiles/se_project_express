const router = require("express").Router();
const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Existing clothing item routes
// CREATE
router.post("/", createItem);
// READ
router.get("/", getItems);
// UPDATE
router.put("/:itemId", updateItem);
// DELETE
router.delete("/:itemId", deleteItem);

// Like/Unlike routes
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
