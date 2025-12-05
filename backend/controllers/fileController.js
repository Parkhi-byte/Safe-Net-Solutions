const asyncHandler = require('../middleware/asyncHandler');
const File = require('../models/File');
const fs = require('fs');
const path = require('path');

// @desc    Upload file
// @route   POST /api/files
// @access  Private
const uploadFile = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    const file = await File.create({
        user: req.user.id,
        name: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        type: req.file.mimetype,
        size: req.file.size,
        folderId: req.body.folderId || 'root'
    });

    res.status(201).json(file);
});

// @desc    Get files
// @route   GET /api/files
// @access  Private
const getFiles = asyncHandler(async (req, res) => {
    const files = await File.find({ user: req.user.id });
    res.status(200).json(files);
});

// @desc    Delete file
// @route   DELETE /api/files/:id
// @access  Private
const deleteFile = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);

    if (!file) {
        res.status(404);
        throw new Error('File not found');
    }

    if (file.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Delete from filesystem
    fs.unlink(file.path, (err) => {
        if (err) console.error(err);
    });

    await file.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    uploadFile,
    getFiles,
    deleteFile
};
