const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcryptjs");

const User = require("../models/User")

router.post("/login", (req, res) => {
    console.log("Login Request Received: ");
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
            username: username
        })
        .then(user => {
            if (user) {
                // If User Found
                bcrypt.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            return res.redirect("/dashboard")
                        } else {
                            console.log("Password Invalid");
                            res.status(401).send()
                        }
                    })
                    .catch(err => {
                        console.log(error)
                    })
            } else {
                console.log("User not Found");
                res.status(401).json({
                    "message": "BAD LOGIN"
                })
            }
        })

})

module.exports = router



// if (req.body.username === user.username && req.body.password === user.password) {
//     const token = jwt.sign({
//             user: user.username,
//             email: user.email
//         },
//         process.env.JWT_PRIVATE_KEY, {
//             expiresIn: "1h"
//         });
//     // res.status(200).sendFile(path.join(appRoot, "/api/views/index.html"))
//     res.status(200).redirect("/dashboard")
// } else {
//     res.status(401).json({
//         message: "User Login Failed"
//     })
// }