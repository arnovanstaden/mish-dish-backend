const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")

const User = require("../models/User");

// admin
router.post("/admin", (req, res) => {
    // bcrypt.hash(req.body.password, 12, (error, hashedPassword) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     const user = new User({
    //         _id: new mongoose.Types.ObjectId(),
    //         username: req.body.username,
    //         password: hashedPassword
    //     })
    //     user.save()
    //         .then(result => {
    //             console.log(result)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // })

    res.status(403).send()
})


module.exports = router;