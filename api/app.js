// Import Packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Import Routes
const recipeRoutes = require("./routes/recipes")


// -----------------------------
// SETUP

// Initialise Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan("dev"));
app.use(cors());

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

module.exports = app