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
/*
const vehicleDataSchema = new Schema({
    vehicleName: {
        type: String,
        require: true
    },
    mpg: {
        type: Number,
        require: true
    },
    CO: {
        type: Number,
        require: true
    },
    NOx: {
        type: Number,
        require: true
    },
    fuelLevel: {
        type: Number,
        require: true
    },
    time: {
        type: Date,
        required: true
    }

}, { timestamps: true })
*/
mongoose.model('data', dataSchema)
mongoose.model('sample', sampleSchema)
//mongoose.model('VehicleData', vehicleDataSchema)
