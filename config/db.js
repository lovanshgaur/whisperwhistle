// ./config/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv')

//To Load env Variables
dotenv.config();
const Mongo = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(Mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected @ ${connection.connection.host}`) //get details from connection
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;