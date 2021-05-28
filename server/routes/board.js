const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require("aws-sdk");
const config = require('../config/key')
const { Board } = require("../models/Board");
const { Alert } = require("../models/Alert");
const { Like } = require("../models/Like")
const { Comment } = require("../models/Comment")
const { Alarm } = require("../models/Alarm")

const s3 = new AWS.S3({ 
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region
});

const storage = multerS3({ 
    s3: s3,
    bucket: 'fgd-storeimage',
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname }) 
    },
    key: function (req, file, cb) { 
        cb(null, `storeImages/${Date.now()}_${file.originalname}`)
    },
})

let upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        
        return res.json({ success: true, filePath: res.req.file.location })
    })

})

router.post('/view', (req, res) => {

    let postId = req.body._id
    let body = {
        _id : postId
    }

        Board.findOneAndUpdate(body,{ $inc: { "view": 1 } },
            (err,result)=> {
                if(err)  return res.json({ success: false ,err })
                return res.status(200).json({ success: true, result })

})
})



router.get('/', (req, res) => {
    let postId = req.query.id
    let body = {}
    let term = req.query.term
   
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

    let board = new Board(req.body)

    board.save((err,doc) => {
        if(err) return res.json({ success: false ,err })
        return res.status(200).json({ success: true, doc})
    })
})
    

router.patch('/', (req, res) => {

    let postId = req.query.id
    let body = {
        _id : postId
    }
    let content = {
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

    let postId = req.query.id
    
    const callMyPromise = async () => {
        try{
            await Promise.all([
                Board.findOneAndDelete({_id:postId}).exec(),
                Comment.deleteMany({postId: postId}).exec(),
                Alarm.deleteMany({postId: postId}).exec(),
                Like.deleteMany({postId: postId}).exec(),
                Alert.deleteMany({postId: postId}).exec()

            ])
            return res.json({success: true})
        }
        catch{
            return res.json({success: false})
        }
    }

    callMyPromise()


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
 
    let term = req.query.term
    let limit = parseInt(req.query.limit)
    let skip = parseInt(req.query.skip);
    let value = req.query.choose ? parseInt(req.query.choose) : ''
    let body = {}
   
    value ? body.chooseBoard = value : ''
    
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