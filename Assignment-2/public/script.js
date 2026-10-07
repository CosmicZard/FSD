let books = [];
let editId = null;


// GET - Display books
async function loadBooks() {

    const response = await fetch("/api/books");

    books = await response.json();

    displayBooks(books);
}


// Display books on webpage
function displayBooks(
) {

    const container = document.getElementById("bookContainer");

    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>No books found.</p>";
        return;
    }

    data.forEach(book => {

        const card = document.createElement("div");

        card.className = "book-card";

        card.innerHTML = `
            <h3>${book.title}</h3>

            <p><strong>Author:</strong> ${book.author}</p>

            <p><strong>Category:</strong> ${book.category}</p>

            <p><strong>Year:</strong> ${book.year}</p>

            <div class="actions">

                <button
                    class="edit"
                    onclick="editBook(${book.id})">
                    Edit
                </button>

                <button
                    class="delete"
                    onclick="deleteBook(${book.id})">
                    Delete
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


// POST - Add book
document.getElementById("bookForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;
    const year = document.getElementById("year").value;

    const bookData = {
        title,
        author,
        category,
        year
    };


    // PUT - Update book
    if (editId !== null) {

        const response = await fetch(`/api/books/${editId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bookData)
        });

        const result = await response.json();

        alert(result.message);

        cancelEdit();

        loadBooks();

        return;
    }


    // POST - Add new book
    const response = await fetch("/api/books", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(bookData)
    });

    const result = await response.json();

    alert(result.message);

    document.getElementById("bookForm").reset();

    loadBooks();
});


// Edit book
function editBook(id) {

    const book = books.find(book => book.id === id);

    if (!book) return;

    editId = id;

    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("category").value = book.category;
    document.getElementById("year").value = book.year;

    document.getElementById("formTitle").innerText = "Update Book";

    document.getElementById("submitBtn").innerText = "Update Book";

    document.getElementById("cancelBtn").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Cancel edit
function cancelEdit() {

    editId = null;

    document.getElementById("bookForm").reset();

    document.getElementById("formTitle").innerText = "Add New Book";

    document.getElementById("submitBtn").innerText = "Add Book";

    document.getElementById("cancelBtn").style.display = "none";
}


// DELETE - Delete book
async function deleteBook(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    const response = await fetch(`/api/books/${id}`, {

        method: "DELETE"
    });

    const result = await response.json();

    alert(result.message);

    loadBooks();
}


// Search books
function searchBooks() {

    const searchText =
        document.getElementById("search").value.toLowerCase();

    const filteredBooks = books.filter(book =>

        book.title.toLowerCase().includes(searchText) ||

        book.author.toLowerCase().includes(searchText) ||

        book.category.toLowerCase().includes(searchText)
    );

    displayBooks(filteredBooks);
}


// Load books when page opens
loadBooks();