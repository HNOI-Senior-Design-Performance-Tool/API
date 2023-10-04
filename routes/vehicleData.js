const express = require('express')
const {
    uploadVehicleData,
    getAllData,
    getDataPoint,
    getTimedData,
    getLatestDataPoint,
    getNLatestData
} = require('../controllers/vehicleDataController')
const VehicleData = require('../models/vehicleDataModel')

const router = express.Router()

// Upload data
router.post('/uploadData', uploadVehicleData)

// Get all data
router.get('/data', getAllData)

// Get sorted data by time
router.get('/getTimedData/:time', getTimedData)

// Get latest data point
router.get('/latestData', getLatestDataPoint)

// Get N latest data points
router.get('/latestData/:N', getNLatestData)

// Get a single specific data
router.get('/data/:id', getDataPoint)

// Delete data
router.delete('/data/:id', (req, res) => {
    res.json({msg: "DELETE DATA"})
})

// Update a single data
router.patch('/data/:id', (req, res) => {
    res.json({msg: "UPDATE SPECIFIC DATA"})
})

module.exports = router