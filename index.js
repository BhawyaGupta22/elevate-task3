const express = require("express");
const app = express();
app.use(express.json());

// In-memory book list
let books = [];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST add new book
app.post("/books", (req, res) => {
  const book = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
  };
  books.push(book);
  res.status(201).json(book);
});

// PUT update a book
app.put("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books[index].title = req.body.title || books[index].title;
  books[index].author = req.body.author || books[index].author;

  res.json(books[index]);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deleted = books.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(3000, () => console.log("📚 Books API running at http://localhost:3000"));
