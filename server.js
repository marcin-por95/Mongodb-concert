const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// import routes
const testimonialsRouter = require('./routes/testimonials.routes');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ENDPOINTS  */

app.use('/api', testimonialsRouter);
app.use('/api', concertsRouter);
app.use('/api', seatsRouter);

/* ------------------------------------------------------------ */
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

// Listening to server on port 8000
app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});