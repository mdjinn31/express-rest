const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const msg = {
    error:{
        no: "There is no Token in the request",
        invalid: "The Token is invalid",
        user: "The user is not a valid user id"
    },
    ok:"The token is valid"
}

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-jwt');
    console.log(token);
    if(!token) return res.status(401).json({msg: msg.error.no});
    try {
        //const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //if(!User.findById(payload.uid)) return res.status(401).json({msg: msg.error.user});
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.authUser = await User.findOne({_id: uid});
        next();        
    } catch (error) {
        console.log(error);    
        res.status(401).json({msg: msg.error.invalid});
    }
}

module.exports = {
    validateJWT
}