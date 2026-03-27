const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File path
const messagesFile = path.join(__dirname, "messages.json");

// Ensure file exists
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([]));
}

// Route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const data = fs.readFileSync(messagesFile, "utf8");
    const messages = JSON.parse(data);

    messages.push({
      name,
      email,
      message,
      date: new Date().toISOString()
    });

    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

    console.log("✅ Message saved");
    res.json({ message: "Message saved successfully!" });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});