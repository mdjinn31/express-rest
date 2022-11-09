const { request, response } = require('express');
const { Category } = require('../models');

const msg = {
    error:{
        no: "The category doesn't exist",
        invalid: "There vas an error validating the category"
    },
    ok:"The token is valid"
}

const validateCategoryName = async (req = request, res = response, next) => {

    const name = req.params.name.toUpperCase();
    try {
        const catId = await Category.findOne({name});
        if(!catId) return res.status(401).json({msg: msg.error.no});    
        req.categoryId = catId._id; 
        next();        
    } catch (error) {
        console.log(error);    
        res.status(401).json({msg: msg.error.invalid, error});
    }
}

module.exports = {
    validateCategoryName
}