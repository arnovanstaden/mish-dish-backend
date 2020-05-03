const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    method: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    servings: {
        type: String,
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
    },
    recipeNo: {
        type: Number
    },
    recipeCode: {
        type: String
    },
    recipeThumbnailUrl: {
        type: String
    },
    recipeImageUrls: {
        type: Array
    },
    addOnCode: {
        type: String,
    }
});

recipeSchema.plugin(AutoIncrement, {
    inc_field: 'recipeNo'
});

module.exports = mongoose.model("Recipe", recipeSchema);