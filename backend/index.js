const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// This will store all documents in memory
let documents = [];

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  const content = fs.readFileSync(req.file.path, "utf-8");

  documents.push(content);

  res.json({ message: "File uploaded successfully" });
});

// Search route
app.get("/search", (req, res) => {
  const query = req.query.q.toLowerCase();

  let results = [];

  documents.forEach((doc) => {
    if (doc.toLowerCase().includes(query)) {
      results.push(doc.substring(0, 200));
    }
  });

  res.json(results);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});