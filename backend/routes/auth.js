const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ email, password, name });
        await user.save();

        // create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            token,
            user: { id: user._id, email: user.email, name: user.name }
        });
    } catch (error) {
        console.log('Register error:', error); // debug
        res.status(500).json({ message: error.message });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({
            token,
            user: { id: user._id, email: user.email, name: user.name }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.post('/forgot-password', async (req, res) => {
//   // TODO: implement password reset
// });

module.exports = router;
