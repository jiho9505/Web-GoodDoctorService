const express = require('express');
const router = express.Router();
const { Hospital } = require("../models/Hospital");


router.post("/add", (req, res) => {

    const hospital = new Hospital(req.body);

    hospital.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});


module.exports = router;