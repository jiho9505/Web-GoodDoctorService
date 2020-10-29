const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { Alert } = require("../models/Alert");
const { Board } = require("../models/Board");
const { Alarm } = require("../models/Alarm");

router.get("/", (req, res) => {

    Comment.find({ "postId": req.query.id })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});


router.post("/", (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })
        console.log(comment)
  
        Comment.findOne({ '_id': comment._id })
            .populate('postId')
            .populate('writer')
            .exec((err, result) => {
                if(err) return res.json({ success: false, err })

                console.log(result)
                
                if(result.responseTo)
                {
                    let variables = {  
                        userId : result.postId.writer,
                        postId : result.postId._id,
                        toWhom : result.writer,
                        choice : true
                    }
                    const alarm = new Alarm(variables)
                    alarm.save((err,doc) => {
                        if(err) return res.json({ success: false, err })
                        console.log(doc)
                    })
                }
                else{
                    let variables = {  
                        userId : result.postId.writer,
                        postId : result.postId._id,
                        toWhom : result.writer,
                    }
                    const alarm = new Alarm(variables)
                    alarm.save((err,doc) => {
                        if(err) return res.json({ success: false, err })
                        console.log(doc)
                     })
                }
              

                

                Board.findOneAndUpdate({_id : result.postId},{ $inc: { "commentCount": 1 } },
                        (err)=> {                         
                            if (err) return res.json({ success: false, err })
                            return res.status(200).json({ success: true, result })
                            })
                    
                        })
          
    })

})

router.delete("/", (req, res) => {
    Comment.findOneAndDelete({ _id : req.query.id })
            .exec((err,resultInfo) => {
                if (err) return res.json({ success: false})

                Alert.deleteMany({ commentId : req.query.id})
                        .exec((err) => {
                           if (err) return res.json({ success: false})
                        })  

                if(resultInfo.responseTo){
                    Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": -1 } },
                            (err)=> {
                                if (err) return res.json({ success: false })
                                return res.json({ success: true })
                    
                        })
                }
                else{
                    Comment.find({ responseTo : resultInfo._id})
                            .exec((err,comlength)=>{
                            let count = (comlength.length * -1) - 1;
                            if (err) return res.json({ success: false})

                            Comment.deleteMany({ responseTo : resultInfo._id})
                                    .exec((err)=>{
                                        if (err) return res.json({ success: false})
                                    })

                            Board.findOneAndUpdate({_id : resultInfo.postId},{ $inc: { "commentCount": count } },
                            (err)=> {
                                if (err) return res.status(400).json({ success: false })
                                res.status(200).json({ success: true })
                    
                        })
                        
                       })
                }         
                       })
                
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