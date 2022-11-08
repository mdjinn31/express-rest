const { request, response } = require("express");

const { Category } = require('../models');

const msgs = {
    error:{
        no: " Not Found",
        post: "There was an error creating the categorie: ",
        deleted: "The category has been deleted",
        update: "There was an error updateing the categorie: ",
        exists: "The category already exists"
    },
    ok:{
        ok: "Enter in Categories",
        post: "There was created Ok - Category: ",
        put: "There was updated Ok - Category: ",
        check: "It's all good man!"
    }
}

const getCategories = async(req = request, res = response) => {

    const query = {state: true};
    const { page = 1, limit = 10 } = req.query;
    const [count, result] = await Promise.all([
                        Category.countDocuments(query),
                        Category    
                            .find(query)
                            .populate('user')
                            .limit(Number(limit)* 1)
                            .skip((Number(page) - 1) * Number(limit))
    ]);

    res.json({
        result,
        pagination: {
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        }
    });
}

const getCategoryById = async(req = request, res = response) => {

    const { id } = req.params;
    console.log(id);
    const result = await Category.findById(id)
                                 .populate('user');
    if(!result.state) return res.status(400).json({msg: msgs.error.deleted});
    res.json(result);
}

const createCategory = async(req = request, res = response) => {

    const name = req.body.name.toUpperCase();
    
    try {
        const catInDb = await Category.findOne({name});
    
        if(catInDb) return res.status(400).json({msg: msgs.error.exists});
    
        //Generate Data to save
        const data = {
            name,
            user: req.authUser._id
        };
    
        //Save Cat in DB
        const cat = new Category(data);
        await cat.save();        
        console.log(`${msgs.ok.post} ${cat.name}`);
        res.status(201).json({msg: `${msgs.ok.post} ${cat.name}`,cat});
    } catch (error) {
        console.log(`${msgs.error.post} - Error ${error.codeName}`);
        res.status(400).json({msg: `${msgs.error.post} - Error ${error.codeName}`});        
    }
}

const updateCategory = async(req = request, res = response) => {
    
    const { id } = req.params;
    const {name, state = true} = req.body;
    const data = {name: name.toUpperCase(), state, user: req.authUser._id};

    try {
        const category = await Category.findByIdAndUpdate(id,data);
        res.json({
            msg:`${msgs.ok.put} ${name.toUpperCase()}`,
            category
        });
    } catch (error) {
        console.log(`${msgs.error.update} ${name}`);
        res.status(400).json({msg: `${msgs.error.update} ${name} - Error: ${error.codeName}`});                
    }
}

const deleteCategory = async(req = request, res = response) => {

    const user = req.authUser;    
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, {state: false, user});

    res.json({
        msg: 'User state was change sucesfully',
        category,
        user
    });

}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}