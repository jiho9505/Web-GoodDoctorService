const express = require('express');
const router = express.Router();
const { Alert } = require("../models/Alert");
const { Comment } = require("../models/Comment");
const { Board } = require("../models/Board");
const { Like } = require("../models/Like")
const { Alarm } = require("../models/Alarm")


router.get("/", (req, res) => {
    let skip = parseInt(req.query.skip)
    let limit = parseInt(req.query.limit)
    
    if(limit){
        Alert.find()
        .sort( { createdAt: -1 } )
        .populate('userId')
        .populate('postId')
        .populate('commentId')
        .skip(skip)
        .limit(limit)
        .exec((err,alertInfo) => {
        if(err) return res.json({ success: false })
        return res.json({ success: true, alertInfo , postSize:alertInfo.length})
        })
    }
    else{
        Alert.find()
        .sort( { createdAt: -1 } )
        .populate('userId')
        .populate('postId')
        .populate('commentId')
        .exec((err,alertInfo) => {
        if(err) return res.json({ success: false })
        return res.json({ success: true, alertInfo })
        })
    }

    


    
})

router.post("/", (req, res) => {

    const alert = new Alert(req.body)

    alert.save((err,doc)=>{
        if(err) res.json({ success : false})
        return res.json({ success : true})

    })
})

router.delete("/", (req, res) => {

    const cid = req.query.cid
    const postid = req.query.postid

    const PromiseFunc = async (cid) =>{
        try{
        if(cid){
            
            const resultInfo = await Comment.findOneAndDelete({ _id : cid }).exec() 
            
            if(resultInfo.responseTo){
                    await Promise.all([
                        Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": -1 } }),
                        Alert.deleteMany({commentId : cid}).exec()
                    ])         
            }
            else{
                    const comlength = await Comment.find({ responseTo : resultInfo._id}).exec()
                    if(comlength){
                        let count = (comlength.length * -1) - 1;
                        await Promise.all([
                            Comment.deleteMany({ responseTo : resultInfo._id}).exec(),
                            Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": count } }).exec(),
                            Alert.deleteMany({commentId : cid}).exec()
                        ])      
                    }
                    else{
                        let count = -1
                        await Promise.all([
                            Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": count } }).exec(),
                            Alert.deleteMany({commentId : cid}).exec()
                        ])
                    }                  
                    }
                }         
                                
        else{
            await Promise.all([
                Board.findOneAndDelete({_id: postid}).exec(),
                Comment.deleteMany({postId: postid}).exec(),
                Alarm.deleteMany({postId: postid}).exec(),
                Like.deleteMany({postId: postid}).exec(),
                Alert.deleteMany({postId: postid}).exec()
            ])
            }
        
        return res.json({success: true})    
        }
        
        catch(err){
            return res.json({success: false})
        }
      
    }

       PromiseFunc(cid)
})

module.exports = router;