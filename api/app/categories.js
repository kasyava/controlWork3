const express = require("express");
const Category = require("../models/Category");


const createRouter = () =>{
    const router = express.Router();


    router.get('/', (req, res) =>{
        Category.find()
            .then(result => res.send(result))
            .catch(()=> res.sendStatus(500));
    });

    router.post("/", (req, res) =>{
        const category = new Category(req.body);

        console.log(category);

        category.save()
            .then(result => res.send(result))
            .catch(error => res.status(400).send(error));
    });




    return router;
};

module.exports = createRouter;