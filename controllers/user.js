const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

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

const putUser = (req = request,res = response) => {
    console.log("************************");
    //console.log(req);
    const {id} = req.params;
    console.log(id);
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
}

const postUser = async(req = request,res = response) => {
   
    const { 
        name = 'no name', 
        email = 'no email', 
        password = 'no password',
        role = 'READ_ONLY_ROLE', 
        img = 'no img', 
        state = true, 
        google = false} = req.body;
    
    const user = new User({name, email, password, role, img, state, google});

    //check if email exsite
    const exist = await User.findOne({email});
    if((user.email === 'no email')||(exist)){
        return res.status(400).json({msg: 'email is reqiure and must be uniquie'});
    }
    //check if name exsite
    if(user.name === 'no name'){
        return res.status(400).json({msg: 'name is reqiure '});
    }

    //encript password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt);

    //save in DB
    await user.save();


    console.log(user);

    res.json({
        msg: 'Que dice la raza en POST - controler',
        user
    });
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