const { Category, Role, User, Product } = require('../models');


/****************************** */
// User validations
/****************************** */

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

/****************************** */


/****************************** */
// Category validations
/****************************** */

const validateCategoryID = async(id = '') => {
    const idExists = await Category.findById(id);
    console.log(idExists);
    if(!idExists) throw new Error(`The _id: ${id} doen't exist, use a Category valid ID`);
}

const ifCategoryExists = async(name = '') => {
    //console.log(id);
    const exists = await Category.findOne({name:name.toUpperCase()});
    if(exists) throw new Error(`The Category: ${name} exists, use a diferent Category name`);
}

/****************************** */


/****************************** */
// Product validations
/****************************** */
const validateProductID = async(id = '') => {
    const isValid = await Product.findById(id);
    if(!isValid) throw new Error(`The Id: ${id} doesn't exist, use a Product valid ID`);
}

/****************************** */

module.exports = {
    validateRole,
    validEmail,
    validateId,
    userExists,
    validateCategoryID,
    ifCategoryExists,
    validateProductID,
}