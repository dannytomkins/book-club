const express = require('express');
const router = express.Router();
// used to connect to the platform Gravitar, which hosts global user avatars connected to email
const gravatar = require('gravatar')
// bcryptjs is used for encrypting passwords
const bcrypt = require('bcryptjs')
// jsonwebtoken used for authentication
const jwt = require('jsonwebtoken')
const config = require('config')
// express-validator-check is depricated, using express-validator instead
// used to for check, check user input validation
const {check, validationResult} = require('express-validator')

const User = require('../../models/User')

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('name', 'Name is required.')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email.')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters.')
        .isLength({min: 6})
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() })
        }

        const { name, email, password } = req.body;

        try {

            // see if user exists
            let user = await User.findOne({ email })

            if(user) {
                return res.status(400).json({errors: [{msg: 'User already exists'}]})
            }

            // get users gravitar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User ({
                name,
                email,
                avatar,
                password
            })

            // encrypt password with bcrypt
            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)

            // await function to save user after password has been hashed
            await user.save();

            // return jsonwebtoken
            const payload = {
                user: {
                    // underscore before id is not needed when using mongoose.
                    id: user.id
                }
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

})

module.exports = router