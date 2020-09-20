const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Board } = require("../models/board");

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

    Board.find()
         .populate('writer')
         .exec((err,result)=>{
             if(err)  return res.status(400).json({ success: false ,err })
             return res.status(200).json({ success: true, result })
         })
    })






module.exports = router;