const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller')

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getSeatById);

router.post('/seats', SeatController.addSeat);

router.put('/seats/:id', SeatController.editSeat);

router.delete('/seats/:id', SeatController.delete);

module.exports = router;