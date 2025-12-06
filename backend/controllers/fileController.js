const asyncHandler = require('../middleware/asyncHandler');
const File = require('../models/File');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

// @desc    Share file
// @route   POST /api/files/:id/share
// @access  Private
const shareFile = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);

    if (!file) {
        res.status(404);
        throw new Error('File not found');
    }

    if (file.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const { recipients, team, permissions, expires, passwordProtected, password, downloadLimit } = req.body;

    const token = crypto.randomBytes(32).toString('hex');
    const shareLink = {
        token,
        recipients,
        team,
        permissions,
        expires,
        passwordProtected,
        password,
        downloadLimit,
        remainingDownloads: downloadLimit
    };

    file.shareLinks.push(shareLink);
    await file.save();

    const fullLinkUrl = `${req.protocol}://${req.get('host')}/share/${token}`;

    res.status(201).json({
        file,
        shareLink: { ...shareLink, url: fullLinkUrl }
    });
});

// @desc    Revoke share link
// @route   DELETE /api/files/:id/share/:linkId
// @access  Private
const revokeShare = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);

    if (!file) {
        res.status(404);
        throw new Error('File not found');
    }

    if (file.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    file.shareLinks = file.shareLinks.filter(link => link._id.toString() !== req.params.linkId);
    await file.save();

    res.status(200).json(file);
});

module.exports = {
    uploadFile,
    getFiles,
    deleteFile,
    shareFile,
    revokeShare
};
