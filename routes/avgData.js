const express = require('express')
const {
    getAvgData,
} = require('../controllers/avgDataController')
const VehicleData = require('../models/vehicleDataModel')

const router = express.Router()

// Get all data
router.get('/data', getAvgData)

module.exports = router