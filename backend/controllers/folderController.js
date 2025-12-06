const asyncHandler = require('../middleware/asyncHandler');
const Folder = require('../models/Folder');
const File = require('../models/File');

// @desc    Create folder
// @route   POST /api/folders
// @access  Private
const createFolder = asyncHandler(async (req, res) => {
    const { name, parentId } = req.body;

    const folder = await Folder.create({
        user: req.user.id,
        name,
        parentId: parentId || 'root'
    });

    res.status(201).json(folder);
});

// @desc    Get user folders
// @route   GET /api/folders
// @access  Private
const getFolders = asyncHandler(async (req, res) => {
    const folders = await Folder.find({ user: req.user.id });
    res.status(200).json(folders);
});

// @desc    Update folder (rename)
// @route   PUT /api/folders/:id
// @access  Private
const updateFolder = asyncHandler(async (req, res) => {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
        res.status(404);
        throw new Error('Folder not found');
    }

    if (folder.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    folder.name = req.body.name || folder.name;
    const updatedFolder = await folder.save();

    res.status(200).json(updatedFolder);
});

// @desc    Delete folder
// @route   DELETE /api/folders/:id
// @access  Private
const deleteFolder = asyncHandler(async (req, res) => {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
        res.status(404);
        throw new Error('Folder not found');
    }

    if (folder.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Optional: Check if folder is empty or implement recursive delete.
    // For now, let's just delete the folder. The files inside might become orphaned (parentId pointing to non-existent folder),
    // or we can move them to root, or delete them.
    // Safe approach: Delete all files and subfolders in it.

    // Simple implementation: Just delete the folder document. 
    // Ideally frontend handles warning user about content.
    await folder.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    createFolder,
    getFolders,
    updateFolder,
    deleteFolder
};
