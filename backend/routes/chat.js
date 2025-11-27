const express = require('express');
const router = express.Router();

// chatbot response logic - probaly should move this to a seperate file
const getBMWResponse = (question) => {
    const lowerQuestion = question.toLowerCase();

    // basic keyword matching - works for now
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
        return 'Hello! Welcome to BMW Showroom. How can I help you today?';
    }
    if (lowerQuestion.includes('x5')) {
        return 'The BMW X5 is our luxury midsize SUV, priced at $75,000. Features powerful engine, spacious interior.';
    }
    if (lowerQuestion.includes('3 series')) {
        return 'The BMW 3 Series is our iconic sporty sedan, starting at $42,000. Perfect balance of performance and luxury.';
    }
    if (lowerQuestion.includes('price')) {
        return 'Our BMW models range from $42,000 to $140,000. We offer flexible financing options!';
    }
    if (lowerQuestion.includes('contact')) {
        return 'Visit us at 123 Luxury Drive, Auto City, NY 10001. Call: 9752834140';
    }

    // default response
    return 'I can help with BMW models, pricing, features, and test drives. What would you like to know?';
};

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        // quick fix - just call the function
        const response = getBMWResponse(message);
        res.json({ response });
    } catch (error) {
        console.log('Error in chat:', error); // debug
        res.status(500).json({ message: error.message });
    }
});

// TODO: integrate with real AI later (OpenAI or something)

module.exports = router;
