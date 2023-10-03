const express = require('express')
const VehicleData = require('../models/vehicleDataModel')

const router = express.Router()

// Upload data
router.post('/uploadData', async (req, res) => {
    const {vehicleName, mpg, CO, NOx, fuelLevel, voltage, time} = req.body

    // Add data to DB
    try {
        const vehicleData = await VehicleData.create({vehicleName, mpg, CO, NOx, fuelLevel, voltage, time})
        res.status(200).json(vehicleData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// Get all data
router.get('/data', (req, res) => {
    res.json({msg: "GET ALL DATA"})
})

// Get sorted data
router.get('/getSortedData', (req, res) => {
    res.json({msg: "GET SORTED DATA"})
})

// Get a single specific data
router.get('/data/:id', (req, res) => {
    res.json({msg: "GET SPECIFIC DATA"})
})

// Delete data
router.delete('/data/:id', (req, res) => {
    res.json({msg: "DELETE DATA"})
})

// Update a single data
router.patch('/data/:id', (req, res) => {
    res.json({msg: "UPDATE SPECIFIC DATA"})
})

module.exports = router