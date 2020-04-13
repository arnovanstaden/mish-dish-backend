const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const DataURI = require('datauri');
const datauri = new DataURI();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

let upload = multer()

router.post('/', upload.fields([{
    name: "thumbnail"
}, {
    name: "recipeImages"
}]), (req, res) => {
    // Upload Image
    const uploadThumbImg = () => {
        const thumbnail = req.files.image[0];
        datauri.format(thumbnail.mimetype, thumbnail.buffer);
        cloudinary.v2.uploader.upload(datauri.content, {
                public_id: "The-Mish-Dish/thumbnail",
                transformation: [{
                    width: 250,
                    height: 250,
                    crop: "lfill",
                    quality: 40
                }]
            },

            function (error, result) {
                console.log(result, error);
                uploadRecipeImgs()
            });
    }

    // uploadThumbImg();

    const uploadRecipeImgs = () => {
        let uploadCounter = 0;
        for (let i = 0; i < req.files.more.length; i++) {
            const imageToLoad = req.files.more[i];
            datauri.format(imageToLoad.mimetype, imageToLoad.buffer);
            cloudinary.v2.uploader.upload(datauri.content, {
                    public_id: `The-Mish-Dish/image${i+1}`,
                    transformation: [{
                        height: 1080,
                        crop: "lfill",
                        quality: 40
                    }]
                },
                function (error, result) {
                    console.log(result, error);
                    uploadCounter++;

                    // Send Response to Client
                    if (uploadCounter == (req.files.more.length)) {
                        res.status(200).json({
                            status: "Success"
                        })
                    }
                });


        }
    }


    // Multiple FIles

});

module.exports = router;