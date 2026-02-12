const express = require("express");
const fs = require("fs");
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
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
