const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtAuth } = require("../middleware/jwt-auth");

const Profile = require("../models/Profile");

router.post("/register", (req, res) => {
    // Check if email already exists

    Profile.findOne({
        email: req.body.email
    }, (err, result) => {
        if (result) {
            return res.status(400).json({
                message: "This email is already in use"
            })
        }
        bcrypt.hash(req.body.password, 12, (error, hashedPassword) => {
            if (error) {
                return console.log(error)
            }
            const profile = new Profile({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hashedPassword,
                name: req.body.name
            })
            profile.save()
                .then(result => {
                    return res.status(201).json({
                        message: "User Created"
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }
    )
})

router.post("/login", (req, res) => {

    Profile.findOne({
        email: req.body.email
    })
        .then(profile => {
            if (!profile) {
                return res.status(401).json({
                    message: "No Such User Found"
                })
            }
            // If User Found
            bcrypt
                .compare(req.body.password, profile.password)
                .then(doMatch => {
                    if (doMatch) {
                        const user = {
                            email: profile.email,
                            password: profile.password
                        }
                        const jwtToken = jwt.sign(user, process.env.JWT_SECRET);
                        return res.status(200).json({
                            message: "Login Successful",
                            name: profile.name,
                            favourites: profile.favourites,
                            token: jwtToken
                        })
                    }

                    // Password Doesn't Match
                    return res.status(401).json({
                        message: "Wrong Password"
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
});

router.get("/favourites", jwtAuth, (req, res) => {
    Profile.findOne({
        email: req.profile.email
    }, (err, profile) => {
        res.status(200).json({
            favourites: profile.favourites
        })
    })
})

module.exports = router;