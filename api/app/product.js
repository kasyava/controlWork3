const express = require("express");
const multer = require("multer");
const path = require("path");
const nanoid = require("nanoid");

const config = require("../config");
const Product = require("../models/Product");
const auth = require("../middlewares/middleware");
const permit = require("../middlewares/permit");

const storage = multer.diskStorage({
    destination(req, file, cd){
        cd(null, config.uploadPath)
    },
    filename(req, file, cd){
        cd(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});


const router = express.Router();

router.get("/", (req, res) => {
    Product.find().populate('category').populate('userId')
        .then( results => res.send(results))
        .catch(e => res.send(e).status(500))
});

router.post("/", [auth, permit('admin'), upload.single("image")], (req, res) => {
    console.log(req.body);

    const productData = req.body;
    if (req.file) productData.image = req.file.filename;


    const product = new Product(productData);

    product.userId = req.user._id;

    product.save()
        .then(() => res.send(productData))
        .catch((e) => res.send(e).status(500));

});

module.exports = router;
