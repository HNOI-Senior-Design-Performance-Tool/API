const { VehicleData, AvgData, SumData } = require("../models/vehicleDataModel");
const mongoose = require('mongoose')

// Get all avg data from DB
const getAvgData = async (req, res) => {
    const vehicleData = await AvgData.find({}).sort({ createdAt: -1 });

    res.status(200).json(vehicleData[0]) 
}

// get all sum data from DB
const getSumData = async (req, res) => {
    const vehicleData = await SumData.find({}).sort({ createdAt: -1 });

    res.status(200).json(vehicleData[0])
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

  // Keep a list of each vehicleID with changes to aggregated data
  let vehicleIDs = [];

  // Iterate through each data point in vehicleData
  await Promise.all(
    vehicleData.sort((a, b) => a.time - b.time).map(async (dataPoint) => {

      // list of fields to aggregate
      const fields = ["mpg", "CO", "NOx", "particulateMatter"];

      // object with increment values for each field
      const inc = {};
      fields.forEach((field) => {
        if (dataPoint[field] !== undefined) {
          inc[field] = dataPoint[field];
          inc[`${field}Count`] = 1;
        }
      });

      // add the vehicleID to the list of vehicleIDs if it is not already there
      if (!vehicleIDs.includes(dataPoint.vehicleID)) {
        vehicleIDs.push(dataPoint.vehicleID);
      }

      // get the start time for the vehicleID
      const startTime = await SumData.findOne({ vehicleID: dataPoint.vehicleID })
        .sort({ createdAt: -1 })
        .then((sumData) => {
          if (sumData) {
            return sumData.startTime;
          } else {
            // if there is no sum data for the vehicleID, set the start time to the current time
            return dataPoint.time;
          }
        });

      updatedData = await SumData.findOneAndUpdate(
        { vehicleID: dataPoint.vehicleID }, // Filter: match the document with the same vehicleID
        {
          $set: {
            startTime: startTime,
            endTime: dataPoint.time, // Update: set the endTime field to the current time
          },
          $inc: inc, // Update: increment the sum and count fields
          $currentDate: {
            // Update: set the updatedAt field to the current time
            updatedAt: { $type: "timestamp" },
          },
        },
        {
          upsert: true, // Options: create a new document if no document matches the filter
          new: true, // Options: return the updated document
        }
      );

    })
  );

  // Update averages
  // Iterate through each vehicleID
  await Promise.all(
    vehicleIDs.map(async (vehicleID) => {
      // Get the sum data for the vehicleID
      const sumData = await SumData.findOne({ vehicleID });

      // Create an object for the average data
      const avgData = {
        vehicleID: vehicleID,
      };

      // list of fields to average
      const fields = ["mpg", "CO", "NOx", "particulateMatter"];

      // Iterate through each field
      fields.forEach((field) => {
        // Calculate the average
        avgData[field] = sumData[field] / sumData[`${field}Count`];
      });

      // Update the average data for the vehicleID
      await AvgData.updateOne(
        { vehicleID: vehicleID }, // Filter: match the document with the same vehicleID
        avgData, // Update: set the average data
        { upsert: true } // Options: create a new document if it does not exist
      );
    })
  );

  res.status(200).json({ message: "Data Aggregated Successfully" });
  console.log("Data Aggregated Successfully");
}

module.exports = {
    getAvgData,
    getSumData,
    aggregateData
}