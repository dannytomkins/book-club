// TO DO: check into err.kind

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
// TO DO: integrate clubs
// const Club = require('../../models/Club')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id)
        // TO DO: need to remove password from the user model, method below is not working.
        .select('-password');
      // const club = await Club.findById(req.club.id)
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        // club: req.club.id
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// TO DO: find post for specific club, ? Post.find() where club = club ?
// @route   GET api/posts
// @desc    Get all post
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// TO DO: find post for specific club, ? Post.find() where club = club ?
// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjentId') {
      return res.status(404).json({ msg: 'Post not found.' });
    }
    res.status(500).send('Server error');
  }
});

// TO DO: Give club creators and admins ability to delete any post, maybe with their own route
// @route   DELETE api/posts/:id
// @desc    Delete a post by ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' });
    }

    // Check user. post.user is not a string and req.user.id is a string, need to make post.user a string
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    await post.remove();
    res.json({ msg: 'Post removed.' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjentId') {
      return res.status(404).json({ msg: 'Post not found.' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/like:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked.' });
    }

    // if post is not already liked, use unshift to put user at the beginning of array.
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike:id
// @desc    Unlike a post that has already been liked
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not been liked, is equal to 0
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked.' });
    }

    // Get remove index
    // using .map for each like return like.user as a string, get the index, pass in req.user.id
    // this will locate the correct like to remove
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // splice the removeIndex out of the array
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
