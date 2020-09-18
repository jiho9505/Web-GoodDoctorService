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
    }
})

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = { Hospital }