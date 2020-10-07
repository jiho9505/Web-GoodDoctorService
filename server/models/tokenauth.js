const mongoose = require('mongoose');

const tokenauthSchema = mongoose.Schema({
    token: {
        type:String
    },
    userId: {
        type:String
    }
    
},{ timestamps : true})

tokenauthSchema.index({createdAt: 1},{expireAfterSeconds: 360});

const Tokenauth  = mongoose.model('Tokenauth', tokenauthSchema);

module.exports = { Tokenauth }