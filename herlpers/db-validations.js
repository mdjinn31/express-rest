const Role = require('../models/role');
const User = require('../models/user');

const validateRole = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if(!roleExists){
        throw new Error(`The rol: ${role} is not allows, please add role in DB o assing a valid Role`);
    }
}

const validEmail = async(email = '') => {
    const emailExist = await User.findOne({email});
    if(emailExist){
        throw new Error(`The email: ${email} is already in use, please use a diferent email`);
    }
}

const userExists = async(email = '') => {
    const emailExist = await User.findOne({email});
    if(!emailExist){
        throw new Error(`The email: ${email} is not register to a user, please use a register email`);
    }
}

const validateId = async(id = '') => {
    const idExists = await User.findById(id);
    if(!idExists){
        throw new Error(`The _id: ${id} doen't exist, user a valid ID`);
    }
}

module.exports = {
    validateRole,
    validEmail,
    validateId,
    userExists
}