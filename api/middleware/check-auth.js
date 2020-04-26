module.exports = (req, res, next) => {
    console.log("Checking Auth")
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
    if (!req.session.isLoggedIn) {
        console.log("Unauthorized")
        return res.status(403).redirect("/login");
    }
    next();
}