module.exports = (req, res, next) => {
    console.log("Checking Auth")
    if (!req.session.isLoggedIn) {
        console.log("Unauthorized")
        return res.status(403).redirect("/login");
    }
    next();
}