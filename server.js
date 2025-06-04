// ./server.js

//required Modules
const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv');


//Loading env Variables
dotenv.config();
const PORT = process.env.PORT

//initiating express app
const app = express();

//running connectDB 
connectDB();

//Middlewares
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send('Whispering....!')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})