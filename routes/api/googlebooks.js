const express = require('express');
const router = express.Router();
const request = require('request');
// request is depricated, using axios
const axios = require('axios');
const config = require('config');

const { check, validationResult } = require('express-validator');

// for help check section 23
// TO DO: remove  require request
// TO DO: correct search to accomodate different parameters and terms, currently title only.
// TO DO: include API key for more use: key=${config.get('googleBooksKey')}

// @route   GET api/googlebooks/:term
// @desc    Get book search from Googlebooks by params
// @access  Public
router.get('/:title', function(req, res) {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}&key=${config.get('googleBooksKey')}`).then(function(results){
        res.json(results.data.items)
    })
})



module.exports = router;