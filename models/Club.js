const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    members: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
        }
    }
    ],
    admins: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
        }
    }
    ],
    founded: {
        type: Date,
        default: Date.now,
    }
})

module.exports = Club = mongoose.model('club', ClubSchema)