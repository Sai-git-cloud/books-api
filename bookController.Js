// controllers/bookController.js — Controller Logic

const Book = require("../models/Book");
const mongoose = require("mongoose");

// Middleware for logging each incoming request
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Fetch all books sorted by title in ascending alphabetical order
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ title: 1 });
    res.status(200).json({
      data: books,
      total: books.length,
      message: "Books sorted by title in ascending alphabetical order".
    });
  } catch (error) {
    console.error("Error while fetching the books:", error);
    res.status(500).json({ error: "Unable to retrieve books, please try again later." });
  }
};

// Get a single book by its published date
const getBookByPublishedDate = async (req, res) => {
  const { date } = req.params;

  if (!date) {
    return res.status(400).json({ error: "Published date is mandatory." });
  }

  try {
    const book = await Book.findOne({ publishedDate: new Date(date) });

    if (!book) {
      return res.status(404).json({ error: `No book found with the published date: ${date}` });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book by publishedDate:", error);
    res.status(500).json({ error: "Server error while retrieving the book at the moment." });
  }
};

// Create a new book
const createBook = async (req, res) => {
  const { title, author, publishedDate, status, summary } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Both name and author are required." });
  }

  try {
    const newBook = await Book.create({
      title,
      author,
      publishedDate,
      status,
      summary,
    });

    res.status(201).json({
      message: "New Book added successfully!",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(400).json({ error: "Failed to create new book. Please check your input and try again." });
  }
};

// Update an existing book
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format." });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ error: "No book found with that ID." });
    }

    res.status(200).json({
      message: "Book updated successfully.",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(400).json({ error: "Update failed. Please review your data and try again." });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID format." });
  }

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found. Deletion could not proceed." });
    }

    res.status(200).json({
      message: "Book successfully removed.",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "An error occurred while trying to delete the book." });
  }
};

module.exports = {
  logRequest,
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
