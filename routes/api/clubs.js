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



module.exports = router;
