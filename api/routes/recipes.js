// Import Packages
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

// Import Model
const Recipe = require("../models/recipe")

// Get All Recipes
router.get("/", (req, res, next) => {
    Recipe.find()
        .then(recipes => {
            res.status(200).send(recipes)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

// Get Single Recipe
router.get("/:recipeID", (req, res, next) => {
    Recipe.findById({
            _id: req.params.recipeID
        })
        .then(recipe => {
            if (recipe) {
                res.status(200).send(recipe)
            } else {
                res.status(404).json({
                    message: "This Recipe does not exist"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


// Add Single Recipe
router.post("/", (req, res, next) => {
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        method: req.body.method,
        servings: req.body.servings,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        servingSuggestion: req.body.servingSuggestion
    });

    recipe.save()
        .then(recipe => {
            res.status(200).json({
                recipe: recipe
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})


// Change Singe Recipe
router.patch("/:recipeID", (req, res, next) => {
    Recipe.findByIdAndUpdate({
            _id: req.params.recipeID
        }, req.body, {
            new: true
        })
        .then(recipe => {
            res.status(200).json(recipe)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


// Delete one Recipe
router.delete("/:recipeID", (req, res, next) => {
    Recipe.findOneAndDelete({
            _id: req.params.recipeID
        })
        .then(recipe => {
            res.status(200).json({
                message: "Recipe Deleted",
                recipe: recipe
            })
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
            })
        })
})

// Delete all Recipes

router.delete("/", (req, res, next) => {
    Recipe.deleteMany()
        .then(result => {
            res.status(200).json({
                message: "All Recipes Deleted",
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;