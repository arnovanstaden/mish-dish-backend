const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    favourites: {
        type: Array
    },

},
    { timestamps: true }
);

module.exports = mongoose.model("Profile", userSchema);