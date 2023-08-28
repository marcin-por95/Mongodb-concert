const express = require('express');
const {v4: uuidv4} = require('uuid');
const {join} = require("path");
const app = express();
const db = require('./db');

const testimonialsRouter = require('./routes/testimonials.routes');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');
//endpoints
app.use('/testimonials', testimonialsRouter);
app.use('/concerts', concertsRouter);
app.use('/seats', seatsRouter);

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res) => {
    res.status(404).json({message: 'Not found...'});
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});