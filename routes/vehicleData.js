const express = require('express')
const multer = require('multer');
const {
    uploadVehicleData,
    getAllData,
    getDataPoint,
    getTimedData,
    getLatestDataPoint,
    getNLatestData,
    deleteDataPoint,
    updateDataPoint,
    deleteAllData,
} = require('../controllers/vehicleDataController')
const VehicleData = require('../models/vehicleDataModel')

const router = express.Router()
const upload = multer(); // Initialize multer

// Upload data
router.post('/uploadData', uploadVehicleData)

// Upload data via file upload
router.post('/uploadData', upload.single('jsonFile'), uploadVehicleData);

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
router.delete('/data/:id', deleteDataPoint)

// Update a single data
router.patch('/data/:id', updateDataPoint)

// Delete all data
router.delete('/data' , deleteAllData)

module.exports = router