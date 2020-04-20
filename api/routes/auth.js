const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");

const appRoot = path.dirname(require.main.filename);


router.post("/login", (req, res) => {
    console.log(req.body)
    // Mock User
    const user = {
        username: process.env.USER_NAME,
        email: "devosmarisha@gmail.com",
        password: process.env.USER_PW
    }

    if (req.body.username === user.username && req.body.password === user.password) {
        const token = jwt.sign({
                user: user.username,
                email: user.email
            },
            process.env.JWT_PRIVATE_KEY, {
                expiresIn: "1h"
            });
        // res.status(200).sendFile(path.join(appRoot, "/api/views/index.html"))
        res.status(200).json({
            token
        }).sendFile(path.join(appRoot, "/api/views/index.html"))
    } else {
        res.status(401).json({
            message: "User Login Failed"
        })
    }
})

module.exports = router