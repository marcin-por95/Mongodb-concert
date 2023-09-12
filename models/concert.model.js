const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    id: { type: String, required: true },
    performer: {type: String, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
    day: {type: Number, required: true},
    Image: {type: String, required: true}
});

module.exports = mongoose.model('Concert', concertSchema);