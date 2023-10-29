const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vehicleDataSchema = new Schema({
    vehicleID: {
        type: String,
        require: false
    },
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

// Uncomment for time series
// const vehicleDataSchema = Schema(
//     {
//       //time: Date,
//       mpg: Number,
//       CO: Number,
//       NOx: Number,
//       particulateMatter: Number,
//       fuelLevel: Number,
//       flowRate: Number,
//       metadata: {
//         vehicleID: String,
//         vehicleName: String,
//       },
//     },
//     {
//       timeseries: {
//         timeField: 'time',
//         metaField: 'metadata',
//         granularity: 'seconds',
//       },
//     }
//   )

//   module.exports = mongoose.model('VehicleData', vehicleDataSchema)