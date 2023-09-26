const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller.js');
const mongoSanitize = require('mongo-sanitize');
// Middleware do oczyszczania danych wejściowych
router.use((req, res, next) => {
    // Oczyszczanie danych wejściowych
    req.body = mongoSanitize.sanitize(req.body);
    req.params = mongoSanitize.sanitize(req.params);
    req.query = mongoSanitize.sanitize(req.query);
    next();
});

// Definicje endpointów

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getConById);
router.post('/concerts', ConcertController.addCon);
router.put('/concerts/:id', ConcertController.editCon);
router.delete('/concerts/:id', ConcertController.delete);

// SEARCHING ENDPOINTS
router.get('/concerts/performer/:performer', ConcertController.getConByPerformer);
router.get('/concerts/genre/:genre', ConcertController.getConByGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getConByPriceRange);
router.get('/concerts/day/:day', ConcertController.getConByDay);

module.exports = router;
