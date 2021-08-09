const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Club = require('../../models/Club');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/clubs
// @desc    Create a club
// @access  Private
router.post(
    '/', 
    [auth, [check('name', 'Name is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password')
            // TO DO: add user as admin and member when creating newClub
            const newClub = new Club({
                name: req.body.text,
                description: req.body.text,
                creator: req.user.id,
            })
            const club = await newClub.save();
            res.json(club)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
)

module.exports = router;
