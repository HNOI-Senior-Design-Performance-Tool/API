const express = require('express')
const {
    getAvgData,
    getAvgDataPoint,
    updateAvgDataPoint,
    deleteAllAvgData,
    deleteAvgDataPoint,
} = require('../controllers/avgDataController')
const VehicleData = require('../models/vehicleDataModel')

const router = express.Router()

// Get all data
router.get('/data', getAvgData)

// Get a single data point
router.get('/data/:id', getAvgDataPoint)

// Update a data point
router.patch('/data/:id', updateAvgDataPoint)

// Delete a data point
router.delete('/data/:id', deleteAvgDataPoint)

// Delete all data
router.delete('/deleteAllAvgData', deleteAllAvgData)

module.exports = router