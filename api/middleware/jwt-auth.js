const jwt = require("jsonwebtoken")

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403)
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, profile) => {
        if (err) {
            return res.status(403)
        }
        req.profile = profile
        next()
    })
}

module.exports = { jwtAuth }