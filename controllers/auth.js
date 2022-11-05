const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const msgs = {
    error: {
        user: "There is no user register with this email.",
        state: "There is no longer active and is been deleted.",
        password: "The password is not correct.",
    },
    succes:{
        ok: "There was a error please try again later o contact the administrator."
    }
}

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        // verfi if email exist
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: msgs.error.user});

        // if user is active
        if(!user.state) return res.status(400).json({msg: msgs.error.state});
        
        // check password
        if(!(bcryptjs.compareSync(password, user.password))) return res.status(400).json({msg: msgs.error.password});

        // generate JWT


        res.json({
            msg: "User logged in"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: msgs.succes.ok
        });        
    }

}

module.exports = {
    login
}