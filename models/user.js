/* MODEL
    {
        name: '',
        email: '',
        password: 'HASJ',
        img: 'urlPath',
        role: 'USERROLL'
        state: BOLEAN,
        google:, BOLEAN (true if created from google, false if create in mongo)
    }
*/

const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'READ_ONLY_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

module.exports = model('User', UserSchema);