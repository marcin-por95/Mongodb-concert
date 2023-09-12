const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/NewWaveDB';
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
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', testimonialsRouter);
app.use('/api', concertsRouter);
app.use('/api', seatsRouter);
app.use(express.static(path.join(__dirname, '/client/build')));
app.use((req, res) => {
    res.status(404).json({message: 'Not found...'});
});

app.use((err, req, res) => {
    console.log(err);
    console.log('test');
    res.status(err.status || 500).json();
});

mongoose.set("debug", (collectionName, method, query, doc) => {
    console.log(`ERROR ${collectionName}.${method}`, JSON.stringify(query), doc);
});

mongoose.connect('mongodb+srv://marcinporeba1995:yjf10D2eJ9m6pwef@cluster0.jsugvbv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true  });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


/* ENDPOINTS  */


app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});