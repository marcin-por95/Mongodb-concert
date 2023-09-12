const Seat = require('../models/seat.model')

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch (err) {
        res.status(500).json({ message: err});
    };
};

exports.getSeatById = async (req, res) => {
    try {
        const s = await Seat.findById(req.params.id);
        if(!s) res.status(404).json({ message: 'Not found' });
        else res.json(s);
    }
    catch(err) {
        res.status(500).json({ message: err });
    };
};

exports.addSeat = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const seatCheck = await Seat.exists({ day, seat});
        if(seatCheck) {
            res.status(409).json({ message: "The slot is already taken..." })
        }
        else {
            const newSeat = new Seat({ day: day, seat: seat, client: client, email: email});
            await newSeat.save();
            const allSeats = await Seat.find()
            req.io.emit('seatsUpdated', allSeats)
            res.json(newSeat);
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    };
};

exports.editSeat = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
        const s = await Seat.findById(req.params.id);
        if(s) {
            await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email}});
            res.json(s);
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const s = await Seat.findById(req.params.id);
        if(s) {
            s.remove()
            res.json(await Seat.find())
        }
        else res.status(404).json({ message: 'NotFound...' })
    }
    catch(err) {
        res.status(500).json({ message: err })
    }
};