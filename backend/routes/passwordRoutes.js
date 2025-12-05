const express = require('express');
const router = express.Router();
const {
    getPasswords,
    setPassword,
    updatePassword,
    deletePassword,
} = require('../controllers/passwordController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPasswords).post(protect, setPassword);
router.route('/:id').put(protect, updatePassword).delete(protect, deletePassword);

module.exports = router;
