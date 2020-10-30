const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alarmSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   postId: {
       type: Schema.Types.ObjectId,
       ref: 'Board'
   },
   toWhom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    choice: {
        type: Boolean,
        default : 0
    }

}, { timestamps: true })


const Alarm = mongoose.model('Alarm', alarmSchema);

module.exports = { Alarm }