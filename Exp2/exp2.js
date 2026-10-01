const fs = require("fs");

const fileName = "student.txt";

// Create
fs.writeFileSync(fileName, "Name: Roshan\nAge: 19");
console.log("File created.");

// Read
let data = fs.readFileSync(fileName, "utf8");
console.log("File content:");
console.log(data);

// Update
fs.appendFileSync(fileName, "\nCourse: B.Tech CSE");
console.log("File updated.");

// Read updated file
data = fs.readFileSync(fileName, "utf8");
console.log("Updated content:");
console.log(data);

// Delete
fs.unlinkSync(fileName);
console.log("File deleted.");