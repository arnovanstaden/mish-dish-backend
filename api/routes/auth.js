const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User")

router.post("/login", (req, res) => {
    console.log("Login Request Received: ");
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
            username: username
        })
        .then(user => {
            if (!user) {
                return res.redirect("/login")
            }
            // If User Found
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log("Login Success");
                        req.session.isLoggedIn = true;
                        return req.session.save(err => {
                            console.log(err);
                            res.status(200).redirect("/")
                        })
                    }
                    // Password Doesn't Match
                    console.log("Password Invalid");
                    res.redirect("/login")
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect("/login");
    });
});

module.exports = router