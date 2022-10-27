const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { hashPassword } = require('../herlpers/general');
const user = require('../models/user');

const getUser = (req = request, res = response) => {
    const query = req.query;
    const {q, name = 'No name', apikey, page = 1, limit = 20} = req.query;
    console.log(query);
    res.json({
        msg: 'Que dice la raza en GET - Controlador',
        query,
        q,
        name,
        apikey
    });
}

const putUser = async(req = request,res = response) => {

    const { id } = req.params;
    const { _id, email, password, google, ...rest} = req.body;

    //validate body data with data in colections
    if(password){
        rest.password = hashPassword(password);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    console.log("*****Updating User*****");
    console.log(user);
    res.json({
        msg: ' PUT - users',
        id,
        rest,
        user
    });


    /*
    if(id){
        console.log("enter id");
        res.json({
            msg: 'Que dice la raza en PUT - controler',
            id
        });
    } else {
        console.log("enter else");
        res.status(400).json({
            msg: 'Que dice la raza en PUT - controler',
            id
        });
    }
    */
}

const postUser = async(req = request,res = response) => {
   
    const { 
        name, 
        email, 
        password,
        role, 
        img = 'no img', 
        state = true, 
        google = false } = req.body;
    
    const user = new User({name, email, password, role, img, state, google});

    //encript password
    user.password = hashPassword(password);

    //save in DB
    await user.save();

    res.json({user});
}

const patchUser = (req = request,res = response) => {
   // console.log(req);
    res.json({
        msg: 'Que dice la raza en PATCH - controler'
    });
}

const deleteUser = (req = request,res = response) => {
    //console.log(req);
    res.json({
        msg: 'Que dice la raza en DELETE - controler'
    });
}

module.exports = {
    getUser,
    putUser,
    postUser,
    patchUser,
    deleteUser
}