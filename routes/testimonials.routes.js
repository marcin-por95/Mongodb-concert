const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller.js')


router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/random', TestimonialController.getRandom);

router.get('/testimonials/:id', TestimonialController.getTesById);

router.post('/testimonials', TestimonialController.addTes);

router.put('/testimonials/:id', TestimonialController.editTes);

router.delete('/testimonials/:id', TestimonialController.delete);

module.exports = router;