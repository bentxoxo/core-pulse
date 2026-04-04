const form = document.getElementById("search-form");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document.getElementById("search-input").value;

  resultsDiv.innerHTML = "Thinking... 🤖";

  const res = await fetch("http://localhost:3000/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();

  resultsDiv.innerHTML = `
    <div class="ai-answer">
      <h3>AI Answer</h3>
      <p>${data.answer}</p>
    </div>
  `;
});