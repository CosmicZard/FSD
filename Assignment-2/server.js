const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        year: 1988
    },
    {
        id: 2,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Programming",
        year: 2008
    },
    {
        id: 3,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        year: 2018
    }
];

// GET - Display all books
app.get("/api/books", (req, res) => {
    res.json(books);
});

// POST - Add a new book
app.post("/api/books", (req, res) => {
    const { title, author, category, year } = req.body;

    if (!title || !author || !category || !year) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        category,
        year
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

// PUT - Update book
app.put("/api/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, category, year } = req.body;

    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;

    res.json({
        message: "Book updated successfully",
        book
    });
});

// DELETE - Delete book
app.delete("/api/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(bookIndex, 1);

    res.json({
        message: "Book deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});