const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    parentId: {
        type: String,
        default: 'root'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Folder', folderSchema);
