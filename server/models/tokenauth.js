const mongoose = require('mongoose');

const tokenauthSchema = mongoose.Schema({
    token: {
        type:String
    },
    userId: {
        type:String
    },
    ttl: {
        type:Number
    }
    
},{ timestamps : true})


const Tokenauth  = mongoose.model('Tokenauth', tokenauthSchema);

module.exports = { Tokenauth }