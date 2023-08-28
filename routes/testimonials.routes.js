const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// GET /testimonials
router.get('/', (req, res) => {
    res.json(db.testimonials);
});

// GET /testimonials/random
router.get('/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const randomTestimonial = db.testimonials[randomIndex];
    res.json(randomTestimonial);
});

// GET /testimonials/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const testimonial = db.testimonials.find((item) => item.id.toString() === id);
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

// POST /testimonials
router.post('/', (req, res) => {
    const { author, text } = req.body;
    if (author && text) {
        const newTestimonial = {
            id: uuidv4(),
            author,
            text,
        };
        db.testimonials.push(newTestimonial);
        res.json({ message: 'OK' });
    } else {
        res.status(400).json({ message: 'Bad Request - Author and text are required' });
    }
});

// PUT /testimonials/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { author, text } = req.body;

    const testimonialIndex = db.testimonials.findIndex((item) => item.id.toString() === id);

    if (testimonialIndex !== -1 && author && text) {
        db.testimonials[testimonialIndex] = { ...db.testimonials[testimonialIndex], author, text };
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found or missing author and/or text' });
    }
});

// DELETE /testimonials/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const testimonialIndex = db.testimonials.findIndex((item) => item.id.toString() === id);

    if (testimonialIndex !== -1) {
        db.testimonials.splice(testimonialIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

module.exports = router;