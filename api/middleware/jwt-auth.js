const jwt = require("jsonwebtoken")

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, profile) => {
        if (err) {
            return res.status(403)
        }
        console.log(profile);
        req.profile = profile
        next()
    })
}

module.exports = { jwtAuth }