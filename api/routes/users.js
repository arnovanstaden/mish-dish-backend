const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")

const User = require("../models/User");

router.post("/", (req, res) => {
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

router.get("/", (req, res) => {
    // User.find()
    //     .then(result => {
    //         res.status(200).json({
    //             result
    //         })
    //     })
    res.status(403).send()
})

module.exports = router;