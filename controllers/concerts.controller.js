const Concert = require('../models/concert.model')


exports.getAll = async (req, res) => {
    try {
       res.json(await Concert.find());
    } catch (err) {
        res.status(500).json({message: err});
    }
};


exports.getConById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if (!con) res.status(404).json({message: 'Not found'});
        else res.json(con);
    } catch (err) {
        res.status(500).json({message: err});
    }
    ;
};

exports.addCon = async (req, res) => {
    try {
        const {performer, genre, price, day, image} = req.body;
        const sanitizedPerformer = sanitize(performer);
        const sanitizedGenre = sanitize(genre);
        const sanitizedPrice = sanitize(price);
        const sanitizedDay = sanitize(day);
        const sanitizedImage = sanitize(image);

        const newConcert = new Concert({
            performer: sanitizedPerformer,
            genre: sanitizedGenre,
            price: sanitizedPrice,
            day: sanitizedDay,
            image: sanitizedImage
        });

        await newConcert.save();
        res.json(await Concert.find());
    } catch (err) {
        res.status(500).json({message: err});
    }
    ;
};

exports.editCon = async (req, res) => {
    const {performer, genre, price, day, image} = req.body;
    try {
        const con = await Concert.findById(req.params.id);
        if (con) {
            await Concert.updateOne({_id: req.params.id}, {
                $set: {
                    performer: performer,
                    genre: genre,
                    price: price,
                    day: day,
                    image: image
                }
            });
            res.json(con);
        } else res.status(404).json({message: 'Not found...'});
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.delete = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if (con) {
            con.remove()
            res.json(await Concert.find())
        } else res.status(404).json({message: 'NotFound...'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.getConByPerformer = async (req, res) => {
    try {
        const performer = req.params.performer;
        const concerts = await Concert.find({performer});
        res.json(concerts);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getConByGenre = async (req, res) => {
    try {
        const genre = req.params.genre;
        const concerts = await Concert.find({genre});
        res.json(concerts);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getConByPriceRange = async (req, res) => {
    try {
        const {price_min, price_max} = req.params;
        const concerts = await Concert.find({
            price: {$gte: parseFloat(price_min), $lte: parseFloat(price_max)}
        });
        res.json(concerts);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getConByDay = async (req, res) => {
    try {
        const day = req.params.day;
        const concerts = await Concert.find({day});
        res.json(concerts);
    } catch (err) {
        res.status(500).json({message: err});
    }
};