const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dataSchema = new Schema({
    time: {
        type: String,
    }
    //todo add other fields
});

mongoose.model('data', dataSchema)
