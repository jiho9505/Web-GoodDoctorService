const express = require('express');
const router = express.Router();
const { Hospital } = require("../models/Hospital");

router.post("/add", (req, res) => {
    const variable = req.body.id

    const callMyPromise = async () => { 
        
        try{
        await Promise.all(
            variable.map(item => {         
                let hospital = new Hospital(item);
                hospital.save((err) => {
                    if (err) throw err
            })
        }))
            return res.json({success: true})
        }
        catch(err){
            return res.json({success: false})
        }
       };
       callMyPromise()
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