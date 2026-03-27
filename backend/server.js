const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend (IMPORTANT: adjust if needed)
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// Contact API (NO file writing)
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("📩 New message:", { name, email, message });

  res.json({ message: "Message received successfully!" });
});

// Fallback route
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});