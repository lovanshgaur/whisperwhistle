// ./middleware/auth.js

const jwt = require('jsonwebtoken')
const User = require('../models/User')
const secretKey =  process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secretKey);
            req.user = await User.findById(decoded._id).select('-password')
        } catch (error) {
            
        }
    }
}

module.exports = auth;