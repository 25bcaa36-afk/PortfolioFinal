document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  try {
    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
    this.reset();

  } catch (err) {
    console.error(err);
    alert("Server not running or request failed.");
  }
});