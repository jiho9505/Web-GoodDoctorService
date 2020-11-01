const express = require('express');
const router = express.Router();
const { Hospital } = require("../models/Hospital");
const async = require('async');

router.post("/add", (req, res) => {
    const variable = req.body.id


     async.parallel([

        function(callback){
            variable.forEach(item => {
                
                let hospital = new Hospital(item);
                hospital.save((err) => {
                    if (err) callback(err)
            })
        }
        )}
        ],
        //callback(err) 대신 callback(null)로 해놨었는데 true가 오진 않지만 데이터를 넣는건 문제 없음.
        function(err){
            if(err) return res.json({success: false})
            return res.json({success: true})
}); 

});

router.post("/info", (req, res) => {

    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
             findArgs[key] = req.body.filters[key];
        }
    }

     Hospital.find(findArgs)
             .exec((err, hospital) => {
                if (err) return res.json({ success: false, err })
                res.status(200).json({ success: true, hospital })
            })
    
})


module.exports = router;