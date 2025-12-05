const express = require('express');
const router = express.Router();
const { uploadFile, getFiles, deleteFile } = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(protect, getFiles)
    .post(protect, upload.single('file'), uploadFile);

router.route('/:id').delete(protect, deleteFile);

module.exports = router;
