// Import Packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const appRoot = path.dirname(require.main.filename);
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const checkAuth = require("./api/middleware/check-auth");
const { rebuildFrontend } = require("./api/utils/utils")


// Import Routes
const recipeRoutes = require("./api/routes/recipes");
const authRoutes = require("./api/routes/auth")
const userRoutes = require("./api/routes/users")
const profilesRoutes = require("./api/routes/profiles")

const Recipe = require("./api/models/Recipe");

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
app.use("/profile", profilesRoutes);

app.get("/", checkAuth, (req, res, next) => {
    res.sendFile(path.join(appRoot, "/api/views/dashboard.html"));
});

app.get("/login", (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect("/");
    }
    res.sendFile(path.join(appRoot, "/api/views/login.html"))
});

// Handle Route Errors
app.use((req, res, next) => {
    const error = new Error("Route Not Found")
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;


// Recipe.updateMany(
//     {},
//     { "$set": { favourites: 0 } },
//     (err, result) => {
//         console.log(result)
//     }
// )