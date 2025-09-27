const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book name is required"],
    maxlength: [25, "Title limit will be maximum 25 characters long"],
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
  },
  publishedDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Book is Available", "Book is Checked Out"],
    default: "Book is Available",
  },
  summary: {
    type: String,
    default: "No summary provided",
  },
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);