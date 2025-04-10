const slider = document.getElementById('quoteSlider');
let quotes = [];
let currentIndex = 0;

// Fetch Quotes from ZenQuotes API
async function fetchQuotes() {
    try {
        const response = await fetch('https://api.quotable.io/random'); // Alternative to ZenQuotes
        const data = await response.json();
        
        // Store quote
        quotes = [{ text: data.content, author: data.author }];
        
        // Display first quote
        displayQuote();
        
        // Change quotes every 5 seconds
        setInterval(nextQuote, 5000);
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Display Current Quote
function displayQuote() {
    const quote = quotes[currentIndex];
    slider.innerHTML = `
        <div class="slide active">
            <p class="quote-text">"${quote.text}"</p>
            <p class="quote-author">- ${quote.author}</p>
        </div>
    `;
}

// Move to Next Quote
async function nextQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random'); 
        const data = await response.json();

        // Store new quote
        quotes = [{ text: data.content, author: data.author }];

        // Update quote in slider
        displayQuote();
    } catch (error) {
        console.error('Error fetching new quote:', error);
    }
}

// Initialize
fetchQuotes();
