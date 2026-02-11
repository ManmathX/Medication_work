const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); 
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json()); 

// TODO: add rate limiting later
// const rateLimit = require('express-rate-limit');

// Database: In-memory storage is now used in routes instead of MongoDB
console.log('Server running in in-memory mode (No MongoDB)');

// routes
const carRoutes = require('./routes/cars');
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');

app.use('/api/cars', carRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);

// test route
app.get('/', (req, res) => {
    res.json({ message: 'BMW Showroom API' });
});

// error handler - basic for now
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
