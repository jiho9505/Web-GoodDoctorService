const express = require('express');
const router = express.Router();
const { Tokenauth } = require("../models/Tokenauth");


router.post("/", (req, res) => {

    const token = req.body.tokenId

    Tokenauth.find({ token : token })
             .exec((err,result)=>{
                 console.log(result)
                 if(err) return res.json({success : false})
                 if(result.length === 0) return res.json({success : false})
                 return res.status(200).json({success : true})
             })
});


module.exports = router;