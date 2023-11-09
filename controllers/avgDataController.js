const { VehicleData, AvgData } = require('../models/vehicleDataModel');
const mongoose = require('mongoose')

// Get all avg data from DB
const getAvgData = async (req, res) => {
    const vehicleData = await AvgData.find({}).sort({createdAt: -1})

    res.status(200).json(vehicleData) 
}

module.exports = {
    getAvgData,
}