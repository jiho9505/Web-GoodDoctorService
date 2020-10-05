const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   postId: {
       type: Schema.Types.ObjectId,
       ref: 'Board'
   },
   commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'  
   },
   contents: {
       type: String
   }

}, { timestamps: true })


const Alert = mongoose.model('Alert', alertSchema);

module.exports = { Alert }