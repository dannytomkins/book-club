// routes to authenticate users

const express = require('express');
const router = express.Router();
// bring in auth to use as a second parameter
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        // since this is a protected route and we used the token which has the id, and in the middleware we set user to the user in the token, we can simply pass req.user
        // we dont want the password
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.')
    }
})

module.exports = router