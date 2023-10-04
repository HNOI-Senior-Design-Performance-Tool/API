const VehicleData = require('../models/vehicleDataModel')

// Upload data
const uploadVehicleData = async (req, res) => {
    const {vehicleName, mpg, CO, NOx, fuelLevel, voltage, time} = req.body

    // Add data to DB
    try {
        const vehicleData = await VehicleData.create({vehicleName, mpg, CO, NOx, fuelLevel, voltage, time})
        res.status(200).json(vehicleData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Get all data
const getAllData = async (req, res) => {
    const vehicleData = await VehicleData.find({}).sort({createdAt: -1})

    res.status(200).json(vehicleData) 
}

// Get latest single data point
const getLatestDataPoint = async (req, res) => {
    const vehicleData = await VehicleData.findOne({}).sort({createdAt: -1})

    res.status(200).json(vehicleData)
}

// Get N latest data points
const getNLatestData = async (req, res) => {
    const { N } = req.params

    const vehicleData = await VehicleData.find({}).sort({createdAt: -1}).limit(parseInt(N))

    if (!vehicleData || vehicleData.length == 0) {
        return res.status(404).json({error: 'Specified data not found'}) 
    }

    res.status(200).json(vehicleData)
}

// Get sorted data by time
const getTimedData = async (req, res) => {
    const { time } = req.params

    const vehicleData = await VehicleData.findOne({ time: new Date(time)})

    if (!vehicleData) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    res.status(200).json(vehicleData)
}


// Get a single specific data
const getDataPoint = async (req, res) => {
    const { id }  = req.params

    const vehicleData = await VehicleData.findById(id)

    if (!vehicleData) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    res.status(200).json(vehicleData)
}

// Delete data


// Update a single data


module.exports = {
    uploadVehicleData,
    getAllData,
    getDataPoint,
    getTimedData,
    getLatestDataPoint,
    getNLatestData
}