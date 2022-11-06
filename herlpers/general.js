const bcrypt = require('bcryptjs');

const hashPassword = (password = '') => bcrypt.hashSync( password, bcrypt.genSaltSync());


module.exports = {
    hashPassword
}