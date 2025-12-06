const express = require('express');
const router = express.Router();
const { scanUrl } = require('../controllers/scannerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, scanUrl);

module.exports = router;
