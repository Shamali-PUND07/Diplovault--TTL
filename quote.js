const slider = document.getElementById('quoteSlider');
let quotes = [];
let currentIndex = 0;

// Fetch Quotes from ZenQuotes API
async function fetchQuotes() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        quotes = data;
        displayQuote();
        setInterval(nextQuote, 5000); // Change quote every 5 seconds
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Display Current Quote
function displayQuote() {
    const quote = quotes[0]; // ZenQuotes API returns a single object inside an array
    slider.innerHTML = `
        <div class="slide active">
            <p class="quote-text">"${quote.q}"</p>
            <p class="quote-author">- ${quote.a}</p>
        </div>
    `;
}

// Move to Next Quote
async function nextQuote() {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    quotes = data;

    slider.innerHTML = `
        <div class="slide active">
            <p class="quote-text">"${quotes[0].q}"</p>
            <p class="quote-author">- ${quotes[0].a}</p>
        </div>
    `;
}

// Initialize
fetchQuotes();
