const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get messages between two users
// @route   GET /api/chat/:contactId
// @access  Private
const getMessages = async (req, res) => {
    const { contactId } = req.params;

    const messages = await Message.find({
        $or: [
            { sender: req.user.id, receiver: contactId },
            { sender: contactId, receiver: req.user.id }
        ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
};

// @desc    Send message
// @route   POST /api/chat
// @access  Private
const sendMessage = async (req, res) => {
    const { receiverId, content, type, fileInfo } = req.body;

    const message = await Message.create({
        sender: req.user.id,
        receiver: receiverId,
        content,
        type,
        fileInfo
    });

    res.status(201).json(message);
};

// @desc    Get contacts (users who have chatted with or all users)
// @route   GET /api/chat/contacts
// @access  Private
const getContacts = async (req, res) => {
    // For simplicity, return all users except current user
    const users = await User.find({ _id: { $ne: req.user.id } }).select('-password');
    res.status(200).json(users);
};

module.exports = {
    getMessages,
    sendMessage,
    getContacts
};
