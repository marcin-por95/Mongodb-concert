const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

const testimonialsRouter = require('./routes/testimonials.routes');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', testimonialsRouter);
app.use('/api', concertsRouter);
app.use('/api', seatsRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
