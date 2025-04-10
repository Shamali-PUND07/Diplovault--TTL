const slider = document.getElementById('quoteSlider');
let quotes = [];
let currentIndex = 0;

// Fetch quotes from ZenQuotes API
async function fetchQuotes() {
    try {
        const response = await fetch('https://zenquotes.io/api/quotes');
        quotes = await response.json();
        displayQuote();
        setInterval(nextQuote, 5000); // Change quote every 5 seconds
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Display the current quote
function displayQuote() {
    const quote = quotes[currentIndex];
    slider.innerHTML = `
        <div class="slide">
            <p class="quote-text">"${quote.q}"</p>
            <p class="quote-author">- ${quote.a}</p>
        </div>
    `;
}

// Move to the next quote
function nextQuote() {
    currentIndex = (currentIndex + 1) % quotes.length;
    displayQuote();
}

// Initialize the slider
fetchQuotes();
