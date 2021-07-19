// require express, back end web framework
const express = require('express')

const connectDB = require('./config/db')

// initialize app variable with express
const app = express()

// connect database
connectDB();

// test
app.get('/', (req, res) => res.send('API Running'))

// looks for an environment variable named PORT, when deployed to Heroku, that is where it will get the port number. OR locally it will run on port 5000
const PORT = process.env.PORT || 5000;

// pass in the port and a callback to console.log connection statement
app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`))