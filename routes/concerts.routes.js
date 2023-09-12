const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller.js')

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getConById);

router.post('/concerts', ConcertController.addCon);

router.put('/concerts/:id', ConcertController.editCon);

router.delete('/concerts/:id', ConcertController.delete);


router.get('/concerts/performer/:performer', ConcertController.getConByPerformer);

router.get('/concerts/genre/:genre', ConcertController.getConByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertController.getConByPriceRange);

router.get('/concerts/day/:day', ConcertController.getConByDay);

module.exports = router;