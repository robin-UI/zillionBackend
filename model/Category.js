const mongoose = require('mongoose')
const { Schema } = mongoose;

const CategorySchema = new Schema({
    category: {
        type: String,
        unique: true
    },
    subCategory: {
        type: Array
    }
})

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;