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
    diet: {
        type: String,
        required: true
    },
    type: {
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
    thumbnail: {
        type: String
    },
    images: {
        type: Array
    },
    tags: {
        type: Array
    },
    likes: {
        type: Number
    }
});

recipeSchema.plugin(AutoIncrement, {
    inc_field: 'recipeNo'
});

recipeSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model("Recipe", recipeSchema);