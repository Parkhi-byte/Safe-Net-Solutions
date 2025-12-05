const asyncHandler = require('../middleware/asyncHandler');
const Password = require('../models/Password');

// @desc    Get passwords
// @route   GET /api/passwords
// @access  Private
const getPasswords = asyncHandler(async (req, res) => {
    const passwords = await Password.find({ user: req.user.id });
    res.status(200).json(passwords);
});

// @desc    Set password
// @route   POST /api/passwords
// @access  Private
const setPassword = asyncHandler(async (req, res) => {
    if (!req.body.website || !req.body.password) {
        res.status(400);
        throw new Error('Please add a website and password');
    }

    const password = await Password.create({
        user: req.user.id,
        website: req.body.website,
        url: req.body.url,
        username: req.body.username,
        password: req.body.password,
        category: req.body.category,
        notes: req.body.notes,
        strength: req.body.strength
    });

    res.status(200).json(password);
});

// @desc    Update password
// @route   PUT /api/passwords/:id
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
    const password = await Password.findById(req.params.id);

    if (!password) {
        res.status(400);
        throw new Error('Password not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the password user
    if (password.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedPassword = await Password.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedPassword);
});

// @desc    Delete password
// @route   DELETE /api/passwords/:id
// @access  Private
const deletePassword = asyncHandler(async (req, res) => {
    const password = await Password.findById(req.params.id);

    if (!password) {
        res.status(400);
        throw new Error('Password not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the password user
    if (password.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await password.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getPasswords,
    setPassword,
    updatePassword,
    deletePassword,
};
