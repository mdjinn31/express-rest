
const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
        name:{
            type: String,
            required: [true, 'Must add a category name'],
            unique: true
        },
        state:{
            type: Boolean,
            default: true,
            required: true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
});

CategorySchema.methods.toJSON = function () {
    const { __v, _id, user, ...category } = this.toObject();
    const resUser = { 'uid': user._id,'name': user.name, 'email': user.email, 'img': user.img, 'state': user.state, 'role': user.role };
    return { 'uid': _id, ...category, 'user':resUser };
}

module.exports = model('Category', CategorySchema);