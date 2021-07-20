// routes to authenticate users

const express = require('express');
const router = express.Router();
// bcryptjs is used for encrypting passwords
const bcrypt = require('bcryptjs')
// bring in auth to use as a second parameter
const auth = require('../../middleware/auth')
// jsonwebtoken used for authentication
const jwt = require('jsonwebtoken')
const config = require('config')
// express-validator-check is depricated, using express-validator instead
// used to for check, check user input validation
const {check, validationResult} = require('express-validator')

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

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [

    check('email', 'Please include a valid email.')
        .isEmail(),
    check('password', 'Password is required.')
        .exists()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() })
        }

        const { email, password } = req.body;

        try {

            // see if user exists
            let user = await User.findOne({ email })

            // checking if there is NOT a user. if not return error
            if(!user) {
                return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})
            }

            // return jsonwebtoken
            const payload = {
                user: {
                    // underscore before id is not needed when using mongoose.
                    id: user.id
                }
            }

            // make sure the password matches
            // pass in 'password', which is the plain text password the user enters. And the encrypted password from the user.
            const isMatch = await bcrypt.compare(password, user.password)

            // return error if password does not match
            if(!isMatch) {
                return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                {expiresIn: 36000},
                (err, token) => {
                    if(err) throw err;
                    res.json({ token })
                }
            )

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
)

module.exports = router