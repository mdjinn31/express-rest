
const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        require: [true, 'Must add a role name']
    }
});

module.exports = model('role', RoleSchema);