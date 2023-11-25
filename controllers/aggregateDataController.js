const { VehicleData, AvgData, SumData } = require("../models/vehicleDataModel");
const mongoose = require('mongoose')

// Get all avg data from DB
const getAvgData = async (req, res) => {
    const vehicleData = await AvgData.find({}).sort({ createdAt: -1 });

    res.status(200).json(vehicleData) 
}

// get all sum data from DB
const getSumData = async (req, res) => {
    const vehicleData = await SumData.find({}).sort({ createdAt: -1 });

    res.status(200).json(vehicleData)
}

// Function for aggregating the existing timeseries data into a summation and average
const aggregateData = async (req, res) => {
  // get the latest datapoint from vehicleData
  const latestData = await VehicleData.findOne({}).sort({ createdAt: -1 });
  // the aggregate data will include data up to the latest datapoint
  const latestTime = latestData.time;

  // get all the vehicle data from the database
  const vehicleData = await VehicleData.find({}).sort({ createdAt: 1 });

  // Check if there is any data in the database
  if (!vehicleData || vehicleData.length === 0) {
    return res.status(404).json({ error: "No data within the range" });
  }

  // get the existing average data from the database
  const existingAvgData = await AvgData.findOne().sort({ createdAt: 1 });
  const existingSumData = await SumData.findOne().sort({ createdAt: 1 });

  if (existingAvgData && existingSumData) {
    // if aggreggate data exists, then the start time comes from the existing data
    startTime = existingSumData.startTime;

    // Get the current running sum from sumData
    var sum = {
      mpg: existingSumData.mpg,
      mpgCount: existingSumData.mpgCount,

      CO: existingSumData.CO,
      COCount: existingSumData.COCount,

      NOx: existingSumData.NOx,
      NOxCount: existingSumData.NOxCount,

      particulateMatter: existingSumData.particulateMatter,
      particulateMatterCount: existingSumData.particulateMatterCount,
    };


  }
  else {
    // clear the aggregate data in case only one of the documents is empty
    await AvgData.deleteMany({});
    await SumData.deleteMany({});

    // if AvgData is not empty, then the start time comes from the first data point in vehicleData
    startTime = vehicleData[0].createdAt;
    
    // Initialize objects to store the sum of each field and count of data points
    var sum = {
      mpg: 0,
      mpgCount: 0,

      CO: 0,
      COCount: 0,

      NOx: 0,
      NOxCount: 0,

      particulateMatter: 0,
      particulateMatterCount: 0,
    };
  }



  // Calculate the sum of each field and count of data points
  vehicleData.forEach((dataPoint) => {
    // Check if the field is valid first
    if (dataPoint.mpg !== undefined) {
        sum.mpg += dataPoint.mpg;
        sum.mpgCount++;
    }
    if (dataPoint.CO !== undefined) {
        sum.CO += dataPoint.CO;
        sum.COCount++;
    }
    if (dataPoint.NOx !== undefined) {
        sum.NOx += dataPoint.NOx;
        sum.NOxCount++;
    }
    if (dataPoint.particulateMatter !== undefined) {
        sum.particulateMatter += dataPoint.particulateMatter;
        sum.particulateMatterCount++;
    }
  });

  // Calculate the average of each field
  const average = {};
  for (const [key, value] of Object.entries(sum)) {

    // if the field is a count, skip it
    if (key.includes("Count")) {
        average[key] = value;
        continue;
    }

    const count = sum[`${key}Count`];

    // if there is no data, set the average to -1
    if ( count === 0) {
      average[key] = -1;
      continue;
    }

    // calculate the average
    average[key] = value / count;

  }

  sum.startTime = startTime;
  sum.endTime = latestTime;
  sum.time = new Date();

  average.startTime = startTime;
  average.endTime = latestTime;
  average.time = new Date(); 

  if (existingSumData) {
    // If a document exists, update it
    await SumData.updateOne(
        {},
        sum
    );
  } else {
    // If no document exists, create a new one
    const sumData = await SumData.create(
        sum
    );
  }

  if (existingAvgData) {
    // If a document exists, update it
    await AvgData.updateOne(
        {},
        average
    );
  } else {
    // If no document exists, create a new one
    const averageData = await AvgData.create(
        average
    );
  }

  res.status(200).json( {average, sum} );
  console.log("Data Aggregated Successfully");
}

module.exports = {
    getAvgData,
    getSumData,
    aggregateData
}