const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    folderId: {
        type: String,
        default: 'root'
    },
    encrypted: {
        type: Boolean,
        default: true
    },
    shareLinks: [{
        url: String,
        expires: Date,
        passwordProtected: Boolean,
        downloadLimit: Number,
        remainingDownloads: Number
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('File', fileSchema);
