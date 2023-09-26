const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    concertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concert',
    },
});

const Workshop = mongoose.model('Workshop', workshopSchema);

module.exports = Workshop;
