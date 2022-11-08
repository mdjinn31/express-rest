const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { getJWT } = require('../herlpers/generate-token');
const { googleVerify } = require("../herlpers/google-verify");

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
        const token = await getJWT(user.id);

        res.json({
            msg: "User logged in",
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: msgs.succes.ok
        });        
    }

}

const googleSingIn = async(req = request, res = response) => {

    const { id_token } = req.body;
    try {
        const googleUser = await googleVerify(id_token);

        let user = await User.findOne({email: googleUser.email});

        if(!user){
            user = new User(googleUser);
            await user.save();
        }

        if(!user.state) return res.status(401).json({msg: msgs.error.state});

        const token = await getJWT(user.id);

        res.json({
            msg: "User is Sing in from google",
            id_token,
            token,
            user
        });        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: msgs.succes.ok
        });  
    }
}

module.exports = {
    login,
    googleSingIn
}