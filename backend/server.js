const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
const frontendPath = path.join(__dirname, "..");
app.use(express.static(frontendPath));

// File path
const messagesFile = path.join(__dirname, "messages.json");

// Ensure file exists
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([]));
}

// API route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const messages = JSON.parse(fs.readFileSync(messagesFile, "utf8"));

    messages.push({
      name,
      email,
      message,
      date: new Date().toISOString()
    });

    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

    res.json({ message: "Message saved successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ FIXED fallback route (NO "*")
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});