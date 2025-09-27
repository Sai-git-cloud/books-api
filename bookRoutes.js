const express = require("express");
const {
  logRequest,
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

router.use(logRequest);

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
