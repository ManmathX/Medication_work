const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Ensure bcryptjs is installed or use a simple mock if preferred, but keeping it for realism

// In-memory user storage
// Structure: { id, email, password (hashed), name }
const users = [];

// Helper to find user
const findUserByEmail = (email) => users.find(u => u.email === email);

// register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // check if user exists
        const existingUser = findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: Date.now().toString(),
            email,
            password: hashedPassword,
            name
        };

        users.push(newUser);

        // create token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

        res.status(201).json({
            token,
            user: { id: newUser.id, email: newUser.email, name: newUser.name }
        });
    } catch (error) {
        console.log('Register error:', error);
        res.status(500).json({ message: error.message });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.post('/forgot-password', async (req, res) => {
//   // TODO: implement password reset
// });

module.exports = router;
