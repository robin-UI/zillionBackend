const mongoose = require('mongoose')
const { Schema } = mongoose;

const AdminUserSchema = new Schema({
    adminname: {
        type: String,
        unique: true
    },
    number:{
        type: String,
    },
    email: {
        type: String,
    },
    photo:{
        type: String
    },
    password: {
        type: String,
        min: 3,
        max: 20
    },
    firstName:{
        type: String
    },
    lastName: {
        type: String
    },
    myAdmin: {
        type: String
    }
   
}, { timestamps: true }
);
    
const AdmineUser = mongoose.model('adminUser', AdminUserSchema);
module.exports = AdmineUser;