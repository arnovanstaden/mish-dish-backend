// Import Packages
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary");
const DataURI = require('datauri');
const datauri = new DataURI();
const checkAuth = require("../middleware/check-auth")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

let upload = multer()

// Import Models
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

// Get Single Recipe By Code
router.get("/recipeCode/:recipeCode", (req, res, next) => {
    Recipe.findOne({
            recipeCode: req.params.recipeCode
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
router.post("/", checkAuth, upload.fields([{
    name: "thumbnail"
}, {
    name: "recipeImages"
}]), (req, res, next) => {
    // console.log(req)
    const recipeBody = JSON.parse(req.body.recipe);
    let ingredients = []
    let method = []
    if (recipeBody.ingredients.indexOf("\n") >= 0) {
        ingredients = recipeBody.ingredients.split(/\r?\n/);
        method = recipeBody.method.split(/\r?\n/);
    } else {
        ingredients = recipeBody.ingredients;
        method = recipeBody.method;
    }

    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: recipeBody.name,
        description: recipeBody.description,
        recipeType: recipeBody.recipeType,
        ingredients: ingredients,
        method: method,
        servings: recipeBody.servings,
        prepTime: recipeBody.prepTime,
        cookTime: recipeBody.cookTime,
        servingSuggestion: recipeBody.servingSuggestion
    });

    // Save Recipe in DB
    recipe.save()
        .then(recipe => {
            Recipe.findByIdAndUpdate({
                    _id: recipe._id
                }, {
                    $set: {
                        recipeCode: `MD${recipe.recipeNo}`
                    }
                }, {
                    new: true
                })
                .then(recipe => {
                    uploadThumbImg(recipe.recipeCode, recipe._id);

                    // res.status(200).json({
                    //     message: "Recipe Created"
                    // })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

    // Upload Images
    const uploadThumbImg = (recipeCode, recipeID) => {
        const thumbnail = req.files.thumbnail[0];
        datauri.format(thumbnail.mimetype, thumbnail.buffer);
        cloudinary.v2.uploader.upload(datauri.content, {
                public_id: `The-Mish-Dish/${recipeCode}/thumbnail`,
                transformation: [{
                    width: 250,
                    height: 250,
                    crop: "lfill",
                    quality: 50
                }]
            },
            function (error, result) {
                console.log(result, error);
                Recipe.findByIdAndUpdate({
                        _id: recipeID
                    }, {
                        $set: {
                            recipeThumbnailUrl: result.secure_url
                        }
                    }, {
                        new: true
                    }).then(result => {
                        uploadRecipeImgs(recipeCode, recipeID);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
            });
    }

    const uploadRecipeImgs = (recipeCode, recipeID) => {
        let uploadCounter = 0;
        let imageURLs = []
        for (let i = 0; i < req.files.recipeImages.length; i++) {
            const imageToLoad = req.files.recipeImages[i];
            datauri.format(imageToLoad.mimetype, imageToLoad.buffer);
            cloudinary.v2.uploader.upload(datauri.content, {
                    public_id: `The-Mish-Dish/${recipeCode}/${i+1}`,
                    transformation: [{
                        height: 1080,
                        quality: 40
                    }]
                },
                function (error, result) {
                    console.log(result, error);
                    uploadCounter++;
                    imageURLs.push(result.secure_url)

                    // Send Response to Client
                    if (uploadCounter == (req.files.recipeImages.length)) {
                        Recipe.findByIdAndUpdate({
                                _id: recipeID
                            }, {
                                $set: {
                                    recipeImageUrls: imageURLs
                                }
                            }, {
                                new: true
                            }).then(result => {
                                console.log("Recipe Image URLs Added");
                                res.status(200).json({
                                    message: "Recipe Added"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                });


        }
    }
});


// Change Singe Recipe
router.patch("/:recipeID", checkAuth, (req, res, next) => {
    Recipe.findByIdAndUpdate({
            _id: req.params.recipeID
        }, req.body, {
            new: true
        })
        .then(recipe => {

            res.status(200).json({
                message: "Recipe Updated",
                recipe: recipe
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


// Delete one Recipe
router.delete("/:recipeID", checkAuth, (req, res, next) => {
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

router.delete("/", checkAuth, (req, res, next) => {
    Recipe.deleteMany()
        .then(result => {
            Recipe.counterReset('recipeNo', function (err) {});
            res.status(200).json({
                message: "All Recipes Deleted",
                result: result
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;