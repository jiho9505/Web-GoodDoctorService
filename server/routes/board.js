const express = require('express');
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

router.post('/view', (req, res) => {

    var postId = req.body._id
    var body = {
        _id : postId
    }

        Board.findOneAndUpdate(body,{ $inc: { "view": 1 } },
            (err,result)=> {
                if(err)  return res.json({ success: false ,err })
                return res.status(200).json({ success: true, result })

})
})



router.get('/', (req, res) => {
    var postId = req.query.id
    var body = {}
    var term = req.query.term
   
    if(postId){
        body._id = postId
    }
    if(term){
            Board.find()
            .find({ $text: { $search: term } })
            .populate('writer')
            .sort( { createdAt: -1 } )
            .exec((err,result)=>{
                    
                if(err)  return res.json({ success: false ,err })
                return res.status(200).json({ success: true, result })
                })
        }
          
    
    else{
        Board.find(body)
            .populate('writer')
            .sort( { createdAt: -1 } )
            .exec((err,result)=>{
                    
                if(err)  return res.json({ success: false ,err })
                if(result.length === 0) return res.json({ success: false })
                return res.status(200).json({ success: true, result })
                })
            
    }
})

router.post('/', (req, res) => {

    var board = new Board(req.body)

    board.save((err,doc) => {
        if(err) return res.json({ success: false ,err })
        return res.status(200).json({ success: true, doc})
    })
})
    

router.patch('/', (req, res) => {

    var postId = req.query.id
    var body = {
        _id : postId
    }
    var content = {
        title : req.body.title,
        description : req.body.description,
        images : req.body.images,
        chooseBoard : req.body.chooseBoard
    }

    
    Board.findOneAndUpdate(body,content,(err,result)=>{
        
        if(err) return res.json({success:false})
        return res.json({success:true})
    })
    
})

router.delete('/', (req, res) => {

    var postId = req.query.id
    var body = {}
    body._id = postId
    
    Board.findOneAndDelete(body,(err,result)=>{
        
        if(err) return res.json({success:false})
        return res.json({success:true})
    })
    

})





module.exports = router;