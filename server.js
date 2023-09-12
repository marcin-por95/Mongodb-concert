const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...');
});

const io = socket(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    next();
})
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

const dbUrl = `mongodb+srv://marcinporeba1995:${process.env.MONGODB_PASSWORD}@cluster0.wd5x7bf.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

db.once('open', () => {
    console.log('Connected to database')
})

db.on('error', err => console.log('Error' + err))

io.on('connection', (socket) =>{
    console.log('User connected');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});