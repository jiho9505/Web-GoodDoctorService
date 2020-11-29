const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { Alert } = require("../models/Alert");
const { Board } = require("../models/Board");
const { Alarm } = require("../models/Alarm");
const { User } = require("../models/User");

router.get("/", (req, res) => {

    Comment.find({ "postId": req.query.id })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});


router.post("/", (req, res) => {
    
    const callMyPromise = async () => {
        try{
            const comments = new Comment(req.body)
            const comment = await comments.save()
            const result = await Comment.findOne({ '_id': comment._id })
                                        .populate('postId')
                                        .populate('writer')
                                        .exec()

                                       
            await Board.findOneAndUpdate({_id : result.postId},{ $inc: { "commentCount": 1 }}).exec()

            if(result.responseTo)
            {
                
                const results = await Comment.findOne({ _id: result.responseTo })
                                            .populate('writer')
                                            .exec()
                
                let variables = {  
                    userId : results.writer,
                    postId : result.postId._id,
                    toWhom : result.writer,
                    choice : true
                    }
                if(results.writer.nickname !== result.writer.nickname){
                    const alarm = new Alarm(variables)
                    await alarm.save()
                }                  
                
            }
            else{
                let variables = {  
                    userId : result.postId.writer,
                    postId : result.postId._id,
                    toWhom : result.writer,
                }
                
                const userInfo = await User.findOne({_id:result.postId.writer}).exec()

                if(userInfo.nickname !== result.writer.nickname){
                    const alarm = new Alarm(variables)
                    await alarm.save()
                }
            }
                                  
            return res.json({success: true, result })
        }
        catch{
            return res.json({success: false})
        }
    }

    callMyPromise()
})
 

router.delete("/", (req, res) => {

    const callMyPromise = async () => {
        try{
            const resultInfo = await Comment.findOneAndDelete({ _id : req.query.id }).exec()

            if(resultInfo.responseTo){
                await Promise.all([
                    Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": -1 } }).exec() ,
                    Alert.deleteMany({ commentId : req.query.id}).exec()
                ])
                
            }
            else{
                const comlength = await Comment.find({ responseTo : resultInfo._id}).exec()
                let count = (comlength.length * -1) - 1;
                await Promise.all([
                    Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": count } }).exec() ,
                    Alert.deleteMany({ commentId : req.query.id}).exec() ,
                    Comment.deleteMany({ responseTo : resultInfo._id}).exec()
                ])      
            }   

            return res.json({success: true})
        }
        catch{
            return res.json({success: false})
        }
    }

    callMyPromise()             
})

router.post("/info", (req, res) => {
        Comment.find({writer : req.body._id})
             .populate('postId')
             .sort( { createdAt: -1 } )
             .exec((err,CommentInfo) => {
                if(err) return res.json({ success: false })
                return res.json({ success: true, CommentInfo })
             })
    
})

module.exports = router;