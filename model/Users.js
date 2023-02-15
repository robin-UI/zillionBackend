const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    number:{
        type: Number,
        unique: true
    },
    email: {
        type: String,
        min: 3,
        max: 20,
        unique: true,
    },
    photo:{
        type: String
    },
    password: {
        type: String,
        min: 3,
        max: 20
    }
   
}, { timestamps: true }
);
    
const User = mongoose.model('user', UserSchema);
module.exports = User;