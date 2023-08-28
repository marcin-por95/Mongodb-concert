const express = require('express');
const {v4: uuidv4} = require('uuid');
const {join} = require("path");
const app = express();
const db = require('./db');

app.use(express.static(join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/testimonials', (req, res) => {
    res.json(db);
});
app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.length);
    const randomTestimonial = db[randomIndex];
    res.json(randomTestimonial);
});
app.get('/testimonials/:id', (req, res) => {
    const {id} = req.params;
    const testimonial = db.find((item) => item.id.toString() === id);
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({message: 'Testimonial not found'});
    }
});
app.post('/testimonials', (req, res) => {
    const {author, text} = req.body;
    if (author && text) {
        const newTestimonial = {
            id: uuidv4(),
            author,
            text,
        };
        db.push(newTestimonial);
        res.json({message: 'OK'});
    } else {
        res.status(400).json({message: 'Author and text are required'});
    }
});
app.put('/testimonials/:id', (req, res) => {
    const {id} = req.params;
    const {author, text} = req.body;

    const testimonialIndex = db.findIndex((item) => item.id.toString() === id);

    if (testimonialIndex !== -1 && author && text) {
        db[testimonialIndex] = {...db[testimonialIndex], author, text};
        res.json({message: 'OK'});
    } else {
        res.status(404).json({message: 'Testimonial not found or missing author and/or text'});
    }
});
app.delete('/testimonials/:id', (req, res) => {
    const {id} = req.params;
    const testimonialIndex = db.findIndex((item) => item.id.toString() === id);

    if (testimonialIndex !== -1) {
        db.splice(testimonialIndex, 1);
        res.json({message: 'OK'});
    } else {
        res.status(404).json({message: ' not found'});
    }
});
app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});