// Import Packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Import Routes
const recipeRoutes = require("./routes/recipes");
const authRoutes = require("./routes/auth")


// -----------------------------
// SETUP

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
    // .then(() => {
    //     console.log("Mongoose Connected");
    // })
    .catch(err => console.log(err))


// ------------------
// Routes
app.use("/recipes", recipeRoutes);
app.use("/auth", authRoutes);


module.exports = app