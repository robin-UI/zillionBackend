const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductSchema = new Schema({
    productName: {
        type: String,
        unique: true
    },
    adminId: {
        type: String,
    },
    desc:{
        type: String,
    },
    price: {
        type: Number,
    },
    photo:{
        type: String
    },
    category: {
        type: String,
    },
    subCategory: {
        type: String
    },
    approve: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    }
   
}, { timestamps: true }
);
    
const Products = mongoose.model('product', ProductSchema);
module.exports = Products;