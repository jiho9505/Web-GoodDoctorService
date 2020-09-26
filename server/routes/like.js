const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Board } = require("../models/Board");

router.post("/getLikes", (req, res) => {

    let body = {
        postId: req.body.postId
    }

    Like.find(body)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
})


router.post("/upLike", (req, res) => {

    let body = { postId: req.body.postId, userId: req.body.userId }    
    const like = new Like(body)
   
    Board.findOneAndUpdate({_id : req.body.postId},{ $inc: { "like": 1 } },
            (err,result)=> {
                if(err)  return res.json({ success: false })
                like.save((err, likeResult) => {
                    if (err) return res.json({ success: false });
                    res.status(200).json({ success: true })
                        })
            })
    })


router.post("/unLike", (req, res) => {

    let body = { postId: req.body.postId, userId: req.body.userId }

    Board.findOneAndUpdate({_id : req.body.postId},{ $inc: { "like": -1 } },
            (err,result)=> {
                if(err)  return res.json({ success: false })
                Like.findOneAndDelete(body)
                    .exec((err, resultInfo) => {
                    if (err) return res.status(400).json({ success: false })
                    res.status(200).json({ success: true })
                })
        
            })
   
})


module.exports = router;