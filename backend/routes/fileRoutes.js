const express = require('express');
const router = express.Router();
const { uploadFile, getFiles, deleteFile, shareFile, revokeShare } = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(protect, getFiles)
    .post(protect, upload.single('file'), uploadFile);

router.route('/:id').delete(protect, deleteFile);
router.route('/:id/share').post(protect, shareFile);
router.route('/:id/share/:linkId').delete(protect, revokeShare);

module.exports = router;
