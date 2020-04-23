// Import Packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const appRoot = path.dirname(require.main.filename);
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session)


// Import Routes
const recipeRoutes = require("./routes/recipes");
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")


// -----------------------------
// SETUP

const app = express();
const DATABSE_URI = `mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@recipes-otrmq.gcp.mongodb.net/test?retryWrites=true&w=majority`
const store = new mongoDBStore({
    uri: DATABSE_URI,
    collection: "sessions"
});

// Database
mongoose.connect(DATABSE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Mongoose Connected");
    })
    .catch(err => console.log(err))

// Static
app.use(express.static('public'))


// Initialise Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan("dev"));
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    store: store
}))





// ------------------
// Routes
app.use("/recipes", recipeRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res, next) => {
    res.sendFile(path.join(appRoot, "/api/views/login.html"))
})
app.use("/dashboard", (req, res) => {
    res.sendFile(path.join(appRoot, "/api/views/dashboard.html"))
});




module.exports = app