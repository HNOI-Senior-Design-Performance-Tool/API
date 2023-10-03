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


// Get sorted data


// Get a single specific data


// Delete data


// Update a single data


