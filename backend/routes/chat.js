const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateBMWResponse = async (question) => {
    try {
        const prompt = `
        You are a knowledgeable and helpful AI assistant for a BMW car showroom. 
        Your goal is to assist customers with information about BMW models, features, pricing, and services.
        
        Guidelines:
        - Be polite, professional, and enthusiastic about BMW cars.
        - If asked about specific models (e.g., X5, 3 Series, M4), provide accurate details about their key features and starting prices based on general knowledge (you can estimate if exact current pricing is unknown, but mention it encounters depends on configuration).
        - If asked about pricing, give a general range and mention that precise pricing depends on customization and current offers.
        - If asked about contact information or location, use this: "Visit us at 123 Luxury Drive, Auto City, NY 10001. Call: 9752834140".
        - If the user's question is unrelated to deep technical details or specific inventory that you wouldn't know, suggest they contact a sales representative for the most up-to-date information.
        - Keep answers concise but informative.

        User Question: ${question}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error generating Gemini response:", error);
        return "I apologize, but I'm having trouble connecting to the AI service at the moment. Please contact our showroom directly at 9752834140.";
    }
};

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const response = await generateBMWResponse(message);
        res.json({ response });
    } catch (error) {
        console.log('Error in chat:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
