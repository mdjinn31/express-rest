
const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Must add a role name']
    }
});

module.exports = model('Role', RoleSchema);