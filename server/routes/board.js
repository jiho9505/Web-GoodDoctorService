const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const multer = require('multer');
const { Board } = require("../models/Board");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storeImages/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        
        return res.json({ success: true, filePath: res.req.file.path })
    })

})

router.post('/', (req, res) => {

    var board = new Board(req.body)

    board.save((err,doc) => {
        if(err) return res.status(400).json({ success: false ,err })
        return res.status(200).json({ success: true, doc})
    })
})

router.get('/', (req, res) => {
    var postId = req.query.id
    var body = {}

    if(postId){
        body._id = postId
    }

    Board.find(body)
         .populate('writer')
         .sort( { createdAt: -1 } )
         .exec((err,result)=>{
             
             if(err)  return res.json({ success: false ,err })
             if(result.length === 0) return res.json({ success: false })
             return res.status(200).json({ success: true, result })
         })
    })






module.exports = router;