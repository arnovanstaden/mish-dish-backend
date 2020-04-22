const express = require("express");
const router = express.Router();
const path = require("path");

const appRoot = path.dirname(require.main.filename);


router.get("/", (req, res) => {
    res.sendFile(path.join(appRoot, "/api/views/dashboard.html"))
})

module.exports = router