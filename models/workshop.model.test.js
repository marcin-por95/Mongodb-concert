const { beforeAll } = require('mocha');
const mongoose = require('mongoose');
const Workshop = require('../models/workshop.model');


describe('Workshop Model Tests', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testDatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Should create a new workshop', async () => {
        const newWorkshop = new Workshop({
            name: 'Test Workshop',
            concertId: 'test-concert-id',
        });

        const savedWorkshop = await newWorkshop.save();

        expect(savedWorkshop._id).toBeDefined();
        expect(savedWorkshop.name).toBe('Test Workshop');
        expect(savedWorkshop.concertId).toBe('test-concert-id');
    });

});
