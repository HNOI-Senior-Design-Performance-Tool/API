const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dataSchema = new Schema({
    _id: {
        type: String,
    },
    timestamp: {
        type: String,
    },
    vehicleId: {
        type: String,
    },
    obd: {
        type: Object,
    },
    misc: {
        type: Object,
    }
});

const sampleSchema = new Schema({
    _id: {
        type: String,
    },
    timestamp: {
        type: String,
    },
    vehicleId: {
        type: String,
    },
    obd: {
        type: Object,
    },
    misc: {
        type: Object,
    }
});

mongoose.model('data', dataSchema)
mongoose.model('sample', sampleSchema)
