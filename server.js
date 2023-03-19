const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
require('./data.models');
const mongodb = require("mongodb");
const Data = mongoose.model('data');

// Start DB -> mongod --config /usr/local/etc/mongod.conf --fork
//       OR -> brew services start mongodb-community@6.0
// Interact with DB manually -> mongosh

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect to DB instance
mongoose.connect('mongodb://localhost:27017/HNO');
mongoose.connection.on('error', console.error.bind(console, 'HNO Database Connection Error:'));
mongoose.connection.once('connected', () => {console.log('HNO Database Connected')});

app.post('/newData',  function (req, res) {
    //PATH TO HANDLE NEW DATA

    //get data from request
    const data = {
        time: req.body.time,
    }

    //create schema instance
    const newData = new Data({
        time: data.time,
    });

    //save to DB
    Data.insertMany(newData).then((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data saved to DB")
        }
    });
});

app.get('/getData', function (req, res) {
    //PATH TO GET DATA

    //todo handle in descending order (if we can't get it from cartwin, then we can offer data from hardware... failing that offer predefined data based off HNO findings.);
    // - data from cartwin,
    // - data from Hardware team,
    // - data from assumptions

    Data.find().then((data) => {
        if (data != null) {
            res.json({
                data: data,
            });
        }else{
            res.status(401).json({
                message: 'No data found',
            });
        }
    });
});

//todo create other paths to offer different data/functionality
// i.e. app.post('/getDataForGraph') ...

app.listen(8080, () => console.log('API is running on http://localhost:8080/'))

