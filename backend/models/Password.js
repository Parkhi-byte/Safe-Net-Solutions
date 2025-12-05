const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    website: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Other'
    },
    notes: {
        type: String
    },
    strength: {
        type: String,
        enum: ['weak', 'medium', 'strong', 'very-strong'],
        default: 'medium'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Password', passwordSchema);
