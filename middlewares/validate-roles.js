const { request, response } = require('express');

const User = require('../models/user');

const msg = {
    error:{
        no: "There is no Token in the request",
        invalid: "The Token is invalid",
        user: "The user is not enable, the user has been deleted",
        no_admin: "The user has no permitions for this action",
        no_auth_user: "The user is no authnticated user",
        roles: "The user must have on of this roles: "
    },
    ok:"The token is valid"
}

const checkIfAdmin = (req = request, res = response, next) => {
  
    if(!req.authUser) return res.status(401).json({msg: msg.error.no_auth_user});    
    if(req.authUser.role != 'ADMIN_ROLE') return res.status(500).json({msg: msg.error.no_admin});
    next();
}

const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        if(!req.authUser) return res.status(500).json({msg: msg.error.no_auth_user});    
        if(!roles.includes(req.authUser.role)) return res.status(401).json({msg: `${msg.error.roles} ${roles}`});   
        next(); 
    }
}

module.exports = {
    checkIfAdmin,
    hasRole
}