const express = require('express');
const router = express.Router();
const { createFolder, getFolders, updateFolder, deleteFolder } = require('../controllers/folderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getFolders)
    .post(protect, createFolder);

router.route('/:id')
    .put(protect, updateFolder)
    .delete(protect, deleteFolder);

module.exports = router;
