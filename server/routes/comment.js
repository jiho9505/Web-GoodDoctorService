const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
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

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

})

router.delete("/", (req, res) => {

    Comment.findOneAndDelete({ _id : req.query.id })
            .exec((err, comments) => {
                if (err) return res.json({ success: false})
                res.status(200).json({ success: true })
                            
                       })
                
            })

router.post("/info", (req, res) => {
        Comment.find({writer : req.body._id})
             .populate('postId')
             .exec((err,CommentInfo) => {
                if(err) return res.json({ success: false })
                return res.json({ success: true, CommentInfo })
             })
    
})

module.exports = router;