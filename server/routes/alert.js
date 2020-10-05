const express = require('express');
const router = express.Router();
const { Alert } = require("../models/Alert");
const { Comment } = require("../models/Comment");
const { Board } = require("../models/Board");


router.get("/", (req, res) => {

    Alert.find()
        .sort( { createdAt: -1 } )
        .populate('userId')
        .populate('postId')
        .populate('commentId')
        .exec((err,alertInfo) => {
        if(err) return res.json({ success: false })
        return res.json({ success: true, alertInfo })
        })


    
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

    if(cid){
        Alert.findOneAndDelete({_id : req.query.id}, (err,notresult)=>{
            if(err) res.json({ success: false })
            Comment.findOneAndDelete({_id : cid}, (err,doc)=>{
                if(err) res.json({ success: false })
                return res.json({ success : true})
            })
        })
        
    }
    else{
        Alert.findOneAndDelete({_id : req.query.id}, (err,notresult)=>{
            if(err) res.json({ success: false })
            Board.findOneAndDelete({_id : postid}, (err,doc)=>{
                if(err) res.json({ success: false })
                return res.json({ success : true})
            })
        })
    }

})

module.exports = router;