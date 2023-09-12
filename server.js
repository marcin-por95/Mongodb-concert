const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const testimonialsRouter = require('./routes/testimonials.routes');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});
const io = socket(server);

app.use((req, res, next) => {
    req.io = io;
    next();
});

io.on('connection', (socket) => {
    console.log('New socket connected:', socket.id);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const dbUrl = 'mongodb://localhost:27017/NewWaveDB';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

/* ENDPOINTS  */

app.use('/api/testimonials', testimonialsRouter);
app.use('/api/concerts', concertsRouter);
app.use('/api/seats', seatsRouter);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});
