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

tokenauthSchema.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 300 } )

const Tokenauth  = mongoose.model('Tokenauth', tokenauthSchema);

module.exports = { Tokenauth }