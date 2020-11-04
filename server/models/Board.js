const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    chooseBoard: {
        type: Number,
        default: 0
    },
    view: {
        type: Number,
        default: 0
    },
    description : {
        type: String
    },
    like : {
        type: Number,
        default: 0
    },
    images : {
        type: Array,
        default: []
    },
    commentCount : {
        type: Number,
        default: 0
    }
},{ timestamps : true })


boardSchema.index({ 
    title:'text',
    description: 'text',

}, {
    weights: {
        title: 3,
        description: 2,
    }
})

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board }
