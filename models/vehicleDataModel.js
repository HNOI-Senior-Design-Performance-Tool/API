const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vehicleDataSchema = new Schema({
    vehicleName: {
        type: String,
        require: false
    },
    mpg: {
        type: Number,
        require: false
    },
    CO: {
        type: Number,
        require: false
    },
    NOx: {
        type: Number,
        require: false
    },
      particulateMatter: {
        type: Number,
        require: false
    },
    fuelLevel: {
        type: Number,
        require: false
    },
    flowrate: {  // Flowrate of hydrogen Units: L/min
        type: Number,
        require: true
    },
    time: {
        type: Date,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('VehicleData', vehicleDataSchema)