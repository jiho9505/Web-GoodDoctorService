const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   postId: {
       type: Schema.Types.ObjectId,
       ref: 'Board'
   }

}, { timestamps: true })


const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }

{/*
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
*/}