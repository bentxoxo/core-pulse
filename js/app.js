// Rotating Hero Text
const rotatingTexts = [
  "Search anything",
  "Write code faster",
  "Build presentations",
  "Analyze documents",
  "Research anything",
  "Generate images"
];
let index = 0;
const rotatingElement = document.querySelector(".rotating-text");

function rotateText() {
  if (rotatingElement) {
    rotatingElement.textContent = rotatingTexts[index];
    index = (index + 1) % rotatingTexts.length;
  }
}
setInterval(rotateText, 2000);
rotateText();

// DuckDuckGo Free Search
const form = document.getElementById("search-form");
const resultsDiv = document.getElementById("results");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (!query) return;

    resultsDiv.innerHTML = "Searching the web... 🔍";

    try {
      const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`);
      const data = await res.json();

      let answer = data.AbstractText || (data.RelatedTopics[0]?.Text ?? "No answer found.");
      resultsDiv.innerHTML = `<p>${answer}</p>`;
    } catch (err) {
      console.error(err);
      resultsDiv.innerHTML = "Error fetching results. Try again later.";
    }
  });
}