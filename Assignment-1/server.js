const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 55000,
        quantity: 10
    },
    {
        id: 2,
        name: "Mobile Phone",
        category: "Electronics",
        price: 25000,
        quantity: 20
    },
    {
        id: 3,
        name: "Office Chair",
        category: "Furniture",
        price: 7500,
        quantity: 15
    },
    {
        id: 4,
        name: "Notebook",
        category: "Stationery",
        price: 100,
        quantity: 50
    }
];

// GET /products
// Display all products
app.get("/products", (req, res) => {
    res.status(200).json(products);
});


// GET /products/category/:category
// Filter products by category
app.get("/products/category/:category", (req, res) => {
    const category = req.params.category;

    const filteredProducts = products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredProducts.length === 0) {
        return res.status(404).json({
            message: `No products found in category: ${category}`
        });
    }

    res.status(200).json(filteredProducts);
});


// GET /products/:id
// Display a particular product
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: `Product with ID ${id} not found`
        });
    }

    res.status(200).json(product);
});


// POST /products
// Add a new product
app.post("/products", (req, res) => {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price === undefined || quantity === undefined) {
        return res.status(400).json({
            message: "Name, category, price and quantity are required"
        });
    }

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(product => product.id)) + 1
            : 1,
        name,
        category,
        price,
        quantity
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});


// PUT /products/:id
// Update an existing product
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(
        product => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: `Product with ID ${id} not found`
        });
    }

    const { name, category, price, quantity } = req.body;

    if (!name || !category || price === undefined || quantity === undefined) {
        return res.status(400).json({
            message: "Name, category, price and quantity are required"
        });
    }

    products[productIndex] = {
        id,
        name,
        category,
        price,
        quantity
    };

    res.status(200).json({
        message: "Product updated successfully",
        product: products[productIndex]
    });
});


// DELETE /products/:id
// Delete a product
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(
        product => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: `Product with ID ${id} not found`
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});


// Invalid route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});