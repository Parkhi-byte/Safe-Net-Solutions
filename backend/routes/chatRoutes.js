const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getContacts } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/contacts', protect, getContacts);
router.post('/', protect, sendMessage);
router.get('/:contactId', protect, getMessages);

module.exports = router;
