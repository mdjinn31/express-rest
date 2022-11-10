const { request, response } = require('express');
const { User, Category, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const allowedColections = [
        'users',
        'roles',
        'products',
        'categories'
];

const searchUser = async( term = '', res = response) => {
        const isMongoID = ObjectId.isValid(term);
        if(isMongoID){
            const result = await User.findById(term);
            return res.json({
                results: (result) ? [result] : []
            });
        }else{
            const regexp = new RegExp( term, 'i');
            const result = await User.find({
                $or:[{name: regexp},{email: regexp}],
                $and:[{state: true}]
            });
            return res.json({
                results: (result) ? result : []
            });
        }
}

const searchCategories = async( term = '', res = response) => {
        const isMongoID = ObjectId.isValid(term);
        if(isMongoID){
            const result = await Category.findById(term);
            return res.json({
                results: (result) ? [result] : []
            });
        }else{
            const regexp = new RegExp( term, 'i');
            const result = await Category.find({name: regexp, state: true});
            return res.json({
                results: (result) ? result : []
            });
        }
}

const searchProducts = async( term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if(isMongoID){
        const result = await Product.findById(term);
        return res.json({
            results: (result) ? [result] : []
        });
    }else{
        const regexp = new RegExp( term, 'i');
        const result = await Product.find({
            $or:[{name: regexp},{description: regexp}],
            $and:[{state: true}]
        });
        return res.json({
            results: (result) ? result : []
        });
    }
}

const searchRoles = async( term = '', res = response) => {
    const isMongoID = ObjectId.isValid(term);
    if(isMongoID){
        const result = await Role.findById(term);
        return res.json({
            results: (result) ? [result] : []
        });
    }else{
        const regexp = new RegExp( term, 'i');
        const result = await Role.find({role: regexp});
        return res.json({
            results: (result) ? result : []
        });
    }
}


const search = (req = request, res = response) => {

    const { colection, term } = req.params;

    if(!allowedColections.includes(colection)) return res.status(400).json({msg:`The allowed colections are: ${allowedColections}`});

    switch (colection){
            case 'users' :
                searchUser(term,res);
                break;
            case 'products' :
                searchProducts(term,res);
                break;
            case 'categories' :
                searchCategories(term,res);
                break;
            default:
                res.status(500).json({msg: `Not allowed`});
    }
}

module.exports = {
    search
}