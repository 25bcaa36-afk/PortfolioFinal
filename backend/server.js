const express = require("express");
const fs = require("fs");
<<<<<<< HEAD
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

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
=======
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Contact form route
app.post("/contact", (req, res) => {
  const filePath = __dirname + "/messages.json";
  const newMessage = req.body;

  let messages = [];

  if (fs.existsSync(filePath)) {
    messages = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  messages.push({
    name: newMessage.name,
    email: newMessage.email,
    message: newMessage.message,
    date: new Date()
  });

  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

  res.json({ message: "Message saved successfully!" });
>>>>>>> 656e143340c348435de4bfa3cc46779eaf2a3ee5
});

// Start server
app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
=======
  console.log(`Server running on http://localhost:${PORT}`);
});
>>>>>>> 656e143340c348435de4bfa3cc46779eaf2a3ee5
