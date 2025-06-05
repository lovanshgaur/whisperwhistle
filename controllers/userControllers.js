// ./controllers/userControllers

const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET

// Helper to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, secretKey, {
        expiresIn: '1d',
    });
};


// @desc    Register new user
// @route   POST /api/users/register
// @access  Public

const register = async (req, res) => {

    const { email, password, avatar } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide email and password"
        })
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email is already in use."
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        password: hashedPassword,
        avatar: avatar || '',
    });


    if (user) {
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                email: user.email,
                avatar: user.avatar,
                token: generateToken(user._id),
            },
        });
    } else {
        res.status(400).json({
            success: false,
            error: 'Invalid user data'
        });
    }

};

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide email and password"
        });
    };

    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            success: true,
            data: {
                _id: user._id,
                email: user.email,
                avatar: user.avatar,
                token: generateToken(user._id),
            },
        });
    } else {
        res.status(401).json({
            success: false,
            error: 'Invalid credentials'
        });
    };
};

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Private

const myInfo = async (req, res) => {
  // req.user is set in auth middleware
  const user = req.user;

  res.json({
    success: true,
    data: {
      _id: user._id,
      email: user.email,
      avatar: user.avatar,
    },
  });
};

module.exports = {register, login, myInfo};