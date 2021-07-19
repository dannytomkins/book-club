// require mongoose
const mongoose = require('mongoose');

// require config
const config = require('config');

// get the value from default.json
const db = config.get('mongoURI');

// create a variable to call within server.js
// wrapping async await in try catch to catch errors
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('🥭  ==> MongoDB is connected!')
    }
    catch(err) {
        console.error(err.message);
        // exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB