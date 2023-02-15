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

const Category = mongoose.model('categories', CategorySchema);
module.exports = Category;