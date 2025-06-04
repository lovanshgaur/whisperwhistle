const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    }
},{timestamps: true});

let User = mongoose.model('User', userSchema)
module.exports = User
