const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Board } = require("../models/Board");
const { Alert } = require("../models/Alert");
const { Like } = require("../models/Like")
const { Comment } = require("../models/Comment")
const async = require('async');

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
    
    async.parallel([

        function(callback){
            Board.findOneAndDelete({_id:postId})
                .exec((err)=>{
                if(err) callback(err)
                callback(null)
            })
        },
        function(callback){
            Comment.deleteMany({postId: postId}) 
                    .exec((err)=>{
                        if(err) callback(err)
                        callback(null)
            })
        },
        
        function(callback){
            Like.deleteMany({postId: postId}) 
            .exec((err)=>{
                   if(err) callback(err)
                   callback(null)
            })
        },
        function(callback){
            Alert.deleteMany({postId: postId})
            .exec((err)=>{
                   if(err) callback(err)
                   callback(null)
            })
        }
        ],

        function(err,results){
            if(err) return res.json({success: false})
            return res.json({success: true})
}); 

})


router.post("/info", (req, res) => {
    
    let limit = parseInt(req.body.limit)
    let skip = parseInt(req.body.skip)

    if(req.body.loadMore)
    {
        Board.find({writer : req.body._id})
        .populate('writer')
        .sort( { createdAt: -1 } )
        .skip(skip)
        .limit(limit)
        .exec((err,boardInfo) => {
           if(err) return res.json({ success: false })
           return res.json({ success: true, boardInfo, postSize: boardInfo.length })
        })
    }
    else{
        Board.find({writer : req.body._id})
             .populate('writer')
             .sort( { createdAt: -1 } )
             .exec((err,boardInfo) => {
                if(err) return res.json({ success: false })
                return res.json({ success: true, boardInfo })
             })
        }
})

router.get('/mobile', (req, res) => {
    var term = req.query.term
    let limit = parseInt(req.query.limit)
    let skip = parseInt(req.query.skip);
    let value = parseInt(req.query.choose)
    let body = {}
    
    if(value){
        body.chooseBoard = value
    }

    if(term){
        
    
            Board.find(body)
            .find({ $text: { $search: term } })
            .populate('writer')
            .sort( { createdAt: -1 } )
            .skip(skip)
            .limit(limit)
            .exec((err,result)=>{
                    
                if(err)  return res.json({ success: false ,err })
                return res.status(200).json({ success: true, result , postSize: result.length })
                })
        }
          
    
    else{

        Board.find(body)
            .populate('writer')
            .sort( { createdAt: -1 } )
            .skip(skip)
            .limit(limit)
            .exec((err,result)=>{
                
                
                if(err)  return res.json({ success: false ,err })
                return res.status(200).json({ success: true, result , postSize: result.length})
                })
            
    }
})


module.exports = router;