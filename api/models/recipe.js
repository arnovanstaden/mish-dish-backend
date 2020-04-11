const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recipeType: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    method: {
        type: Array,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    prepTime: {
        type: Number,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    servingSuggestion: {
        type: String,
    }
});


module.exports = mongoose.model("Recipe", recipeSchema);