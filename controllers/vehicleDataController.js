const VehicleData = require('../models/vehicleDataModel')
const mongoose = require('mongoose')
const fs = require('fs'); // Require the 'fs' module to work with files

// Upload data
const uploadVehicleData = async (req, res) => {
    const {vehicleName, mpg, CO, NOx, particulateMatter, fuelLevel, voltage, time} = req.body

    // Add data to DB
    try {
        const vehicleData = await VehicleData.create({vehicleName, 
            mpg, 
            CO, 
            NOx, 
            particulateMatter, 
            fuelLevel, 
            voltage, 
            time,
        })
        res.status(200).json(vehicleData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Upload data via file 
const uploadVehicleDataFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({error: 'No file upload'})
        }
        const fileData = req.file.buffer.toString(); // Assuming the uploaded file is in binary form

        // Parse the JSON data from the file
        const jsonData = JSON.parse(fileData)

        // Assuming the JSON data in the file has the same structure as before
        const { vehicleName, mpg, CO, NOx, particulateMatter, fuelLevel, voltage, time } = jsonData

        // Add data to DB
        const vehicleData = await VehicleData.create({
            vehicleName,
            mpg,
            CO,
            NOx,
            particulateMatter,
            fuelLevel,
            voltage,
            time,
        })

        res.status(200).json(vehicleData)
    } catch (error) {
        res.status(400).json({ error: error.message })
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    const vehicleData = await VehicleData.findById(id)

    if (!vehicleData) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    res.status(200).json(vehicleData)
}

// Delete data
const deleteDataPoint = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    const vehicleData = await VehicleData.findOneAndDelete({_id: id})

    if(!vehicleData) {
        return res.status(400).json({error: 'Specified data not found'})
    }

    res.status(200).json(vehicleData)
}

// Update a single data
const updateDataPoint = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    const vehicleData = await VehicleData.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!vehicleData) {
        return res.status(400).json({error: 'Specified data not found'})
    }

    res.status(200).json(vehicleData)
}

// Delete all data
const deleteAllData = async (req, res) => {
    try {
        const vehicleData = await VehicleData.deleteMany({});
        res.status(200).json({ message: `${vehicleData.deletedCount} data points deleted` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data' });
    }
}

module.exports = {
    uploadVehicleData,
    getAllData,
    getDataPoint,
    getTimedData,
    getLatestDataPoint,
    getNLatestData,
    deleteDataPoint,
    updateDataPoint,
    deleteAllData,
}