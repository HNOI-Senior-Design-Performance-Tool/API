const express = require('express')
const VehicleData = require('../models/vehicleDataModel')

const router = express.Router()

// Upload data
router.post('/uploadData', (req, res) => {
    const {vehicleName, mpg, CO, NOx, fuelLevel, voltage, time} = req.body

    res.json({msg: "POST DATA"})
})

// Get all data
router.get('/getData', (req, res) => {
    res.json({msg: "GET ALL DATA"})
})

// Get sorted data
router.get('/getSortedData', (req, res) => {
    res.json({msg: "GET SORTED DATA"})
})

// Get a single specific data
router.get('/getData/:id', (req, res) => {
    res.json({msg: "GET SPECIFIC DATA"})
})

// Delete data
router.delete('/deleteData/:id', (req, res) => {
    res.json({msg: "DELETE DATA"})
})

// Update a single data
router.patch('/updateData/:id', (req, res) => {
    res.json({msg: "UPDATE SPECIFIC DATA"})
})

module.exports = router