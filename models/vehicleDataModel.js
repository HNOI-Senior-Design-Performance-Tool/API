const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
      particulateMatter: {
        type: Number,
        require: true
    },
    fuelLevel: {
        type: Number,
        require: true
    },
    voltage: {
        type: Number,
        require: true
    },
    time: {
        type: Date,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('VehicleData', vehicleDataSchema)