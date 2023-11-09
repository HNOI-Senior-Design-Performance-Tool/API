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

const avgDataSchema = new Schema({
    startRange: Date,
    endRange: Date,
    mpg: Number,
    CO: Number,
    NOx: Number,
    particulateMatter: Number,
    fuelLevel: Number,
    flowrate: Number,
    time: Date,
}, { timestamps: true })

const VehicleData = mongoose.model('VehicleData', vehicleDataSchema)
const AvgData = mongoose.model('AvgData', avgDataSchema)

module.exports = {
    VehicleData,
    AvgData,
}