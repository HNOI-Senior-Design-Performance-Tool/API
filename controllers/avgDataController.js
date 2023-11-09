const { VehicleData, AvgData } = require('../models/vehicleDataModel');
const mongoose = require('mongoose')

// Get all avg data from DB
const getAvgData = async (req, res) => {
    const vehicleData = await AvgData.find({}).sort({createdAt: -1})

    res.status(200).json(vehicleData) 
}

// Get a single specific data
const getAvgDataPoint = async (req, res) => {
    const { id }  = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    const vehicleData = await AvgData.findById(id)

    if (!vehicleData) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    res.status(200).json(vehicleData)
}

// Delete data---------------
const deleteAvgDataPoint = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    const vehicleData = await AvgData.findOneAndDelete({_id: id})

    if(!vehicleData) {
        return res.status(400).json({error: 'Specified data not found'})
    }

    res.status(200).json(vehicleData)
}

// Update a single data
const updateAvgDataPoint = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    const vehicleData = await AvgData.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!vehicleData) {
        return res.status(400).json({error: 'Specified data not found'})
    }

    res.status(200).json(vehicleData)
}

// Delete all data
const deleteAllAvgData = async (req, res) => {
    try {
        const vehicleData = await AvgData.deleteMany({});
        res.status(200).json({ message: `${vehicleData.deletedCount} data points deleted` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data' });
    }
}

module.exports = {
    getAvgData,
    getAvgDataPoint,
    updateAvgDataPoint,
    deleteAvgDataPoint,
    deleteAllAvgData,
}