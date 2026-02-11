const express = require('express');
const router = express.Router();

// In-memory car storage
const cars = [
    {
        _id: '1',
        name: 'BMW X5',
        price: 75000,
        description: 'Luxury midsize SUV with powerful engine and spacious interior.',
        imageUrl: 'https://www.bmw.in/content/dam/bmw/marketIN/bmw_in/all-models/x-series/x5/2023/bmw-x5-overview-msk.jpg',
        category: 'SUV',
        features: ['All-Wheel Drive', 'Leather Seats', 'Panoramic Sunroof']
    },
    {
        _id: '2',
        name: 'BMW 3 Series',
        price: 42000,
        description: 'Iconic sporty sedan with perfect balance of performance and luxury.',
        imageUrl: 'https://www.bmw.in/content/dam/bmw/marketIN/bmw_in/all-models/3-series/sedan/2022/bmw-3-series-sedan-overview.jpg',
        category: 'Sedan',
        features: ['Sport Mode', 'Apple CarPlay', 'Driver Assistance']
    },
    {
        _id: '3',
        name: 'BMW M4 Competition',
        price: 85000,
        description: 'High-performance coupe with aggressive styling and track-ready capabilities.',
        imageUrl: 'https://www.bmw.in/content/dam/bmw/marketIN/bmw_in/all-models/m-series/m4-coupe/2021/bmw-m4-coupe-overview.jpg',
        category: 'Coupe',
        features: ['TwinPower Turbo', 'M Sport Differential', 'Carbon Fiber Roof']
    },
    {
        _id: '4',
        name: 'BMW iX',
        price: 90000,
        description: 'All-electric SUV with futuristic design and sustainable materials.',
        imageUrl: 'https://www.bmw.in/content/dam/bmw/marketIN/bmw_in/all-models/i-series/ix/2021/bmw-ix-overview.jpg',
        category: 'Electric',
        features: ['Electric Drive', 'Curved Display', 'Fast Charging']
    }
];

// get all cars or search
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let result = cars;

        if (search) {
            const lowerSearch = search.toLowerCase();
            result = cars.filter(car =>
                car.name.toLowerCase().includes(lowerSearch) ||
                car.category.toLowerCase().includes(lowerSearch)
            );
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get single car
router.get('/:id', async (req, res) => {
    try {
        const car = cars.find(c => c._id === req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// create car - admin only (TODO: add auth)
router.post('/', async (req, res) => {
    try {
        const newCar = {
            _id: Date.now().toString(),
            ...req.body
        };
        cars.push(newCar);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// router.delete('/:id', async (req, res) => {
//   // TODO: implement delete
// });

module.exports = router;
