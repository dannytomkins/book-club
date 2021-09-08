const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  bio: {
    type: String,
  },
  favorites: [
    {
      book: {
        googleId: {
          type: String,
        },
        title: {
          type: String,
        },
        authors: {
          type: Array,
        },
        description: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    },
  ],
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
