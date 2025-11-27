const API_URL = 'http://localhost:5000/api';

let cars = []
var isDark = true;  // using var

// Load cars on page load
window.addEventListener('DOMContentLoaded', async () => {
    await loadCars();
    addWelcomeMessage();
});

// TODO: refactor this function
async function loadCars() {
    try {
        const response = await fetch(`${API_URL}/cars`);
        cars = await response.json();
        console.log('Loaded cars:', cars.length); // debug
        displayCars(cars);
    } catch (error) {
        console.log('Error loading cars', error);
        // fallback data
        cars = [
            { _id: '1', name: 'BMW X5', price: 75000, description: 'Luxury midsize SUV', image: 'https://i.pinimg.com/1200x/30/64/b4/3064b4c9ef35b0085842303686c6a842.jpg' },
            { _id: '2', name: 'BMW 3 Series', price: 42000, description: 'Sporty sedan', image: 'https://i.pinimg.com/1200x/f9/a8/9e/f9a89eacbb91a3ebdca6f68b8245af3b.jpg' },
            { _id: '3', name: 'BMW i8', price: 140000, description: 'Hybrid sports car', image: 'https://i.pinimg.com/736x/fd/82/21/fd82214aaddc196cd9c532913dc04d36.jpg' },
            { _id: '4', name: 'BMW M4 Competition', price: 85000, description: 'High-performance coupe', image: 'https://i.pinimg.com/736x/96/da/14/96da14a20228cec95bd7063e3d35ff7e.jpg' },
            { _id: '5', name: 'BMW 7 Series', price: 99000, description: 'Flagship luxury sedan', image: 'https://i.pinimg.com/736x/f7/03/c0/f703c0cfa804f16a2672e4cfcaecdff4.jpg' },
        ];
        displayCars(cars);
    }
}

function displayCars(carsToDisplay) {
    const grid = document.getElementById('carsGrid');
    grid.innerHTML = '';

    carsToDisplay.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <div class="car-info">
                <h3>${car.name}</h3>
                <div class="car-price">$${car.price.toLocaleString()}</div>
                <p>${car.description}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

function searchCars() {
    let query = document.getElementById('searchInput').value.toLowerCase();
    console.log('Searching for:', query); // debug log

    const filtered = cars.filter(car =>
        car.name.toLowerCase().includes(query) ||
        car.description.toLowerCase().includes(query)
    );

    displayCars(filtered);
}

function toggleTheme() {
    document.body.classList.toggle('light');
    isDark = !isDark;
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = isDark ? '🌙' : '☀️';
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Chat functionality
function addWelcomeMessage() {
    const chatMessages = document.getElementById('chatMessages');
    addMessage("Hello! I'm your BMW assistant. Ask me anything!", 'bot');
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    var userMessage = input.value.trim();

    if (!userMessage) return;

    addMessage(userMessage, 'user');
    input.value = '';

    // TODO: add loading indicator
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        console.log('Bot response:', data); // debug
        setTimeout(() => {
            addMessage(data.response, 'bot');
        }, 500);
    } catch (error) {
        console.log('Chat error:', error);
        addMessage('Sorry, I could not process that.', 'bot');
    }
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
