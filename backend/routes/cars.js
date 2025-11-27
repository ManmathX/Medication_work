const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// get all cars or serach
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            // case insensative search
            query = { name: { $regex: search, $options: 'i' } };
        }
        const cars = await Car.find(query);
        // console.log('Found cars:', cars.length); // debug
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get single car
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// create car - admin only (TODO: add auth)
router.post('/', async (req, res) => {
    try {
        const car = new Car(req.body);
        const newCar = await car.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// router.delete('/:id', async (req, res) => {
//   // TODO: implement delete
// });

module.exports = router;
