const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());

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

mongoose.connect('mongodb+srv://marcinporeba1995:N3G1Mt169Q4fG4M5@cluster0.jsugvbv.mongodb.net/NewWaveDB.concerts?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true  });
const db = mongoose.connection;
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

module.exports = server;
