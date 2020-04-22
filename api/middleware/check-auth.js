const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    // const bearerHeader = req.headers["authorization"];
    // if (typeof bearerHeader !== "undefined") {
    //     try {
    //         const decoded = jwt.verify(bearerHeader, process.env.JWT_PRIVATE_KEY);
    //         req.userAuth = decoded;
    //         next();
    //     } catch (error) {
    //         res.status(401).json({
    //             message: "Auth Failed"
    //         })
    //     }
    // } else {
    //     res.status(401).json({
    //         message: "Auth Failed"
    //     })
    // }
    next();
}