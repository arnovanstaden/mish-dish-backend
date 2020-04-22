// Import Packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const appRoot = path.dirname(require.main.filename);


// Import Routes
const recipeRoutes = require("./routes/recipes");
const authRoutes = require("./routes/auth")
const dashboardRoutes = require("./routes/dashboard")
const userRoutes = require("./routes/user")


// -----------------------------
// SETUP

// Static
app.use(express.static('public'))


// Initialise Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder

// Mongo Atlas

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@recipes-otrmq.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Mongoose Connected");
    })
    .catch(err => console.log(err))


// ------------------
// Routes
app.use("/recipes", recipeRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.get("/", (req, res, next) => {
    res.sendFile(path.join(appRoot, "/api/views/login.html"))
})



module.exports = app