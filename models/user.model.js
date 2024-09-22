const mongoose = require('mongoose');
const validator = require('validator')
const { validate } = require('./course.mode');
const userRoles = require('../utils/userRoles');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
                type: String,required:true
    },
    email: {
        type: String, unique: true, required: true,
        validate :[validator.isEmail,'filed must be a vaild email address']
    },
    password: {
        type: String,
        required:true
    }, token: {
        type:String
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANGER],
        default:userRoles.USER
    },
    avatar: {
        type: String,
        default:'uploads/profile.jpeg'
    }
})
module.exports = mongoose.model('User', userSchema);
