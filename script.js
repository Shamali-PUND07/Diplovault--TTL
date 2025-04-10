const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;
const totalSlides = slides.length;

// Backup Quotes if API Fails
const backupQuotes = [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
];

async function fetchQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (data.content) {
            document.getElementById("quoteText").textContent = `"${data.content}"`;
            document.getElementById("quoteAuthor").textContent = `- ${data.author}`;
        } else { throw new Error("Invalid data"); }
    } catch (error) {
        console.error("Error fetching quote:", error);
        const randomQuote = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
        document.getElementById("quoteText").textContent = `"${randomQuote.text}"`;
        document.getElementById("quoteAuthor").textContent = `- ${randomQuote.author}`;
    }
}

setInterval(fetchQuote, 5000);
fetchQuote();

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
}

function updateSlidePosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(nextSlide, 5000);