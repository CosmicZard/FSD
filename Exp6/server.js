const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "pages", "home.html");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error loading Home page");
        }

        res.send(data);
    });
});

app.get("/about", (req, res) => {
    const filePath = path.join(__dirname, "pages", "about.html");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error loading About page");
        }

        res.send(data);
    });
});

app.get("/contact", (req, res) => {
    const filePath = path.join(__dirname, "pages", "contact.html");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error loading Contact page");
        }

        res.send(data);
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});