// require express, back end web framework
const express = require('express');

const connectDB = require('./config/db');

const path = require('path');

// initialize app variable with express
const app = express();

// connect database
connectDB();

// init middleware, bodyparser
app.use(express.json({ extended: false }));

// define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/clubs', require('./routes/api/clubs'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/googlebooks', require('./routes/api/googlebooks'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // Serve the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// looks for an environment variable named PORT, when deployed to Heroku, that is where it will get the port number. OR locally it will run on port 5000
const PORT = process.env.PORT || 5000;

// pass in the port and a callback to console.log connection statement
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
