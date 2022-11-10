const e = require('express');
const { request, response } = require('express');
const { mongoose } = require('mongoose');
const { Category, Product } = require('../models');

const msg = {
    error:{
        no: "The category doesn't exist",
        invalid: "There vas an error validating the category",
        exists: "The product exists can't have 2 products with same name in same category"
    },
    ok:"The token is valid"
}

const validateProduct = async (req = request, res = response, next) => {
    //const j = req.body.category.toUpperCase()
    try {
        const catId = await Category.findOne({name: req.body.category.toUpperCase(), state: true});
        if(!catId) return res.status(401).json({msg: msg.error.no});    

        const product = await Product.findOne({name: req.body.name, state: true, category: mongoose.Types.ObjectId(catId._id)});
        if(product) return res.status(401).json({msg: msg.error.exists});

        req.categoryId = catId._id; 

        next();        
    } catch (error) {
        console.log(error);    
        res.status(401).json({msg: msg.error.invalid, error});
    }
}

const validateProductCategory = async(req = request, res = response, next) => {

    if(req.body.category){
        const catId = await Category.findOne({name: req.body.category.toUpperCase(), state: true});
        if(!catId) return res.status(401).json({msg: msg.error.no});   
    }else{
        const catId = await Product.findById(req.params.id).populate('category', 'name');
        if(catId){
            const temp = catId.category;
            req.body.category = temp.name;  
        } 
    }
    next();
}

module.exports = {
    validateProduct,
    validateProductCategory
}