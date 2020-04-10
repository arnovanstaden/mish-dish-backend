const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");


// -----------------------------
// SETUP

// Initialise Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use