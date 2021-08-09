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
            // TO DO: figure out whats going on with members and admins
            const newClub = new Club({
                name: req.body.name,
                description: req.body.description,
                creator: {user: req.user.id},
                members: {user: req.user.id},
                admins: {user: req.user.id}
            })
            const club = await newClub.save();
            res.json(club)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
)

// Allows any auth user to get club by ID
// TO DO: check if user is member
// @route   GET api/clubs/:id
// @desc    Get club by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const club = await Club.findById(req.params.id)

        if (!club) {
            return res.status(404).json({ msg: 'Club not found.' });
        }
        res.json(club)
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjentId') {
          return res.status(404).json({ msg: 'Club not found.' });
        }
        res.status(500).send('Server error');
    }
})

module.exports = router;
