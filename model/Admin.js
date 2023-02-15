const mongoose = require('mongoose')
const { Schema } = mongoose;

const AdminSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        min: 3,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        min: 3,
        max: 20
    },
   
}, { timestamps: true }
);
    
const Admine = mongoose.model('admin', AdminSchema);
module.exports = Admine;