const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    const { id } = req.params;
    const concert = db.concerts.find((item) => item.id.toString() === id);
    if(concert) {
        res.json(concert);
    } else {
        res.status(404).json({ message: 'Concert not found'});
    }
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image} = req.body;
    if (performer && genre && price && day && image) {
        const newConcert = {
            id: uuidv4(),
            performer,
            genre,
            price,
            day,
            image,
        };
        db.concerts.push(newConcert);
        res.json({ message: 'OK'});
    } else {
        res.status(400).json({ message: 'Bad Request - all fields required' });
    }
});

router.route('/concerts/:id').put((req, res) => {
    const { id } = req.params;
    const { performer, genre, price, day, image } = req.body;

    const concertIndex = db.concerts.findIndex((item) => item.id.toString() === id);

    if(concertIndex !== -1 && performer && genre && price && day && image) {
        db.concerts[concertIndex] = { ...db.concerts[concertIndex], performer, genre, price, day, image};
        res.json({ message: 'OK' })
    } else {
        res.status(404).json({ message: 'Concert not found or missing data'});
    }
});

router.route('/concerts/:id').delete((req, res) => {
    const { id } = req.params;
    const concertIndex = db.concerts.findIndex((item) => item.id.toString() === id);

    if(concertIndex !== -1) {
        db.concerts.splice(concertIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Concert not found' });
    }
});


module.exports = router;