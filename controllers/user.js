const { response, request } = require('express');

const User = require('../models/user');
const { hashPassword } = require('../herlpers/general');

const getUser = async(req = request, res = response) => {

    const query = {state: true};
    const { page = 1, limit = 10 } = req.query;
    const [count, result] = await Promise.all([
                        User.countDocuments(query),
                        User
                            .find(query)
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

const putUser = async(req = request,res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...rest} = req.body;

    //validate body data with data in colections
    if(password){
        rest.password = hashPassword(password);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        user
    });

}

const deleteUser = async(req = request,res = response) => {
    
    const authUser = req.authUser;    
    if(authUser.role != "ADMIN_ROLE") return res.status(401).json({msg: "The user has no permitions for this action"});

    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({
        msg: 'User state was change sucesfully',
        user,
        authUser
    });
}

const patchUser = (req = request,res = response) => {
   // console.log(req);
    res.json({
        msg: 'Que dice la raza en PATCH - controler'
    });
}


module.exports = {
    getUser,
    putUser,
    postUser,
    patchUser,
    deleteUser
}