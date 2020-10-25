const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    name: {
        type:String
    },
    doctor: {
        type: String
    },
    location: {
        type: String
    },
    part: {
        type: String
    },
    description : {
        type: String
    },
    cafe : {
        type: String,
    },
    cafeName : {
        type: String,
    },
    lat :{
        type: Number
    },
    lng :{
        type: Number
    }
    
})

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = { Hospital }