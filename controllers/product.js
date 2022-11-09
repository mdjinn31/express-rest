const { request, response } = require("express");
const { mongoose } = require('mongoose');
const { Product, Category } = require('../models');

const msgs = {
    error:{
        no: " Not Found",
        get: "There was an error geting the product listing ",
        post: "There was an error creating the product: ",
        deleted: "The product has been deleted",
        update: "There was an error updateing the product: ",
        exists: "The product already exists",
        no_cat: "The category does not exists"
    },
    ok:{
        ok: "Enter in products",
        post: "There was created Ok - Product: ",
        put: "There was updated Ok - Product: ",
        check: "It's all good man!"
    }
}

//POST controller for porducts end point
const createProduct = async(req = request, res = response) => {

    const name = req.body.name.toUpperCase();
    const catName = req.body.category.toUpperCase();

    try {

        const categoryInDb = await Category.findOne({name: catName});

        if(!categoryInDb) return res.status(400).json({msg: msgs.error.no_cat});

        const data = {
            name,
            user:req.authUser._id,
            category: categoryInDb._id
        }

        const product = new Product(data);
        await product.save();
        console.log(`${msgs.ok.post} ${product.name}`);
        res.status(201).json({msg: `${msgs.ok.post} ${product.name}`,product});
        
    } catch (error) {
        console.log(`${msgs.error.post} - Error ${ error}`);
        res.status(400).json({msg: `${msgs.error.post} - Error ${error}`});        
    }
}

//GET controller to list all products
const getProducts = async(req = request, res = response) => {

    const query = {state: true, stock: true};
    const { page = 1, limit = 10 } = req.query;

    try {

        const [ count, result ] = await Promise.all([
                            Product.countDocuments(query),
                            Product
                                    .find(query)
                                    .populate('category', 'name')
                                    .populate('user', 'name')
                                    .limit(Number(limit)*1)
                                    .skip((Number(page) - 1) * Number(limit))
        ]);

        if(result.length == 0) return res.status(404).json({msg: msgs.error.no});

        res.json({
            result,
            pagination:{
                count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page)
            }
        });
        
    } catch (error) {
        console.log(`${msgs.error.post} - Error ${ error}`);
        res.status(400).json({msg: `${msgs.error.post} - Error ${error}`});        
    }
}

//GET controller to list a product by ID
const getProduct = async(req = request, res = response) => {
    
    const { id } = req.params;

    try {
        const result = await Product.findById(id)
                                    .populate('category', 'name')
                                    .populate('user', 'name');

        if(!result.state) return res.status(400).json({msg: msgs.error.deleted});
        res.json(result);
    } catch (error) {
        console.log(`${msgs.error.get} - Error ${ error}`);
        res.status(400).json({msg: `${msgs.error.get} - Error ${error}`});          
    }
}


//GET controller to list all products by category
const getProductsByCategory = async(req = request, res = response) => {

    const { page = 1, limit = 10 } = req.query;
    
    const query = {state: true, stock: true, category: mongoose.Types.ObjectId(req.categoryId) };

    try {

        const [ count, result ] = await Promise.all([
                            Product.countDocuments(query),
                            Product
                                    .find(query)
                                    .populate('category', 'name')
                                    .populate('user', 'name')
                                    .limit(Number(limit)*1)
                                    .skip((Number(page) - 1) * Number(limit))
        ]);

        if(result.length == 0) return res.status(404).json({msg: msgs.error.no});

        res.json({
            result,
            pagination:{
                count,
                totalPages: Math.ceil(count / limit),
                currentPage: parseInt(page)
            }
        });
        
    } catch (error) {
        console.log(`${msgs.error.post} - Error ${ error}`);
        res.status(400).json({msg: `${msgs.error.post} - Error ${error}`});        
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    getProductsByCategory
}