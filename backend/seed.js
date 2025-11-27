const mongoose = require('mongoose');
const Car = require('./models/Car');
require('dotenv').config();

const cars = [
    {
        name: 'BMW X5',
        price: 75000,
        description: 'Luxury midsize SUV with powerful performance',
        image: 'https://i.pinimg.com/1200x/30/64/b4/3064b4c9ef35b0085842303686c6a842.jpg',
        features: ['Powerful Engine', 'Spacious Interior', 'Advanced Safety', 'Latest iDrive']
    },
    {
        name: 'BMW 3 Series',
        price: 42000,
        description: 'Sporty sedan with perfect balance',
        image: 'https://i.pinimg.com/1200x/f9/a8/9e/f9a89eacbb91a3ebdca6f68b8245af3b.jpg',
        features: ['Turbocharged Engine', 'Premium Interior', 'Exceptional Handling']
    },
    {
        name: 'BMW i8',
        price: 140000,
        description: 'Hybrid sports car with futuristic design',
        image: 'https://i.pinimg.com/736x/fd/82/21/fd82214aaddc196cd9c532913dc04d36.jpg',
        features: ['Butterfly Doors', 'Hybrid Power', 'Futuristic Design', 'Cutting-edge Tech']
    },
    {
        name: 'BMW M4 Competition',
        price: 85000,
        description: 'High-performance coupe',
        image: 'https://i.pinimg.com/736x/96/da/14/96da14a20228cec95bd7063e3d35ff7e.jpg',
        features: ['Twin-Turbo Engine', '503 HP', 'Track-Ready Performance']
    },
    {
        name: 'BMW 7 Series',
        price: 99000,
        description: 'Flagship luxury sedan',
        image: 'https://i.pinimg.com/736x/f7/03/c0/f703c0cfa804f16a2672e4cfcaecdff4.jpg',
        features: ['Massage Seats', 'Executive Lounge', 'Gesture Controls', 'Crystal Gear Selector']
    }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bmw-showroom')
    .then(async () => {
        console.log('MongoDB connected');
        await Car.deleteMany({});
        await Car.insertMany(cars);
        console.log('Database seeded with BMW cars!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
