const express = require('express');
const router = express.Router();
const { Alarm } = require("../models/Alarm");



router.post("/", (req, res) => {
        let skip = parseInt(req.body.skip)
        let limit = parseInt(req.body.limit)
        const userId = req.body.userId
        
        Alarm.find({userId : userId})
        .sort( { createdAt: -1 } )
        .populate('toWhom')
        .populate('postId')
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err,result) => {
        if(err) return res.json({ success: false })
        return res.json({ success: true, result , postSize : result.length})
        })
})


module.exports = router;