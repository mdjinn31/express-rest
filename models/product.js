
const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
        name:{
            type: String,
            require: [true, 'Product must have a name']
        },
        state:{
            type: Boolean,
            default: true,
            require: true
        },
        description:{
            type: String
        },
        stock:{
            type: Boolean,
            default: true
        },
        price:{
            type: Number,
            default: 0
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            require: true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        }
});

ProductSchema.index({name: 1, category: 1}, {unique: true});

ProductSchema.methods.toJSON = function(){
    const{ __v, _id, ...data} = this.toObject();
    return { 'uid': _id, ...data};
}

module.exports = model('Product', ProductSchema);