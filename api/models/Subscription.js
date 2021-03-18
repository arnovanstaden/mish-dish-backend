const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subscription: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        unique: true
    }
}
);

module.exports = mongoose.model("Subscription", subscriptionSchema);