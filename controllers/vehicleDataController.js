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

// Upload Multiple data
const uploadManyVehicleData = async (req, res) => {
    const dataToInsert = req.body;

    if (!Array.isArray(dataToInsert) || dataToInsert.length === 0) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    try {
        const insertedData = [];

        for (const data of dataToInsert) {
            const { vehicleName, mpg, CO, NOx, particulateMatter, fuelLevel, voltage, time } = data;

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
            });

            insertedData.push(vehicleData);
        }

        res.status(200).json(insertedData);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
    const vehicleData = await VehicleData.findOne({}).sort({time: -1})

    if (!vehicleData) {
        return res.status(404).json({error: 'Specified data not found'})
    }

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

// Get sorted data by date/time
const getTimedData = async (req, res) => {
    const { time } = req.params

    const vehicleData = await VehicleData.findOne({ time: new Date(time)})

    if (!vehicleData) {
        return res.status(404).json({error: 'Specified data not found'})
    }

    res.status(200).json(vehicleData)
}

// Get sorted data by a date/time range
const getTimedDataRange = async (req, res) => {
    const { startTime, endTime } = req.params;

    const vehicleData = await VehicleData.find({
        time: {
            $gte: new Date(startTime), // Greater than or equal to startTime
            $lte: new Date(endTime)    // Less than or equal to endTime
        }
    });

    if (!vehicleData || vehicleData.length === 0) {
        return res.status(404).json({ error: 'No data within the range' });
    }

    res.status(200).json(vehicleData);
}

// Get sorted data by a start date/time
const getTimedDataStart = async (req, res) => {
    const { startTime } = req.params;
    const startTimeDate = new Date(startTime);

    if(isNaN(Date.parse(startTimeDate))) {
        return res.status(400).json({ error: 'Invalid date/time' });
    }

    const vehicleData = await VehicleData.find({
      time: {
        $gt: startTimeDate, // Greater than startTime
      },
    });

    if (!vehicleData || vehicleData.length === 0) {
        return res.status(204).json({ message: 'No data within the range' });
    }

    res.status(200).json(vehicleData);
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

// Get latest Fuel Level data point
const getLatestFuelLevelData = async (req, res) => {
    const fuelLevelData = await VehicleData.findOne({}).sort({ time: -1 }).select('fuelLevel');

    if (!fuelLevelData) {
        return res.status(404).json({ error: 'Specified data not found' });
    }

    res.status(200).json(fuelLevelData);
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

// Calculate and post the average data for the current month
const getAverageMonthlyData = async (req, res) => {
    // const currentDate = new Date()
    // const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0)
    // const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59)

    const { startOfMonth, endOfMonth } = req.params

    const vehicleData = await VehicleData.find({
        time: {
            $gte: startOfMonth, 
            $lte: endOfMonth    
        }
    })

    if (!vehicleData || vehicleData.length === 0) {
        return res.status(404).json({ error: 'No data within the range' })
    }

    // Initialize objects to store the sum of each field and count of data points
    const sum = {
        mpg: 0,
        CO: 0,
        NOx: 0,
        particulateMatter: 0,
        fuelLevel: 0,
        flowrate: 0,
    };
    let count = 0

    // Calculate the sum of each field and count of data points
    vehicleData.forEach(dataPoint => {
        sum.mpg += dataPoint.mpg
        sum.CO += dataPoint.CO
        sum.NOx += dataPoint.NOx
        sum.particulateMatter += dataPoint.particulateMatter
        sum.fuelLevel += dataPoint.fuelLevel
        sum.flowrate += dataPoint.flowrate
        count++
    })

    // Calculate the average of each field
    const average = {}
    for (const key of Object.keys(sum)) {
        average[key] = sum[key] / count
    }

    // Create a new document in the database to store the average values
    const averageData = await VehicleData.create({
        mpg: average.mpg,
        CO: average.CO,
        NOx: average.NOx,
        particulateMatter: average.particulateMatter,
        fuelLevel: average.fuelLevel,
        flowrate: average.flowrate,
        time: new Date(),
    })

    res.status(200).json({ averageData })
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
    getTimedDataRange,
    getTimedDataStart,
    uploadManyVehicleData,
    getLatestFuelLevelData,
    getAverageMonthlyData,
}